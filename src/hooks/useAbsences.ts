import { useAbsenceData } from './useAbsenceData';
import { useAbsenceFilters } from './useAbsenceFilters';
import { useAbsenceConflicts } from './useAbsenceConflicts';

export const useAbsences = () => {
    const { absences, loading: dataLoading, error: dataError } = useAbsenceData();
    const { 
        filteredAbsences, 
        sortConfig, 
        selectedEmployee, 
        handleSort, 
        handleEmployeeSelect 
    } = useAbsenceFilters(absences);
    const { conflicts, loading: conflictsLoading, error: conflictsError } = useAbsenceConflicts(absences);

    const loading = dataLoading || conflictsLoading;
    const error = dataError || conflictsError;

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