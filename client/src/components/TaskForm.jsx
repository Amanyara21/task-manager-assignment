import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const TaskForm = () => {
  const { id } = useParams();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: '',
    dueDate: '',
  });

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      fetchTaskDetails(id);
    }
  }, [id]);

  const fetchTaskDetails = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`);
      const data = await response.json();
      if (!response.ok) {
        showAlert('error', data.error);
      } else {
        setTask(data.task);
      }
    } catch (error) {
      showAlert('error', error.message);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const url = id ? `http://localhost:5000/tasks/${id}` : 'http://localhost:5000/tasks/';
    const method = id ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });

      const data = await response.json();
      setLoading(false);

      if (!response.ok) {
        showAlert('error', data.error);
      } else {
        showAlert('success', data.success);
        setTask({ title: '', description: '', status: '', dueDate: '' });
      }
    } catch (error) {
      setLoading(false);
      showAlert('error', error.message);
    }
  };
  function capitalize(s) {
    return s[0].toUpperCase() + s.slice(1);
  }

  const showAlert = (icon, text) => {

    Swal.fire({
      icon,
      title: capitalize(icon),
      text,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  return (
    <div className="bg-slate-800 p-6 rounded-lg shadow-lg w-[350px] sm:w-[600px] m-auto">
      <h2 className="text-white text-2xl mb-4 text-center">{id ? 'Edit Task' : 'Add Task'}</h2>
      <form onSubmit={handleSubmit} className="space-y-6 leading-8">
        <div>
          <label htmlFor="title" className="text-white">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-slate-700/50 text-white focus:outline-none focus:ring focus:ring-blue-500 border border-slate-500/30 rounded-tl"
            placeholder="Enter task title"
          />
        </div>
        <div>
          <label htmlFor="description" className="text-white">Description</label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            rows="4"
            className="w-full px-3 py-2 rounded-md bg-slate-700/50 text-white focus:outline-none focus:ring focus:ring-blue-500 border border-slate-500/30 rounded-tl"
            placeholder="Enter task description"
          />
        </div>
        <div>
          <label htmlFor="status" className="text-white">Status</label>
          <input
            type="text"
            id="status"
            name="status"
            value={task.status}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-slate-700/50 text-white focus:outline-none focus:ring focus:ring-blue-500 border border-slate-500/30 rounded-tl"
            placeholder="Enter task status"
          />
        </div>
        <div>
          <label htmlFor="dueDate" className="text-white">Due Date</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-md bg-slate-700/50 text-white focus:outline-none focus:ring focus:ring-blue-500 border border-slate-500/30 rounded-tl"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-800 w-full hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          {id ? 'Update' : 'Save'}
        </button>
      </form>

      {isLoading && (
        <div className="text-center text-white">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskForm;


