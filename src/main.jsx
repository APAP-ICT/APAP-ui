import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ObjectDetectResult from "./pages/ObjectDetectResult.jsx";
import ImageUploader from "./pages/ImageUploader.jsx";
import Publisher from "./pages/Publisher.jsx";
import Subscriber from "./pages/Subscriber.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ObjectDetectResult/>
    },
    {
        path: "/upload",
        element: <ImageUploader/>,
    },
    {
        path: "publisher",
        element: <Publisher/>
    },
    {
        path: "subscriber",
        element: <Subscriber/>
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
