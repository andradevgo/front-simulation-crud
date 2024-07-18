import React, { useContext, useState, useCallback } from 'react';
import { AuthContext } from '../context/auth';
import { Link } from 'react-router-dom';

export const Signin: React.FC = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
    },
    []
  );

  const handlePasswordChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(e.target.value);
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      try {
        await signIn(email, password);
      } catch (error) {
        setError(
          'Failed to sign in. Please check your credentials and try again.'
        );
      }
    },
    [email, password, signIn]
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-lg shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Ingresa a tu cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Bienvenido! Ingresa tus credenciales para continuar.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
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
                value={email}
                onChange={handleEmailChange}
                aria-describedby="email-error"
              />
            </div>
            <div>
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
                value={password}
                onChange={handlePasswordChange}
                aria-describedby="password-error"
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
              Iniciar Sesión
            </button>
          </div>
          <div className="text-center mt-6">
            <a href="#" className="text-sm text-blue-600 hover:text-blue-500">
              Olvidaste tu password?
            </a>
            <span className="text-sm text-gray-600 mx-2">|</span>
            <Link
              to="/auth/signup"
              className="text-sm text-blue-600 hover:text-blue-500"
            >
              Regístrate
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};
