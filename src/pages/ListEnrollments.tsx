import React, { useContext, useEffect } from 'react';
import { EnrollmentContext } from '../context/enrollment';
import { ProgramContext } from '../context/program';
import { Sidebar } from '../layouts/Sidebar';

const ListEnrollments: React.FC = () => {
  const { loaded, enrollments, loadEnrollments, deleteEnrollment } =
    useContext(EnrollmentContext);
  const { subjects } = useContext(ProgramContext);

  useEffect(() => {
    loadEnrollments();
  }, []);

  const subjectsEnrollments = subjects.filter((subject) => {
    return enrollments.some(
      (enrollment) => enrollment.Subject_Id === subject.Id
    );
  });

  if (!loaded) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
      <Sidebar />
      <div className="w-full lg:w-3/4 p-4 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">
          Enrollments
        </h1>
        <ul className="space-y-4">
          {subjectsEnrollments.map((subject) => (
            <li
              key={subject.Id}
              className="flex flex-col sm:flex-row justify-between items-center p-4 bg-white shadow rounded-lg"
            >
              <span className="text-lg text-gray-700">{subject.Name}</span>
              <button
                className="mt-2 sm:mt-0 sm:ml-4 px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
                onClick={() =>
                  deleteEnrollment(
                    enrollments.find(
                      (enrollment) => enrollment.Subject_Id === subject.Id
                    )?.Id as number
                  )
                }
              >
                Borrar inscripción
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ListEnrollments;
