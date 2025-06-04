import { Bell, Check,Pencil } from "lucide-react";
import { useState ,useEffect} from "react";
import { formatDateWithSuffix } from "../../lib/uilites";
import TaskModal from "../models/taskModel";


export const TaskItemComplete = ({data})=>{
    
    return(
        <div className="w-full h-auto flex flex-row justify-between items-center gap-4">
            <div className={`w-9 h-9 flex flex-col justify-center items-center border border-green-600 rounded-full `}>
                <Check className="w-7 h-7 stroke-1 text-green-600"/>
            </div>
            <p className={`w-[calc(100%-52px)] text-start text-sm text-green-600 truncate`}>{data?.title}</p>
        </div>
    )
}

export const TaskItem = ({data, onComplete ,allTasks,setAllTasks,listId})=>{
    console.log(data);
    const [show,setShow]= useState(false);
    const [open,setOpen] = useState(false);
    const markAsComplete = async () => {
        await onComplete(data.id);
    };
    return(
        <>
        {open && <TaskModal allTasks={allTasks} setAllTasks={setAllTasks} listId={listId} data={data} open={open} setOpen={setOpen}/>}
        <div className="group w-full h-auto flex flex-row justify-between items-start gap-4 hover:cursor-pointer">
            <div onClick={markAsComplete} className={`w-9 h-9 flex flex-col justify-center items-center border border-[#1A4A8C] rounded-full `}>
            </div>
            <div className="w-[calc(100%-52px)] h-auto flex flex-row flex-wrap justify-start items-center gp-2">
                <div className="w-full h-9 flex flex-row justify-start items-center gap-4">
                    <p onClick={()=>{setShow(!show)}} className={`w-[calc(100%-52px)] text-start text-sm text-[#1A4A8C] truncate`}>{data?.title}</p>
                    <div className={`w-6 h-6 flex flex-col justify-center items-center `}>
                        {show?<Bell className="w-5 h-5 text-[#1A4A8C]"/>:<Pencil onClick={()=>{setOpen(true)}} className="invisible group-hover:visible w-5 h-5 text-[#1A4A8C]" />}
                    </div>
                </div>
                {
                    show && 
                    <div className="w-full h-auto flex flex-col justify-start items-start gap-2">
                        <p className="w-full text-left text-sm text-[#1A4A8C]/75 font-normal line-clamp-4">{data?.description}</p>
                        <div className="w-auto text-xs font-medium h-auto px-3 py-2 text-[#1A4A8C] bg-[#1A4A8C]/10 rounded-sm">
                            {formatDateWithSuffix(data?.dueDate)}
                        </div>
                    </div>
                }
            </div>
        </div>
        </>
    )
}
