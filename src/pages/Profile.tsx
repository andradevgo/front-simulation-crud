import React, { useContext } from 'react';
import { AuthContext } from '../context/auth';
import { ProgramContext } from '../context/program';
import { Sidebar } from '../layouts/Sidebar';

export const Profile: React.FC = () => {
  const { user, student } = useContext(AuthContext);
  const { program } = useContext(ProgramContext);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-bold text-gray-700 mb-6">Perfil</h1>
        {user && (
          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="flex items-center space-x-6 mb-6">
              {user.Photo && (
                <img
                  src={user.Photo}
                  alt={`${user.Name}'s profile`}
                  className="w-24 h-24 rounded-full object-cover shadow-md"
                />
              )}
              <div>
                <h2 className="text-2xl font-semibold text-gray-800">
                  ID: {user.Id}
                </h2>
                <h2 className="text-2xl font-semibold text-gray-800">
                  Nombre: {user.Name}
                </h2>
                {program && (
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Programa: {program.Name}
                  </h2>
                )}
                {student && (
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Id del estudiante: {student}
                  </h2>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
