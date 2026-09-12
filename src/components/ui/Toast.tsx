import { useEffect } from "react"
import { useToastStore, type ToastType } from "../../store/toastStore"

const typeStyles:Record<ToastType,string>={
    success:"bg-green-600",
    error:"bg-red-600",
    info: "bg-blue-600",
}

function ToastContainer(){
    const toasts=useToastStore((state)=>state.toasts)
    const removeToast=useToastStore((state)=>state.removeToast)
    

    return(
        <div className="fixed bottom-4 z-[100] space-y-2">
             {toasts.map((toast)=>(
               <ToastItem
               key={toast.id}
                id={toast.id}
                message={toast.message}
                type={toast.type}
                onDismiss={removeToast}
               />

             ))}
        </div>
    )
}

interface ToastItemsProps{
    id:number
    message:string
    type:ToastType
    onDismiss:(id:number)=>void
}

function ToastItem({id,message,type,onDismiss}:ToastItemsProps){
  
   useEffect(()=>{
     const timer=setTimeout(()=>onDismiss(id),4000)
     return ()=>clearTimeout(timer)
   },[id,onDismiss])
    
    return(
    <div 
    role="status"
    className={`${typeStyles[type]} text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between gap-3 min-w-[250px]`}>
      <span className="text-sm">{message}</span>
      <button
      onClick={()=>onDismiss(id)}
      className="text-white/80 hover:text-white"
      //   aria-level="Dismiss notification"
      >
       X
      </button>
    </div>
  )
}

export default ToastContainer