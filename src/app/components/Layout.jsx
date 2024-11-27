import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex gap-5">
      <Sidebar />
      <div className="w-full h-[100vh] overflow-y-scroll hidden-scrollbar mr-5 px-2">
        {children}
      </div>
    </div>
  );
}
