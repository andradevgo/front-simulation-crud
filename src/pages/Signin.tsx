import React, { useContext, useState, useCallback } from "react";
import { AuthContext } from "../context/auth";
import { Link } from "react-router-dom";
import Webcam from "react-webcam";

export const Signin: React.FC = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [usePhoto, setUsePhoto] = useState(false);

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

  const handleCapture = useCallback((dataUri: string | null) => {
    setPhoto(dataUri);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError(null);
      try {
        if (usePhoto && photo) {
          const base64Photo = photo.replace(/^data:image\/[a-z]+;base64,/, "");
          await signIn(email, "", base64Photo);
        } else {
          await signIn(email, password, "");
        }
      } catch (error) {
        setError(
          "Failed to sign in. Please check your credentials and try again."
        );
      }
    },
    [email, password, photo, signIn, usePhoto]
  );

  const webcamRef = React.useRef<Webcam>(null);

  const capturePhoto = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        handleCapture(imageSrc);
      }
    }
  }, [handleCapture]);

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
            {!usePhoto && (
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
            )}
            {usePhoto && (
              <div className="text-center">
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  width={320}
                  height={240}
                  onUserMediaError={() => setError("Error accessing webcam")}
                />
                <button
                  type="button"
                  className="mt-2 p-2 bg-blue-500 text-white rounded"
                  onClick={capturePhoto}
                >
                  Capturar Foto
                </button>
                {photo && (
                  <img src={photo} alt="captured" className="mt-2 rounded" />
                )}
              </div>
            )}
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
          <div className="text-center mt-6">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={usePhoto}
                onChange={() => setUsePhoto(!usePhoto)}
              />
              <span className="ml-2">Usar foto para iniciar sesión</span>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};
