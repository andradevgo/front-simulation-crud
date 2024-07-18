import { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { ProgramContext } from '../context/program';
import { Sidebar } from '../layouts/Sidebar';
import { EnrollmentContext } from '../context/enrollment';

export const Home = () => {
  const { user } = useContext(AuthContext);
  const { subjects } = useContext(ProgramContext);
  const { createEnrollment } = useContext(EnrollmentContext);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="w-3/4 p-8">
        {user && (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-700">
              Materias disponibles para {user.Name}:
            </h2>
            <table className="min-w-full bg-white shadow-md rounded-lg">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-gray-600 font-medium">
                    ID
                  </th>
                  <th className="px-4 py-2 text-left text-gray-600 font-medium">
                    Name
                  </th>
                  <th className="px-4 py-2"></th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((subject) => (
                  <tr key={subject.Id} className="border-b">
                    <td className="px-4 py-2 text-gray-700">{subject.Id}</td>
                    <td className="px-4 py-2 text-gray-700">{subject.Name}</td>
                    <td className="px-4 py-2 text-right">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded "
                        onClick={() => createEnrollment(subject.Id)}
                      >
                        Inscribir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
