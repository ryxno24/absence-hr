import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AbsenceTable } from '../';
import type { Absence } from '../../../types/absence';

const mockAbsences: Absence[] = [
    {
        id: 1,
        startDate: '2023-01-15T00:00:00.000Z',
        days: 5,
        absenceType: 'ANNUAL_LEAVE',
        approved: true,
        employee: { id: 'emp-1', firstName: 'John', lastName: 'Doe' }
    },
    {
        id: 2,
        startDate: '2023-01-10T00:00:00.000Z',
        days: 3,
        absenceType: 'SICKNESS',
        approved: false,
        employee: { id: 'emp-2', firstName: 'Jane', lastName: 'Smith' }
    }
];

const mockConflicts = new Map<number, boolean>([
    [1, true],
    [2, false]
]);

const defaultProps = {
    absences: mockAbsences,
    conflicts: mockConflicts,
    sortConfig: { field: 'startDate' as const, direction: 'desc' as const },
    onSort: jest.fn(),
    onEmployeeClick: jest.fn(),
    selectedEmployee: null
};

describe('AbsenceTable', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should render table with absence data', () => {
        render(<AbsenceTable {...defaultProps} />);
        
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('Jane Smith')).toBeInTheDocument();
        expect(screen.getByText('Approved')).toBeInTheDocument();
        expect(screen.getByText('Pending Approval')).toBeInTheDocument();
        expect(screen.getByText('ANNUAL LEAVE')).toBeInTheDocument();
        expect(screen.getByText('SICKNESS')).toBeInTheDocument();
    });

    it('should display conflict indicator for absence with conflicts', () => {
        render(<AbsenceTable {...defaultProps} />);
        
        const conflictRows = screen.getAllByText('⚠️');
        expect(conflictRows).toHaveLength(1);
    });

    it('should highlight rows with conflicts', () => {
        render(<AbsenceTable {...defaultProps} />);
        
        const rows = screen.getAllByRole('row');
        const conflictRow = rows.find(row => row.classList.contains('bg-yellow-50'));
        expect(conflictRow).toBeInTheDocument();
    });

    it('should call onSort when column headers are clicked', () => {
        const onSort = jest.fn();
        render(<AbsenceTable {...defaultProps} onSort={onSort} />);
        
        fireEvent.click(screen.getByTestId('sort-start-date'));
        expect(onSort).toHaveBeenCalledWith('startDate');
        
        fireEvent.click(screen.getByTestId('sort-employee-name'));
        expect(onSort).toHaveBeenCalledWith('employeeName');
        
        fireEvent.click(screen.getByTestId('sort-absence-type'));
        expect(onSort).toHaveBeenCalledWith('absenceType');
    });

    it('should call onEmployeeClick when employee name is clicked', () => {
        const onEmployeeClick = jest.fn();
        render(<AbsenceTable {...defaultProps} onEmployeeClick={onEmployeeClick} />);
        
        fireEvent.click(screen.getByTestId('employee-emp-1'));
        expect(onEmployeeClick).toHaveBeenCalledWith('emp-1');
    });

    it('should display sort indicators correctly', () => {
        render(<AbsenceTable {...defaultProps} />);
        
        expect(screen.getByText(/Start Date ↓/)).toBeInTheDocument();
        expect(screen.getByText(/End Date ↕️/)).toBeInTheDocument();
    });

    it('should show filter info when employee is selected', () => {
        render(<AbsenceTable {...defaultProps} selectedEmployee="emp-1" />);
        
        expect(screen.getByText(/Showing absences for selected employee/)).toBeInTheDocument();
        expect(screen.getByText('Show all absences')).toBeInTheDocument();
    });

    it('should call onEmployeeClick with empty string when clear filter is clicked', () => {
        const onEmployeeClick = jest.fn();
        render(<AbsenceTable {...defaultProps} onEmployeeClick={onEmployeeClick} selectedEmployee="emp-1" />);
        
        fireEvent.click(screen.getByText('Show all absences'));
        expect(onEmployeeClick).toHaveBeenCalledWith('');
    });

    it('should format dates correctly', () => {
        render(<AbsenceTable {...defaultProps} />);
        
        expect(screen.getByText('15/01/2023')).toBeInTheDocument();
        expect(screen.getByText('10/01/2023')).toBeInTheDocument();
    });
});