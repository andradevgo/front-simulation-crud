import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/auth';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Signin } from '../pages/Signin';
import { Signup } from '../pages/Signup';
import { Home } from '../pages/Home';
import { ProgramStudent } from '../pages/ProgramStudent';
import { Profile } from '../pages/Profile';
import ListEnrollments from '../pages/ListEnrollments';

export const AppRouter = () => {
  const { student, status, checkAuthToken } = useContext(AuthContext);

  // const authStatus = "not-authenticated"; //"not-authenticated" "authenticated"

  useEffect(() => {
    checkAuthToken();
  }, []);

  if (status === 'checking') {
    return <h3>Cargando...</h3>;
  }

  // if (!student) {
  //   return console.log('No hay estudiante');
  // }

  console.log(student);

  return (
    <Routes>
      {status === 'not-authenticated' ? (
        <>
          <Route path="/auth/signin" element={<Signin />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/*" element={<Navigate to="/auth/signin" />} />
        </>
      ) : student ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/list-enrollments" element={<ListEnrollments />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </>
      ) : (
        <>
          <Route path="/user/program" element={<ProgramStudent />} />
          <Route path="/*" element={<Navigate to="/user/program" />} />
        </>
      )}
    </Routes>
  );
};
