
interface SkeletonProps{
    className?:string
}

function Skeleton({className=""}:SkeletonProps){
    return(
        <div
         role="status"
         aria-label="Loading"
         className={`animate-pulse bg-slate-700 rounded ${className}`}
        >
          
        </div>
    )
}
export default Skeleton