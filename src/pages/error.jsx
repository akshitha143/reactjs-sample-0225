// src/pages/ErrorPage.jsx
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ message = "Something went wrong!" }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-red-50">
      <h1 className="text-5xl font-extrabold text-red-700 mb-4">Error</h1>
      <p className="text-xl font-medium text-gray-800 mb-2">{message}</p>
      <p className="text-gray-500 mb-6">Please try again later or return to a safe page.</p>
      <button
        onClick={() => navigate('/')}
        className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
      >
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
