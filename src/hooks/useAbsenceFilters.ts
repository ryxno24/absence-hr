import { useState, useMemo } from 'react';
import type { Absence, SortConfig } from '../types/absence';
import { sortAbsences } from '../utils/absenceUtils';

export const useAbsenceFilters = (absences: Absence[]) => {
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        field: 'startDate',
        direction: 'desc'
    });
    const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

    const sortedAbsences = useMemo(() => 
        sortAbsences(absences, sortConfig), 
        [absences, sortConfig]
    );
    
    const filteredAbsences = useMemo(() => 
        selectedEmployee 
            ? sortedAbsences.filter(absence => absence.employee.id === selectedEmployee)
            : sortedAbsences,
        [sortedAbsences, selectedEmployee]
    );

    const handleSort = (field: SortConfig['field']) => {
        setSortConfig(prev => ({
            field,
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    };

    const handleEmployeeSelect = (employeeId: string | null) => {
        setSelectedEmployee(employeeId);
    };

    return {
        filteredAbsences,
        sortConfig,
        selectedEmployee,
        handleSort,
        handleEmployeeSelect
    };
};