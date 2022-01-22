import './DashboardLayout.css';

export default function DashboardLayout({children}){
    return (
        <div className="panelPage">
            <div className="panelPageContent">
                {children}
            </div>
        </div>
    )
} 