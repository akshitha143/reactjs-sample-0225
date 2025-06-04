import React, { useState } from 'react';
import { Plus, X, Trash2 } from 'lucide-react';
import { addTaskToList, deleteTask, updateTaskStatus } from '../../services/tasklist'; // Adjust the import path as needed
function formatDate(input) {

  if(!input || input=="") return null;
  const date = new Date(input);
  const year = date.getFullYear().toString();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}
const TaskModal = ({open,setOpen,data,listId,allTasks,setAllTasks}) => {
  const d = formatDate(data?.dueDate);
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({ title: data?.title || "", details:data?.description || "" , date:d || "" });
  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    setLoading(true);
    const newTask = {
        title: task.title,
        description: task.details,
        status: 'pending',
        dueDate: task.date,
      };
    if(data){
      console.log("Updating task with ID:", data.id,listId);
      console.log(data);
      const update = await updateTaskStatus(listId,data.id,newTask);
      const updatedTasks = allTasks.map((task) =>
        task.id === data.id ? { ...data,...newTask } : task
    );
    setAllTasks(updatedTasks);
    setTask({ title: '', details: '', date: '2022-12-22' });
    setOpen(false);
    }
    else{
        
      // Here you would typically call a function to save the task to your database
      const newdata =await addTaskToList(listId, newTask);
      setAllTasks([...allTasks,newdata]);
      setTask({ title: '', details: '', date: '2022-12-22' });
      setOpen(false);
    }
    setLoading(false);
    
    
  };

  const handleDelete = async () => {
    await deleteTask(listId,data.id);
    const updatedTasks = allTasks.filter((task) =>
        task.id != data.id 
      );
    setAllTasks(updatedTasks);
    setTask({ title: '', details: '', date: '2022-12-22', });
    setOpen(false);
  };


  return (
    <>

      {open && (
        <div className="fixed inset-0 bg-[#1A4A8C]/40 bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold"> Task</h3>
              <button onClick={() => setOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <input
              name="title"
              value={task.title}
              onChange={handleChange}
              placeholder="Campus build"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />

            <textarea
              name="details"
              value={task.details}
              onChange={handleChange}
              placeholder="Add details"
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />

            <input
              type="date"
              name="date"
              value={task.date}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg mb-4"
            />
            

            <div className="flex justify-between">
              <button
                onClick={handleDelete}
                className={`px-4 py-2 bg-red-500 text-white rounded-lg flex items-center gap-2 ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
                disabled={loading}
              >
                <Trash2 className="w-4 h-4" /> Delete
              </button>
              <button
                onClick={handleSubmit}
                disabled={loading}
                className={`px-4 py-2 bg-blue-500 text-white rounded-lg ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
              >
                Save Task
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModal;
