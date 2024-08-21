import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import {createBrowserRouter, Navigate, Outlet, RouterProvider} from 'react-router-dom';
import './styles.css';
import 'rsuite/dist/rsuite.min.css';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import LoginPage from './pages/Login/LoginPage';
import SignupPage from './pages/SignUp/SignupPage';
import Dashboard from './pages/Dashboard/Dashboard';
import Statistics from './pages/Statistics/Statistics';
import History from './pages/HistoryRecord/HistoryRecord';
import CameraManagement from './pages/CameraManagement/CameraManagement';
import Report from './pages/Report/Report';
import ObjectDetectResult from './pages/ObjectDetectResultList/ObjectDetectResult';
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
        const {title, body, image} = payload.notification
        return toaster.push(
            <NotificationToastComponent title={title} datetime={body} image={image}/>,
            {placement: 'bottomEnd'}
        )
    }

    const handleLogin = (email) => {
        setIsAuthenticated(true);
        requestPermission(email, handleOnMessage)
        registerServiceWorker()
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
                {path: "camera-management", element: <CameraManagement/>},
                {path: "report", element: <Report/>},
                {path: "image-upload", element: <ImageUploader/>},
                // 하위는 임시 메뉴
                {path: "object-detect", element: <ObjectDetectResult/>},
                {path: "publisher", element: <Publisher/>}
            ]
        }
    ]);

    return (
        <RouterProvider router={router}/>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <App/>
);
