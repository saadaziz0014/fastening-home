export default function Card({ value, title }) {
  return (
    <div className="w-[21%] bg-white p-4 rounded-lg shadow-custom-lg">
      <div className="mb-2 flex flex-col gap-2">
        <h3 className="text-[#667085]">{title}</h3>
        <h1 className="text-2xl font-bold">{value}</h1>
      </div>
    </div>
  );
}
