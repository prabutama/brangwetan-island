import { createBrowserRouter } from "react-router-dom";
import Home from "@/pages/Home";
import { Login } from "@/pages/auth/Login";
import PrivateRoute from "./PrivateRoute";
import BlockedRoute from "./BlockedRoute";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/login",
        element: <BlockedRoute><Login /></BlockedRoute>,

    },
]);

export default router;
