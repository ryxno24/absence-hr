import React from 'react';
import type { SortConfig } from '../../types/absence';

interface AbsenceTableHeaderProps {
    sortConfig: SortConfig;
    onSort: (field: SortConfig['field']) => void;
}

export const AbsenceTableHeader: React.FC<AbsenceTableHeaderProps> = ({
    sortConfig,
    onSort,
}) => {
    const getSortIcon = (field: SortConfig['field']) => {
        if (sortConfig.field !== field) return '↕️';
        return sortConfig.direction === 'asc' ? '↑' : '↓';
    };

    return (
        <thead className="bg-gray-50">
            <tr>
                <th 
                    className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-gray-700 cursor-pointer select-none transition-colors hover:bg-gray-100 sticky top-0 bg-gray-50 z-10" 
                    onClick={() => onSort('startDate')}
                    data-testid="sort-start-date"
                >
                    Start Date {getSortIcon('startDate')}
                </th>
                <th 
                    className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-gray-700 cursor-pointer select-none transition-colors hover:bg-gray-100 sticky top-0 bg-gray-50 z-10" 
                    onClick={() => onSort('endDate')}
                    data-testid="sort-end-date"
                >
                    End Date {getSortIcon('endDate')}
                </th>
                <th 
                    className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-gray-700 cursor-pointer select-none transition-colors hover:bg-gray-100 sticky top-0 bg-gray-50 z-10" 
                    onClick={() => onSort('employeeName')}
                    data-testid="sort-employee-name"
                >
                    Employee Name {getSortIcon('employeeName')}
                </th>
                <th className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-gray-700 sticky top-0 bg-gray-50 z-10">Status</th>
                <th 
                    className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-gray-700 cursor-pointer select-none transition-colors hover:bg-gray-100 sticky top-0 bg-gray-50 z-10" 
                    onClick={() => onSort('absenceType')}
                    data-testid="sort-absence-type"
                >
                    Absence Type {getSortIcon('absenceType')}
                </th>
                <th className="py-3 px-4 text-left border-b border-gray-200 font-semibold text-gray-700 sticky top-0 bg-gray-50 z-10">Conflicts</th>
            </tr>
        </thead>
    );
};