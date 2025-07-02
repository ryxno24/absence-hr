import { useState, useEffect } from 'react';
import type { Absence } from '../types/absence';
import { ApiService } from '../services/api';

export const useAbsenceConflicts = (absences: Absence[]) => {
    const [conflicts, setConflicts] = useState<Map<number, boolean>>(new Map());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (absences.length === 0) return;

        const fetchConflicts = async () => {
            try {
                setLoading(true);
                const absenceIds = absences.map(absence => absence.id);
                const conflictData = await ApiService.getMultipleConflicts(absenceIds);
                setConflicts(conflictData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch conflicts');
            } finally {
                setLoading(false);
            }
        };

        fetchConflicts();
    }, [absences]);

    return {
        conflicts,
        loading: loading,
        error
    };
};