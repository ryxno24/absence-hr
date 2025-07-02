import { ApiService } from '../api';

// Mock fetch globally
global.fetch = jest.fn();

const mockFetch = fetch as jest.MockedFunction<typeof fetch>;

describe('ApiService', () => {
    beforeEach(() => {
        mockFetch.mockClear();
    });

    describe('getAbsences', () => {
        it('should fetch absences successfully', async () => {
            const mockAbsences = [
                {
                    id: 1,
                    startDate: '2023-01-15T00:00:00.000Z',
                    days: 5,
                    absenceType: 'ANNUAL_LEAVE',
                    approved: true,
                    employee: { id: 'emp-1', firstName: 'John', lastName: 'Doe' }
                }
            ];

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValue(mockAbsences)
            } as any);

            const result = await ApiService.getAbsences();
            
            expect(mockFetch).toHaveBeenCalledWith('https://front-end-kata.brighthr.workers.dev/api/absences');
            expect(result).toEqual(mockAbsences);
        });

        it('should throw error when fetch fails', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Not Found'
            } as any);

            await expect(ApiService.getAbsences()).rejects.toThrow('Failed to fetch absences: Not Found');
        });
    });

    describe('getConflict', () => {
        it('should fetch conflict data successfully', async () => {
            const mockConflict = { conflicts: true };

            mockFetch.mockResolvedValueOnce({
                ok: true,
                json: jest.fn().mockResolvedValue(mockConflict)
            } as any);

            const result = await ApiService.getConflict(1);
            
            expect(mockFetch).toHaveBeenCalledWith('https://front-end-kata.brighthr.workers.dev/api/conflict/1');
            expect(result).toEqual(mockConflict);
        });

        it('should throw error when conflict fetch fails', async () => {
            mockFetch.mockResolvedValueOnce({
                ok: false,
                statusText: 'Internal Server Error'
            } as any);

            await expect(ApiService.getConflict(1)).rejects.toThrow('Failed to fetch conflict for absence 1: Internal Server Error');
        });
    });

    describe('getMultipleConflicts', () => {
        it('should fetch multiple conflicts successfully', async () => {
            mockFetch
                .mockResolvedValueOnce({
                    ok: true,
                    json: jest.fn().mockResolvedValue({ conflicts: true })
                } as any)
                .mockResolvedValueOnce({
                    ok: true,
                    json: jest.fn().mockResolvedValue({ conflicts: false })
                } as any);

            const result = await ApiService.getMultipleConflicts([1, 2]);
            
            expect(mockFetch).toHaveBeenCalledTimes(2);
            expect(result.get(1)).toBe(true);
            expect(result.get(2)).toBe(false);
        });

        it('should handle failed requests gracefully', async () => {
            mockFetch
                .mockResolvedValueOnce({
                    ok: true,
                    json: jest.fn().mockResolvedValue({ conflicts: true })
                } as any)
                .mockRejectedValueOnce(new Error('Network error'));

            const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

            const result = await ApiService.getMultipleConflicts([1, 2]);
            
            expect(result.get(1)).toBe(true);
            expect(result.get(2)).toBe(false);
            expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch conflict for absence 2:', expect.any(Error));
            
            consoleSpy.mockRestore();
        });
    });
});