import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Deshbord from "../pages/Deshbord";
// import HomePage from "../pages/HomePage";
import CategoryByName from "../pages/bannersPages/BannerByCategoryByName";
import AllBanners from "../pages/bannersPages/AllBanners";
import BannerByCategoryByName from "../pages/bannersPages/BannerByCategoryByName";
import BannerByProducdID from "../pages/bannersPages/BannerByProducdID";
import ErrorPage from "./ErrorPage";
import App from "../App";
import Register from "../pages/loginANDregister/Register";
import Login from "../pages/loginANDregister/Login";
import CreateBanner from "../pages/bannersPages/CreateBanner";
import BannerByUserID from "../pages/bannersPages/BannerByUserID";

export default function Routs() {
    const router = createBrowserRouter([
        {
            path: "/login",
            element: <Login />,
            errorElement: <ErrorPage />,
        },
        {
            path: "/",
            element: <App />,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/deshbord",
                    element: <Deshbord />,
                    errorElement: <ErrorPage />,
                    children: [
                        // {
                        //     path: "",
                        //     element: <HomePage />,
                        //     errorElement: <ErrorPage />,
                        // },

                        {
                            path: "login",
                            element: <Login />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: "createBanner",
                            element: <CreateBanner />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: "register",
                            element: <Register />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: "category/:name",
                            element: <CategoryByName />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: "banners",
                            element: <AllBanners />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: "banners/:productID",
                            element: <BannerByProducdID />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: "banners/category/:name",
                            element: <BannerByCategoryByName />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: `banners/user/:userID`,
                            element: <BannerByUserID />,
                            errorElement: <ErrorPage />,
                        },
                        // {
                        //     path: "banners/edit/:bannerID",
                        //     element: <BannerCreateOrEdit />,
                        //     errorElement: <ErrorPage />,
                        // },
                        // {
                        //     path: "banners/create/:productID",
                        //     element: <BannerCreateOrEdit />,
                        //     errorElement: <ErrorPage />,
                        // },
                    ],
                }
            ]
        },
    ]);

    return <RouterProvider router={router} />;
}
