import NotFound from "../pages/404";
import Homepage from "../pages/homepage";

const routes = [
    {
        path: "/",
        component: Homepage,
        headerName: "Homepage",
    },
    {
        path: "*",
        component: NotFound,
        headerName: "404 Not found",
    },
];

export default routes;
