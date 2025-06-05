import React, { useState, useRef, useEffect } from 'react';
import { Plus } from 'lucide-react';
import Spinner from '../../components/ui/spinner'; // Adjust the import path as needed
import { createTaskList } from '../../services/tasklist'; // Adjust the import path as needed

const AddListModal = ({ open, Close }) => {
  const [listName, setListName] = useState('');
  const [loading, setLoading] = useState(false);
  const modalRef = useRef(null);

  const handleAdd = async () => {
  const trimmedName = listName.trim();
  setLoading(true);

  if (!trimmedName) {
    console.warn("List name cannot be empty.");
    // Optionally: show toast/snackbar here
    return;
  }

  try {
    // Optional: disable button while loading
    // setLoading(true);


    // Attempt to create in Firebase
    const taskListId = await createTaskList({ title: trimmedName,description: "Work on upcoming features" });
    
    //reload  window
    window.location.reload();
    // Clear input & close modal
    setListName('');
    Close();

    console.log("Task list created successfully.");
  } catch (error) {
    console.error("Failed to create task list:", error.message);
    // Optionally: show toast/snackbar to user
  } finally {
    setLoading(false); 
  }
};


  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      Close();
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  return (
    <>
      {open && (
        <div className="fixed inset-0 bg-[#1A4A8C]/40 flex justify-center items-center z-50">
          <div
            ref={modalRef}
            className="bg-white px-6 py-4 rounded-lg flex items-center justify-between shadow-md w-full max-w-md mb-4"
          >
            <input
              type="text"
              value={listName}
              onChange={(e) => setListName(e.target.value)}
              placeholder="New List"
              className="text-gray-400 flex-1 bg-transparent focus:outline-none"
            />
            <button className={`w-9 h-9 bg-blue-200 flex flex-col justify-center items-center rounded-full  ${listName==""?"opacity-60 hover:cursor-not-allowed":"opacity-100 hover:cursor-pointer"}`} onClick={handleAdd}>
              {loading?
              <div className='w-8 h-8'>
                <Spinner/>
                </div>:<Plus className="text-blue-800" />}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddListModal;
