import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

export const Sidebar: React.FC = () => {
  const { logoutAuth } = useContext(AuthContext);
  return (
    <div className="w-1/4 bg-white shadow-lg p-6 flex flex-col justify-between min-h-screen">
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-800">Menú</h3>
        <ul className="space-y-4">
          <li>
            <Link
              to="/profile"
              className="block text-lg text-gray-700 hover:text-gray-900 font-medium"
            >
              Perfil
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className="block text-lg text-gray-700 hover:text-gray-900 font-medium"
            >
              Inscribir Materias
            </Link>
          </li>
          <li>
            <Link
              to="/list-enrollments"
              className="block text-lg text-gray-700 hover:text-gray-900 font-medium"
            >
              Mostrar Materias
            </Link>
          </li>
          <li>
            <button
              className="mt-6 bg-red-500 text-white font-semibold py-2 px-28 rounded hover:bg-red-600 transition duration-300"
              onClick={() => logoutAuth()}
            >
              Salir
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
