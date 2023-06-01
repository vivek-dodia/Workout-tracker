type StatCardProps = {
  label: string
  value: string | number
}

const StatCard = ({ label, value }: StatCardProps) => {
  return (
    <div className="bg-white px-4 py-4 rounded-lg shadow-md whitespace-nowrap">
      <h3 className="text-gray-500 text-sm">{label}</h3>
      <h2 className="font-bold text-2xl mt-1">{value}</h2>
    </div>
  )
}

export default StatCard
