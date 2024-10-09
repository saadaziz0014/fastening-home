import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <div>
            <Sidebar />
            {children}
        </div>
    );
}