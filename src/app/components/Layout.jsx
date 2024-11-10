import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex gap-3">
      <Sidebar />
      <div className="w-full h-[100vh] overflow-y-scroll">{children}</div>
    </div>
  );
}
