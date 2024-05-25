import React from 'react';
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4 mb-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white text-xl font-semibold mr-4">To Do List</span>
          <Link to="/" className="text-white hover:text-gray-300 mr-4">Home</Link>
        </div>
        <Link to="/taskform" className="text-white hover:text-gray-300 mr-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Add Task
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
