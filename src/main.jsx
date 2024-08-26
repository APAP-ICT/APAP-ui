import {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from 'react-router-dom';
import './styles.css';
import 'rsuite/dist/rsuite.min.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard/Dashboard';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/SignUp/SignupPage';
import Statistics from './pages/Statistics/Statistics';
import History from './pages/HistoryRecord/HistoryRecord';
import HistoryRecordDetail from './pages/HistoryRecord/HistoryRecordDetail';
import CameraManagement from './pages/CameraManagement/CameraManagement';
import Report from './pages/Report/Report';
import ImageUploader from './pages/ImageUploader/ImageUploader';
import Publisher from './pages/CameraManagement/Publisher.jsx';
import requestPermission from "./push-notification.js";
import {registerServiceWorker} from "../public/register-sw.js";
import NotificationToastComponent from "./components/NotificationToastComponent.jsx";
import {useToaster} from "rsuite";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const toaster = useToaster();

    const handleOnMessage = (payload) => {
        return toaster.push(
            <NotificationToastComponent notification={payload.data}/>,
            {placement: 'bottomEnd'}
        )
    }

    const handleLogin = (email) => {
        setIsAuthenticated(true);
        requestPermission(email, handleOnMessage)
        registerServiceWorker();
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
    };

    const router = createBrowserRouter([
        {
            path: "/login",
            element: <LoginPage onLogin={handleLogin}/>
        },
        {
            path: "/signup",
            element: <SignupPage/>
        },
        {
            path: "/publisher",
            element: <Publisher/>
        },
        {
            path: "/",
            element: isAuthenticated ? (
                <>
                    <Sidebar/>
                    <div className="main-content">
                        <Header onLogout={handleLogout}/>
                        <Outlet/>
                    </div>
                </>
            ) : <Navigate to="/login"/>,
            children: [
                {path: "", element: <Dashboard/>},
                {path: "statistics", element: <Statistics/>},
                {path: "history", element: <History/>},
                {path: "history/:incidentId", element: <HistoryRecordDetail/>},
                {path: "camera-management", element: <CameraManagement/>},
                {path: "report", element: <Report/>},
                {path: "image-upload", element: <ImageUploader/>},
                {path: "*", element: <Navigate to="/"/>}
            ]
        },
        {path: "*", element: <Navigate to={isAuthenticated ? "/" : "/login"}/>}
    ]);

    return (
        <RouterProvider router={router}/>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <App/>
);
