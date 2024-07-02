import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import ObjectDetectResult from "./components/ObjectDetectResult.jsx";
import ImageUploader from "./components/ImageUploader.jsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <ObjectDetectResult/>
    },
    {
        path: "/upload",
        element: <ImageUploader/>,
    },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
