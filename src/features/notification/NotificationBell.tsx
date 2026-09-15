import { useState } from "react";
import { useNotificationStore } from "../../store/notificationStore";
import { useNotificationPolling } from "../../hooks/useNotificationPolling";

function NotificationBell(){
    const [isOpen,setIsOpen]=useState(false)
    const notifications=useNotificationStore((state)=>state.notifications)
    const markAsRead=useNotificationStore((state)=>state.markAsRead)
    const markAllRead=useNotificationStore((state)=>state.markAllRead)

    useNotificationPolling(isOpen)

    const unreadCount=notifications.filter((n)=>!n.read).length

    return(
        <div className="relative">
            <button
            onClick={()=>setIsOpen((prev)=>!prev)}
            className="relative text-slate-300 hover:text-white"
            aria-label="Notifications"
            >
              🔔
              {unreadCount>0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                     {unreadCount>9 ? "9+" :unreadCount}
                </span>
              )}
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-800 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto ">
                     <div className="flex justify-between items-center p-3 border-b border-slate-700">
                          <h3 className="text-white font-medium text-sm">Notifications</h3>
                          <button 
                          onClick={markAllRead}
                          className="text-blue-400 hover:text-blue-300 text-xs">
                              Mark all as read
                          </button>
                     </div>
                     {notifications.length===0 ?(
                        <p className="text-slate-400 text-sm p-4">No notifications yet</p>
                     ):(
                        notifications.map((notification)=>(
                               <div 
                               key={notification.id}
                               onClick={()=>markAsRead(notification.id)}
                                className={`p-3 border-b border-slate-700 cursor-pointer hover:bg-slate-700 ${
                                notification.read ? "opacity-60" : ""
                                }`}
                               >
                                <p className="text-white text-sm">{notification.title}</p>
                                <p className="text-slate-400 text-xs truncate">{notification.message}</p>
                               </div>
                        ))
                     )}
                </div>
            )}
        </div>
    )


}
export default NotificationBell