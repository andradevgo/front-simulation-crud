import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth';

export const Sidebar: React.FC = () => {
  const { logoutAuth } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="hidden lg:flex flex-col w-80 bg-white shadow-lg p-6 min-h-screen">
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
          </ul>
        </div>
        <div className="mt-6">
          <button
            className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition duration-300"
            onClick={() => logoutAuth()}
          >
            Salir
          </button>
        </div>
      </div>

      {/* Navbar for small and medium screens */}
      <div className="lg:hidden bg-white shadow-lg p-4 flex justify-between items-center">
        <h3 className="text-2xl font-bold text-gray-800">Menú</h3>
        <button
          className="text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>
      {menuOpen && (
        <div className="lg:hidden bg-white shadow-lg p-4">
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
                className="w-full bg-red-500 text-white font-semibold py-2 rounded hover:bg-red-600 transition duration-300"
                onClick={() => logoutAuth()}
              >
                Salir
              </button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
