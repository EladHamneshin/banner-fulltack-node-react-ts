import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Deshbord from "../pages/Deshbord";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CategoryByName from "../pages/CategoryByName";
import BannerCreateOrEdit from "../pages/BannerCreateOrEdit";
import AllBanners from "../pages/AllBanners";
import BannerByCategoryByName from "../pages/CategoryByName";
import BannerByProducdID from "../pages/BannerByProducdID";
import ErrorPage from "./ErrorPage";
import App from "../App";

export default function Routs() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <App/>,
            errorElement: <ErrorPage />,
            children: [
                {
                    path: "/deshbord",
                    element: <Deshbord />,
                    errorElement: <ErrorPage />,
                    children: [
                        {
                            path: "",
                            element: <HomePage />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: "login",
                            element: <LoginPage />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: "register",
                            element: <RegisterPage />,
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
                            path: "banners/:producdID",
                            element: <BannerByProducdID />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: "banners/category/:name",
                            element: <BannerByCategoryByName />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: "banners/edit/:bannerID",
                            element: <BannerCreateOrEdit />,
                            errorElement: <ErrorPage />,
                        },
                        {
                            path: "banners/create/:productID",
                            element: <BannerCreateOrEdit />,
                            errorElement: <ErrorPage />,
                        },
                    ],
                }
            ]
        },
    ]);

    return <RouterProvider router={router} />;
}
