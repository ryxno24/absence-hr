import type { Absence, ConflictResponse } from '../types/absence';

const BASE_URL = 'https://front-end-kata.brighthr.workers.dev/api';

export class ApiService {
    static async getAbsences(): Promise<Absence[]> {
        const response = await fetch(`${BASE_URL}/absences`);
        if (!response.ok) {
            throw new Error(`Failed to fetch absences: ${response.statusText}`);
        }
        return response.json();
    }

    static async getConflict(absenceId: number): Promise<ConflictResponse> {
        const response = await fetch(`${BASE_URL}/conflict/${absenceId}`);
        if (!response.ok) {
            throw new Error(`Failed to fetch conflict for absence ${absenceId}: ${response.statusText}`);
        }
        return response.json();
    }

    static async getMultipleConflicts(absenceIds: number[]): Promise<Map<number, boolean>> {
        const conflicts = new Map<number, boolean>();
        
        const promises = absenceIds.map(async (id) => {
            try {
                const conflict = await this.getConflict(id);
                conflicts.set(id, conflict.conflicts);
            } catch (error) {
                console.error(`Failed to fetch conflict for absence ${id}:`, error);
                conflicts.set(id, false);
            }
        });

        await Promise.all(promises);
        return conflicts;
    }
}