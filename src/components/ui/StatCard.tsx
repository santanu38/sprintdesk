
interface StatCardProps{
    label:string,
    value:number,
    accentColor?:string
}

function StatCard({label,value,accentColor="text-white"}:StatCardProps){
      return(
        <div className="bg-slate-800 rounded-lg p-4">
            <p className="text-slate-400 text-sm mb-1">{label}</p>
            <p className={`text-2xl font-bold ${accentColor}`}>{value}</p>
        </div>
      )
}

export default StatCard