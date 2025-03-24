import { useState } from "react";
import { Link } from "react-router";

function App() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="space-x-4">
        <Link
          to="/float"
          className="px-6 py-3 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
        >
          Float
        </Link>
        <Link
          to="/parallax"
          className="px-6 py-3 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
        >
          Parallax
        </Link>
        <Link
          to="/spinningindex"
          className="px-6 py-3 bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
        >
          Spinner Index
        </Link>
      </div>
    </div>
  );
}

export default App;
