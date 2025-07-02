// Main component export
export { AbsenceTable } from './AbsenceTable';

// Sub-component exports for potential reuse
export { AbsenceTableHeader } from './AbsenceTableHeader';
export { AbsenceTableRow } from './AbsenceTableRow';
export { FilterInfo } from './FilterInfo';

// Type re-exports for convenience
export type { 
    Absence, 
    SortConfig, 
    SortField, 
    SortDirection 
} from '../../types/absence';