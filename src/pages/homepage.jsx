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