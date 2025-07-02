import { useState, useEffect } from 'react';
import type { Absence, SortConfig } from '../types/absence';
import { ApiService } from '../services/api';
import { sortAbsences } from '../utils/absenceUtils';

export const useAbsences = () => {
    const [absences, setAbsences] = useState<Absence[]>([]);
    const [conflicts, setConflicts] = useState<Map<number, boolean>>(new Map());
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        field: 'startDate',
        direction: 'desc'
    });
    const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

    useEffect(() => {
        const fetchAbsences = async () => {
            try {
                setLoading(true);
                const data = await ApiService.getAbsences();
                setAbsences(data);
                
                const absenceIds = data.map(absence => absence.id);
                const conflictData = await ApiService.getMultipleConflicts(absenceIds);
                setConflicts(conflictData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch absences');
            } finally {
                setLoading(false);
            }
        };

        fetchAbsences();
    }, []);

    const sortedAbsences = sortAbsences(absences, sortConfig);
    
    const filteredAbsences = selectedEmployee 
        ? sortedAbsences.filter(absence => absence.employee.id === selectedEmployee)
        : sortedAbsences;

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
        absences: filteredAbsences,
        conflicts,
        loading,
        error,
        sortConfig,
        selectedEmployee,
        handleSort,
        handleEmployeeSelect
    };
};