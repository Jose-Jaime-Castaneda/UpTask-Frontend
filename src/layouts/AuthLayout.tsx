import Logo from "@/components/Logo";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

export default function AuthLayout() {
    return (
        <>
            <div className="bg-gray-800 min-h-screen px-5">
                <div className="py-10 lg:py-20 mx-auto w-full sm:w-2/3 md:w-2/3 lg:w-1/3">
                    <Logo />
                    <div className="mt-10">
                        <Outlet />
                    </div>
                </div>
            </div>

            <ToastContainer
                pauseOnHover={false}
                pauseOnFocusLoss={false}
            />
        </>
    );
};