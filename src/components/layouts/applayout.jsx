import { useState } from "react";
import Header from "../navbars/header"
import { Plus } from "lucide-react";
import AddListModal from "../models/addList";

const AppLayout = ({children,setOpen})=>{
    
    return(
        <div className="w-screen min-h-screen flex flex-col justify-start items-start">
            <Header/>
            
            <main className="w-screen h-auto p-4">
                {children}
                <button onClick={()=>setOpen(true)} className="fixed bottom-8 right-6 w-14 h-14 flex flex-col justify-center items-center bg-[#1A4A8C] rounded-full hover:cursor-pointer">
                    <Plus className="w-10 h-10 text-white" />
                </button>
            </main>
        </div>
    );
}

export default AppLayout;