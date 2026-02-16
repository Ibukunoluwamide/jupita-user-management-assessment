import {
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
} from "@headlessui/react";
import {
    Bars3Icon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCurrentUser } from "../api/user";
import api from "../api/api";
import Loader from "../components/Loader";
import { toast } from "sonner";

const navigation = [
    { name: "Dashboard", href: "/users" },
    { name: "Create User", href: "/users/create" },
];

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function AppLayout({ children, title = "Dashboard" }) {
    const navigate = useNavigate();
    const currentPath = useLocation().pathname;
    const user = useCurrentUser();

    const handleLogout = async () => {
        try {
            await api.post("/logout");
            localStorage.removeItem("token");
            toast.success("Log out successful")
            navigate("/login");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    if (!user) return <Loader />;

    const userNavigation = [
        { name: "Edit profile", href: `/users/${user.id}/edit` },
        { name: "Log out", action: handleLogout },
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            <Disclosure as="nav" className="bg-white border-b border-gray-200 shadow-sm">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between items-center">

                        {/* Left */}
                        <div className="flex items-center space-x-10">
                            <img
                                src="https://www.getjupita.com/assets/jupita-logo-DBEWlkI2.jpg"
                                alt="Logo"
                                className="h-12 w-auto"
                            />

                            <div className="hidden md:flex space-x-4">
                                {navigation.map((item) => (
                                    <Link
                                        key={item.name}
                                        to={item.href}
                                        className={classNames(
                                            currentPath === item.href
                                                ? "bg-blue-100 text-blue-700"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
                                            "px-3 py-2 rounded-md text-sm font-medium transition"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Right */}
                        <div className="hidden md:flex items-center space-x-4">

                            <Menu as="div" className="relative">
                                <MenuButton className="flex items-center space-x-3 focus:outline-none">
                                    <img
                                        src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
                                        alt=""
                                        className="h-9 w-9 rounded-full border border-gray-300"
                                    />
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-gray-800">
                                            {user.full_name}
                                        </p>
                                        <p className="text-xs text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>
                                </MenuButton>

                                <MenuItems className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-2 focus:outline-none z-50">
                                    {userNavigation.map((item) => (
                                        <MenuItem key={item.name}>
                                            {({ active }) =>
                                                item.href ? (
                                                    <Link
                                                        to={item.href}
                                                        className={classNames(
                                                            active
                                                                ? "bg-gray-100"
                                                                : "",
                                                            "block px-4 py-2 text-sm text-gray-700"
                                                        )}
                                                    >
                                                        {item.name}
                                                    </Link>
                                                ) : (
                                                    <button
                                                        onClick={item.action}
                                                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                                    >
                                                        {item.name}
                                                    </button>
                                                )
                                            }
                                        </MenuItem>
                                    ))}
                                </MenuItems>
                            </Menu>
                        </div>

                        {/* Mobile Button */}
                        <div className="md:hidden">
                            <DisclosureButton className="p-2 text-gray-500 hover:text-gray-700">
                                <Bars3Icon className="h-6 w-6" />
                            </DisclosureButton>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                <DisclosurePanel className="md:hidden px-4 pb-4">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            to={item.href}
                            className="block py-2 text-gray-600 hover:text-gray-900"
                        >
                            {item.name}
                        </Link>
                    ))}

                    <div className="border-t mt-3 pt-3">
                        <Link
                            to={`/users/${user.id}/edit`}
                            className="block py-2 text-gray-600"
                        >
                            Settings
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="block py-2 text-red-600"
                        >
                            Log out
                        </button>
                    </div>
                </DisclosurePanel>
            </Disclosure>

            <header className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <h1 className="text-2xl font-bold text-gray-800">
                        {title}
                    </h1>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 py-6">
                {children}
            </main>
        </div>
    );
}
