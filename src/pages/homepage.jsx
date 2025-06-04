import { useEffect } from "react";
import TaskList from "../components/home/tasklist";
import AppLayout from "../components/layouts/applayout"
import { useState } from "react";
import AddListModal from "../components/models/addList";
import { getAllTaskListsWithTasks } from "../services/tasklist";

const HomePage = ()=>{
    const [taskLists,setTaskLists] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [open,setOpen] = useState(false);
//     const data = {
//   "id": "tasklist_001",
//   "title": "Frontend Development",
//   "description": "Tasks related to UI implementation",
//   "createdAt": "2025-06-04T09:00:00Z",
//   "updatedAt": "2025-06-04T10:30:00Z",
//   "tasks": [
//     {
//       "id": "task_001",
//       "title": "Design login page",
//       "description": "Create login form with email/password fields",
//       "status": "completed",
//       "dueDate": "2025-06-05T12:00:00Z",
//       "priority": "high"
//     },
//     {
//       "id": "task_002",
//       "title": "Implement dashboard",
//       "description": "Create a responsive dashboard layout",
//       "status": "in_progress",
//       "dueDate": "2025-06-06T15:00:00Z",
//       "priority": "medium"
//     },
//     {
//       "id": "task_003",
//       "title": "Setup routing",
//       "description": "Configure React Router for navigation",
//       "status": "pending",
//       "dueDate": "2025-06-07T18:00:00Z",
//       "priority": "low"
//     }
//   ]
// }
    
useEffect(() => {
  const fetchTaskLists = async () => {
    try {
      setLoading(true);
      const data = await getAllTaskListsWithTasks()
      console.log(data);
      setTaskLists(data);
    } catch (err) {
      console.error("Error fetching task lists:", err.message);
      setError("Failed to load task lists. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  fetchTaskLists();
},[open]);

    return (
        <AppLayout setOpen={setOpen} open={open}>
            <AddListModal open={open} Close={()=>{setOpen(false)}} />
            {
                loading ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <p className="text-lg text-gray-500">Loading task lists...</p>
                    </div>
                ) : error ? (
                    <div className="w-full h-full flex justify-center items-center">
                        <p className="text-lg text-red-500">{error}</p>
                    </div>
                ) : (
                
                    
                    <div className="w-full h-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-start items-start gap-6 px-4 py-3">
                        {taskLists.map((list) => (
                            <TaskList key={list.id} data={list} />
                        ))}
                    </div>
                )
            }
        </AppLayout>
    );
}

export default HomePage;