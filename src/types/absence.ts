export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
}

export interface Absence {
    id: number;
    startDate: string;
    days: number;
    absenceType: string;
    approved: boolean;
    employee: Employee;
}

export interface ConflictResponse {
    conflicts: boolean;
}

export type SortField = 'startDate' | 'endDate' | 'employeeName' | 'absenceType';
export type SortDirection = 'asc' | 'desc';

export interface SortConfig {
    field: SortField;
    direction: SortDirection;
}