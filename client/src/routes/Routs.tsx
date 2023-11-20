import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Deshbord from "../pages/Deshbord";
import HomePage from "../pages/HomePage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CategoryByName from "../pages/CategoryByName";
import BannerCreateOrEdit from "../pages/BannerCreateOrEdit";
import AllBanners from "../pages/AllBanners";
import BannerByCategoryByName from "../pages/CategoryByName";
import BannerByProducdID from "../pages/BannerByProducdID";

export default function Routs() {
    const router = createBrowserRouter([
        {
            path: "/deshbord",
            element: <Deshbord />,
            children: [
                {
                    path: "/homePage",
                    element: <HomePage />,
                },
                {
                    path: "/login",
                    element: <Login />,
                },
                {
                    path: "/register",
                    element: <Register />,
                },
                {
                    path: "/category/:name",
                    element: <CategoryByName />,
                },
                {
                    path: "/banners",
                    element: <AllBanners />,
                },
                {
                    path: "/banners/:producdID",
                    element: <BannerByProducdID />,
                },
                {
                    path: "/banners/category/:name",
                    element: <BannerByCategoryByName />,
                },
                {
                    path: "/banners/edit/:bannerID",
                    element: <BannerCreateOrEdit />,
                },
                {
                    path: "banners/create/:productID",
                    element: <BannerCreateOrEdit />,
                },
            ],
        }

    ]);

    return <RouterProvider router={router} />;
}
