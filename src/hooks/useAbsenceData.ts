import { useState, useEffect } from 'react';
import type { Absence } from '../types/absence';
import { ApiService } from '../services/api';

export const useAbsenceData = () => {
    const [absences, setAbsences] = useState<Absence[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAbsences = async () => {
            try {
                setLoading(true);
                const data = await ApiService.getAbsences();
                setAbsences(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch absences');
            } finally {
                setLoading(false);
            }
        };

        fetchAbsences();
    }, []);

    return {
        absences,
        loading,
        error
    };
};