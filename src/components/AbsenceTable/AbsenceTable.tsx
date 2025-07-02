import React from 'react';
import type { Absence, SortConfig } from '../../types/absence';
import { AbsenceTableHeader } from './AbsenceTableHeader';
import { AbsenceTableRow } from './AbsenceTableRow';
import { FilterInfo } from './FilterInfo';

interface AbsenceTableProps {
    absences: Absence[];
    conflicts: Map<number, boolean>;
    sortConfig: SortConfig;
    onSort: (field: SortConfig['field']) => void;
    onEmployeeClick: (employeeId: string) => void;
    selectedEmployee: string | null;
}

export const AbsenceTable: React.FC<AbsenceTableProps> = ({
    absences,
    conflicts,
    sortConfig,
    onSort,
    onEmployeeClick,
    selectedEmployee,
}) => {
    const handleClearFilter = () => {
        onEmployeeClick('');
    };

    return (
        <div className="w-full max-w-full overflow-x-auto flex flex-col items-center">
            <table className="w-full max-w-5xl border-collapse my-5 text-sm bg-white shadow-lg rounded-lg overflow-hidden">
                <AbsenceTableHeader
                    sortConfig={sortConfig}
                    onSort={onSort}
                />
                <tbody>
                    {absences.map((absence) => (
                        <AbsenceTableRow
                            key={absence.id}
                            absence={absence}
                            hasConflict={conflicts.get(absence.id) || false}
                            onEmployeeClick={onEmployeeClick}
                        />
                    ))}
                </tbody>
            </table>
            <FilterInfo
                selectedEmployee={selectedEmployee}
                onClearFilter={handleClearFilter}
            />
        </div>
    );
};