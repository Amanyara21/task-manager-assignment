import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

function TaskList() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await fetch('http://localhost:5000/tasks/');
      const data = await response.json();

      setTasks(data.tasks);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      showAlert('error', 'Failed to fetch tasks');
      setLoading(false);
    }
  };


  const confirmDelete = (taskId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        handleDelete(taskId);
      }
    });
  };


  const handleDelete = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (!response.ok) {
        showAlert('error', data.error);
      } else {
        showAlert('success', data.success);
        getData();
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
      showAlert('error', 'Failed to delete task');
    }
  };

  const showAlert = (title, text) => {
    Swal.fire({
      title,
      text,
      icon: title,
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  const goToEditTask = (taskId) => {
    navigate(`/taskform/${taskId}`);
  };

  return (
    <div className="container">
      {!tasks.length ? (
        <div className="text-center text-white">There is no data to display</div>
      ) : (
        <div>
          <div className="divide-y divide-gray-600 ">
            {tasks.map((task) => (
              <div key={task._id} className="py-4">
                <div className="bg-slate-800 justify-between items-center flex p-4 rounded-lg">
                  <div>
                    <h3 className="text-white font-bold">{task.title}</h3>
                    <p className="text-white">Description: {task.description}</p>
                    <p className="text-white">Status: {task.status}</p>
                    <p className="text-white">Due Date: {formatDate(task.dueDate)}</p>
                  </div>
                  <div className=" flex flex-col gap-2 items-stretch">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={() => goToEditTask(task.id)}>
                      Edit Task
                    </button>
                    <button className="bg-red-600 text-white px-4 py-2 rounded-lg" onClick={() => confirmDelete(task.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isLoading && (
        <div className="text-center text-white">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );

}

export default TaskList;
