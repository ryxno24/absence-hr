import type { Absence, SortConfig } from '../types/absence';

export const getEndDate = (absence: Absence): Date => {
    const startDate = new Date(absence.startDate);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + absence.days - 1);
    return endDate;
};

export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-GB');
};

export const getEmployeeName = (absence: Absence): string => {
    return `${absence.employee.firstName} ${absence.employee.lastName}`;
};

export const sortAbsences = (absences: Absence[], sortConfig: SortConfig): Absence[] => {
    return [...absences].sort((a, b) => {
        let aValue: string | number | Date;
        let bValue: string | number | Date;

        switch (sortConfig.field) {
            case 'startDate':
                aValue = new Date(a.startDate);
                bValue = new Date(b.startDate);
                break;
            case 'endDate':
                aValue = getEndDate(a);
                bValue = getEndDate(b);
                break;
            case 'employeeName':
                aValue = getEmployeeName(a).toLowerCase();
                bValue = getEmployeeName(b).toLowerCase();
                break;
            case 'absenceType':
                aValue = a.absenceType.toLowerCase();
                bValue = b.absenceType.toLowerCase();
                break;
            default:
                return 0;
        }

        if (aValue < bValue) {
            return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
    });
};