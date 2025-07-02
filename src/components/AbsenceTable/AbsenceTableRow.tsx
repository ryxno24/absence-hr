import React from 'react';
import type { Absence } from '../../types/absence';
import { getEndDate, formatDate, getEmployeeName } from '../../utils/absenceUtils';
import { Button, Badge } from '../ui';

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
                <Button
                    variant="link"
                    onClick={() => onEmployeeClick(absence.employee.id)}
                    data-testid={`employee-${absence.employee.id}`}
                >
                    {getEmployeeName(absence)}
                </Button>
            </td>
            <td className="py-3 px-4 text-left border-b border-gray-200">
                <Badge variant={absence.approved ? 'success' : 'warning'}>
                    {absence.approved ? 'Approved' : 'Pending Approval'}
                </Badge>
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