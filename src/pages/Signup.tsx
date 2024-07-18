import React, { useContext, useState, useCallback } from 'react';
import { AuthContext } from '../context/auth';
import { Link } from 'react-router-dom';

export const Signup: React.FC = () => {
  const { signUp } = useContext(AuthContext);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    birthdate: '',
    documentType: 'TI', // Valor por defecto
    documentNumber: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setFormValues((prevValues) => ({
        ...prevValues,
        [name]: value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      try {
        signUp({
          ...formValues,
          birthdate: new Date(formValues.birthdate),
        });
      } catch (error) {
        setError(
          'Failed to sign up. Please check your information and try again.'
        );
      }
    },
    [formValues, signUp]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 p-10 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Registrate
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Crea una cuenta para empezar.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Ingresa tu nombre"
                value={formValues.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Ingresa tu email"
                value={formValues.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Ingresa tu password"
                value={formValues.password}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="birthdate"
                className="block text-sm font-medium text-gray-700"
              >
                Fecha de Nacimiento
              </label>
              <input
                id="birthdate"
                name="birthdate"
                type="date"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                value={formValues.birthdate}
                onChange={handleChange}
              />
            </div>
            <div className="col-span-1">
              <label
                htmlFor="documentType"
                className="block text-sm font-medium text-gray-700"
              >
                Tipo de documento
              </label>
              <select
                id="documentType"
                name="documentType"
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                value={formValues.documentType}
                onChange={handleChange}
              >
                <option value="TI">TI</option>
                <option value="CC">CC</option>
                <option value="PA">PA</option>
                <option value="CE">CE</option>
              </select>
            </div>
            <div className="col-span-2">
              <label
                htmlFor="documentNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Número de documento
              </label>
              <input
                id="documentNumber"
                name="documentNumber"
                type="text"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Ingresa tu número de documento	"
                value={formValues.documentNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          {error && (
            <div
              className="mt-2 text-center text-red-500 text-sm"
              id="error-message"
            >
              {error}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Registrate
            </button>
          </div>
          <div className="text-center mt-6">
            <Link
              to="/auth/signin"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Ya tienes una cuenta? Inicia sesión
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
