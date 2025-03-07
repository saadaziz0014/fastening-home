import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <div className="flex gap-3">
            <Sidebar />
            <div className="max-h-screen">
                {children}
            </div>
        </div>
    );
}