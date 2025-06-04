// src/pages/NotFound.jsx
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center bg-gray-50">
      <h1 className="text-6xl font-extrabold text-blue-800 mb-4">404</h1>
      <p className="text-2xl font-semibold text-gray-800 mb-2">Page Not Found</p>
      <p className="text-gray-500 mb-6">Sorry, the page you're looking for doesn't exist or has been moved.</p>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;
