import { useAbsences } from './hooks/useAbsences';
import { AbsenceTable } from './components/AbsenceTable';

function App() {
    const {
        absences,
        conflicts,
        loading,
        error,
        sortConfig,
        selectedEmployee,
        handleSort,
        handleEmployeeSelect
    } = useAbsences();

    if (loading) {
        return (
            <div className="max-w-7xl mx-auto p-4 min-h-screen bg-gray-100 flex flex-col items-center">
                <div className="text-center py-12 text-xl text-blue-600 bg-white rounded-lg shadow-sm">Loading absences...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-7xl mx-auto p-4 min-h-screen bg-gray-100 flex flex-col items-center">
                <div className="text-center py-12 text-xl text-red-600 bg-red-50 border border-red-200 rounded-lg">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-4 min-h-screen bg-gray-100 flex flex-col items-center">
            <header className="text-center mb-8 py-8 px-4 bg-white rounded-lg shadow-sm w-full">
                <h1 className="text-4xl font-semibold text-gray-800 mb-2">Employee Absence Management</h1>
                <p className="text-lg text-gray-600">Manage and track employee absences</p>
            </header>
            <main className="w-full flex justify-center">
                <AbsenceTable
                    absences={absences}
                    conflicts={conflicts}
                    sortConfig={sortConfig}
                    onSort={handleSort}
                    onEmployeeClick={handleEmployeeSelect}
                    selectedEmployee={selectedEmployee}
                />
            </main>
        </div>
    );
}

export default App
