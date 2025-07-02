import React from 'react';
import { Button } from '../ui';

interface FilterInfoProps {
    selectedEmployee: string | null;
    onClearFilter: () => void;
}

export const FilterInfo: React.FC<FilterInfoProps> = ({
    selectedEmployee,
    onClearFilter,
}) => {
    if (!selectedEmployee) return null;

    return (
        <div className="my-4 mx-auto p-3 bg-blue-50 rounded border-l-4 border-blue-400 text-sm max-w-5xl w-full">
            <p>
                Showing absences for selected employee.{' '}
                <Button variant="link" onClick={onClearFilter}>
                    Show all absences
                </Button>
            </p>
        </div>
    );
};