# Employee Absence Management System

A React-based single-page application for managing and tracking employee absences.

## Features

- **Absence Table**: Display all absences with start date, end date, employee name, approval status, and absence type
- **Conflict Detection**: Visual indication (⚠️) when absences have conflicts using the provided conflict endpoint
- **Sorting**: Sort by dates, absence type, and employee name (click column headers)
- **Employee Filtering**: Click on employee names to show only their absences
- **Responsive Design**: Clean, professional interface

## How to Run the Application

### Prerequisites
- Node.js (v20 or higher)
- npm

### Installation and Setup
```bash
# Clone the repository
git clone <repository-url>
cd absence-hr

# Install dependencies
npm install

# Start the development server
npm run dev
```

The application will be available at `http://localhost:5173`

### Other Available Commands
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run linting
npm run lint
```

## How to Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## API Endpoints Used

- `GET https://front-end-kata.brighthr.workers.dev/api/absences` - Fetch all absences
- `GET https://front-end-kata.brighthr.workers.dev/api/conflict/{id}` - Check for conflicts on specific absence

## Architecture

The application follows a clean architecture with:

- **Components**: Reusable UI components (`AbsenceTable`)
- **Hooks**: Custom React hooks for data management (`useAbsences`)
- **Services**: API service layer for external data fetching
- **Types**: TypeScript interfaces for type safety
- **Utils**: Utility functions for data manipulation and formatting

## Future Enhancements

If given more time, the following features could be implemented:

1. **Advanced Filtering**: Add filters for date ranges, absence types, and approval status
2. **Pagination**: Handle large datasets with client-side or server-side pagination
3. **Search**: Full-text search across employee names and absence types
4. **Export**: Export filtered data to CSV/Excel formats
5. **Real-time Updates**: WebSocket integration for live updates
6. **Accessibility**: Enhanced ARIA labels and keyboard navigation
7. **Mobile Optimization**: Improved responsive design for mobile devices
8. **Error Boundary**: React error boundaries for better error handling
9. **Caching**: Implement data caching for better performance
10. **Loading States**: More granular loading states for different operations

## Testing

The application includes comprehensive tests for:
- Component rendering and interactions
- API service functionality
- Utility functions
- User interactions (sorting, filtering, clicking)
