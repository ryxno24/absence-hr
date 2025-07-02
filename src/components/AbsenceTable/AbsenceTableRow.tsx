import React from 'react';
import type { Absence } from '../../types/absence';
import { getEndDate, formatDate, getEmployeeName } from '../../utils/absenceUtils';

interface AbsenceTableRowProps {
    absence: Absence;
    hasConflict: boolean;
    onEmployeeClick: (employeeId: string) => void;
}

export const AbsenceTableRow: React.FC<AbsenceTableRowProps> = ({
    absence,
    hasConflict,
    onEmployeeClick,
}) => {
    return (
        <tr className={`hover:bg-gray-50 ${hasConflict ? 'bg-yellow-50 hover:bg-yellow-100' : ''}`}>
            <td className="py-3 px-4 text-left border-b border-gray-200">{formatDate(new Date(absence.startDate))}</td>
            <td className="py-3 px-4 text-left border-b border-gray-200">{formatDate(getEndDate(absence))}</td>
            <td className="py-3 px-4 text-left border-b border-gray-200">
                <button
                    className="bg-none border-none text-blue-600 cursor-pointer underline font-inherit p-0 hover:text-blue-800"
                    onClick={() => onEmployeeClick(absence.employee.id)}
                    data-testid={`employee-${absence.employee.id}`}
                >
                    {getEmployeeName(absence)}
                </button>
            </td>
            <td className="py-3 px-4 text-left border-b border-gray-200">
                <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${
                    absence.approved 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                }`}>
                    {absence.approved ? 'Approved' : 'Pending Approval'}
                </span>
            </td>
            <td className="py-3 px-4 text-left border-b border-gray-200">{absence.absenceType.replace('_', ' ')}</td>
            <td className="py-3 px-4 text-left border-b border-gray-200">
                {hasConflict && (
                    <span className="text-base cursor-help" title="This absence has conflicts">
                        ⚠️
                    </span>
                )}
            </td>
        </tr>
    );
};