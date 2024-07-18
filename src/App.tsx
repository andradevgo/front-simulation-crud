import { AppRouter } from './routes/AppRouter';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { ProgramProvider } from './context/program/ProgramProvider';
import { EnrollmentProvider } from './context/enrollment';

function App() {
  return (
    <AuthProvider>
      <ProgramProvider>
        <EnrollmentProvider>
          <Router>
            <AppRouter />
          </Router>
        </EnrollmentProvider>
      </ProgramProvider>
    </AuthProvider>
  );
}

export default App;
