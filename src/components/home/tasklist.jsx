import { EllipsisVertical,Plus } from "lucide-react";
import { TaskItem, TaskItemComplete } from "./taskItem";
import { useState,useEffect } from "react";
import TaskModal from "../models/taskModel";
import { updateTaskStatus } from "../../services/tasklist"; // Adjust the import path as needed

const TaskList = ({data})=>{
    const [allTasks,setAllTasks] = useState(data?.tasks || []);
    const [completedTasks, setCompletedTasks] = useState([]);
    const [incompleteTasks, setIncompleteTasks] = useState([]);
    const [open,setOpen] = useState(false);
    
  useEffect(() => {
    splitTasks(allTasks);
  }, [allTasks]);

  const splitTasks = (tasks) => {
    setCompletedTasks(tasks.filter((t) => t.status === "completed"));
    setIncompleteTasks(tasks.filter((t) => t.status !== "completed"));
  };

  const markTaskAsComplete = async (taskId) => {
    try {
    await updateTaskStatus(data.id, taskId, { status: "completed" });
    const updatedTasks = allTasks.map((task) =>
        task.id === taskId ? { ...task, status: "completed" } : task
    );
    setAllTasks(updatedTasks);
    console.log("Task marked as completed.");
  } catch (error) {
    console.error("Failed to mark task as completed:", error.message);
  }
  };

    return (
        <>
        {open &&
        <TaskModal allTasks={allTasks} setAllTasks={setAllTasks} listId={data.id} data={null}  open={open} setOpen={setOpen}/>}
        <div id={data.id} className="w-full h-auto flex flex-col justify-start items-start gap-6 px-4 py-3 border border-[#1A4A8C]">
            <div className="w-full h-auto flex flex-row justify-between items-center gap-4">
                <h2 id="title" className="w-auto text-start text-base/[16px] font-medium text-[#1A4A8C] truncate"> 
                    {data.title}
                </h2>
                <EllipsisVertical className="w-5 h-5 text-[#1A4A8C]" />
            </div>
            <div className="w-full h-auto flex flex-col justify-center items-center gap-3">  
                <div className="w-full h-auto flex flex-row justify-between items-center gap-4">
                    <p className={`w-[calc(100%-52px)] text-start text-sm ${data.tasks.length>0?"text-[#1A4A8C] order-2":"text-[#1A4A8C]/30 order-1"} truncate`}>New Task</p>
                    <button onClick={()=>{setOpen(true)}} className={`w-9 h-9 ${data.tasks.length>0?"order-1":"order-2"} flex flex-col justify-center items-center bg-[#1A4A8C] rounded-full `}>
                        <Plus className="w-6 h-6 text-white"/>
                    </button>
                </div>
                {completedTasks.length>0 && 
                <div id="completed-taskes" className="w-full h-auto flex flex-col justify-center items-center gap-3">
                    <p className="w-full font-light text-green-600">{`Complete (${completedTasks.length})`}</p>
                    <ul className="w-full h-auto flex flex-col justify-center items-center gap-2">
                        {
                            completedTasks.map((item)=>(
                                <li key={item.id} className="w-full">
                                    <TaskItemComplete data={item}/>
                                </li>
                            ))
                        }
                    </ul>
                </div>}
                {incompleteTasks.length>0 && 
                <div id="incompleted-taskes" className="w-full h-auto flex flex-col justify-center items-center gap-3">
                    <p className="w-full font-light text-[#1A4A8C]">{`InComplete (${incompleteTasks.length})`}</p>

                    <ul className="w-full h-auto flex flex-col justify-center items-center gap-3">
                        {
                            incompleteTasks.map((item,i)=>(
                                <li key={i} className="w-full">
                                    <TaskItem allTasks={allTasks} setAllTasks={setAllTasks} listId={data.id} onComplete={markTaskAsComplete} data={item}/>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                }
                    
            </div>
        </div>
        </>
    )
}

export default TaskList;