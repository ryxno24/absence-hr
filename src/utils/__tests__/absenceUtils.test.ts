import { getEndDate, formatDate, getEmployeeName, sortAbsences } from '../absenceUtils';
import type { Absence } from '../../types/absence';

const mockAbsence: Absence = {
    id: 1,
    startDate: '2023-01-15T00:00:00.000Z',
    days: 5,
    absenceType: 'ANNUAL_LEAVE',
    approved: true,
    employee: {
        id: 'emp-1',
        firstName: 'John',
        lastName: 'Doe'
    }
};

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
    },
    {
        id: 3,
        startDate: '2023-01-20T00:00:00.000Z',
        days: 2,
        absenceType: 'MEDICAL',
        approved: true,
        employee: { id: 'emp-3', firstName: 'Alice', lastName: 'Johnson' }
    }
];

describe('absenceUtils', () => {
    describe('getEndDate', () => {
        it('should calculate correct end date for multi-day absence', () => {
            const endDate = getEndDate(mockAbsence);
            expect(endDate.toISOString().split('T')[0]).toBe('2023-01-19');
        });

        it('should handle single day absence', () => {
            const singleDayAbsence = { ...mockAbsence, days: 1 };
            const endDate = getEndDate(singleDayAbsence);
            expect(endDate.toISOString().split('T')[0]).toBe('2023-01-15');
        });
    });

    describe('formatDate', () => {
        it('should format date in British format', () => {
            const date = new Date('2023-01-15');
            const formatted = formatDate(date);
            expect(formatted).toBe('15/01/2023');
        });
    });

    describe('getEmployeeName', () => {
        it('should combine first and last name', () => {
            const name = getEmployeeName(mockAbsence);
            expect(name).toBe('John Doe');
        });
    });

    describe('sortAbsences', () => {
        it('should sort by start date ascending', () => {
            const sorted = sortAbsences(mockAbsences, { field: 'startDate', direction: 'asc' });
            expect(sorted[0].id).toBe(2); // Jan 10
            expect(sorted[1].id).toBe(1); // Jan 15
            expect(sorted[2].id).toBe(3); // Jan 20
        });

        it('should sort by start date descending', () => {
            const sorted = sortAbsences(mockAbsences, { field: 'startDate', direction: 'desc' });
            expect(sorted[0].id).toBe(3); // Jan 20
            expect(sorted[1].id).toBe(1); // Jan 15
            expect(sorted[2].id).toBe(2); // Jan 10
        });

        it('should sort by employee name ascending', () => {
            const sorted = sortAbsences(mockAbsences, { field: 'employeeName', direction: 'asc' });
            expect(sorted[0].employee.firstName).toBe('Alice'); // Alice Johnson
            expect(sorted[1].employee.firstName).toBe('Jane');  // Jane Smith
            expect(sorted[2].employee.firstName).toBe('John');  // John Doe
        });

        it('should sort by absence type ascending', () => {
            const sorted = sortAbsences(mockAbsences, { field: 'absenceType', direction: 'asc' });
            expect(sorted[0].absenceType).toBe('ANNUAL_LEAVE');
            expect(sorted[1].absenceType).toBe('MEDICAL');
            expect(sorted[2].absenceType).toBe('SICKNESS');
        });

        it('should not mutate original array', () => {
            const original = [...mockAbsences];
            sortAbsences(mockAbsences, { field: 'startDate', direction: 'asc' });
            expect(mockAbsences).toEqual(original);
        });
    });
});