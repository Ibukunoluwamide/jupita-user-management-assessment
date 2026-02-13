import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import api from '../api/api'
import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Loader from '../components/Loader'
import { useCurrentUser } from '../api/user'


const navigation = [
    { name: 'Dashboard', href: '/users' },
    { name: 'Create User', href: '/users/create' },
]


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function AppLayout({ children, title = "Title" }) {
    const navigate = useNavigate();
    const currentPath = useLocation().pathname
    const user = useCurrentUser()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    const handleLogout = async () => {
        try {
            await api.post('/logout');
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    if (!user) return <Loader />;

    const userNavigation = [
        { name: 'Settings', href: `/users/${user.id}/edit` },
        { name: 'Sign out', href: '#', onclick: handleLogout },
    ]


    return (
        <>
            <div className="min-h-full">
                <Disclosure as="nav" className="bg-gray-500">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">
                                <div className="shrink-0">
                                    <img
                                        alt="Jupita"
                                        src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                        className="size-8"
                                    />
                                </div>
                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        {navigation.map((item) => (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                aria-current={item.current ? 'page' : undefined}
                                                className={classNames(
                                                    item.href == currentPath ? 'bg-gray-950/50 text-white'
                                                        : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                                    'rounded-md px-3 py-2 text-sm font-medium',
                                                )}
                                            >
                                                {item.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">


                                    {/* Profile dropdown */}
                                    <Menu as="div" className="relative ml-3">
                                        <MenuButton className="relative flex max-w-xs items-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                                            <span className="absolute -inset-1.5" />
                                            <span className="sr-only">Open user menu</span>
                                            <img
                                                alt=""
                                                src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
                                                className="size-8 rounded-full outline -outline-offset-1 outline-white/10"
                                            />
                                            <div className="ml-3">
                                                <div className="text-base/5 font-medium text-white">{user.full_name}</div>
                                                <div className="text-sm font-medium text-gray-400">{user.email}</div>
                                            </div>
                                        </MenuButton>

                                        <MenuItems
                                            transition
                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-gray-800 py-1 outline-1 -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                        >
                                            {userNavigation.map((item) => (
                                                <MenuItem key={item.name}>
                                                    <a
                                                        href={item.href}
                                                        onClick={item.onclick}
                                                        className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                                                    >
                                                        {item.name}
                                                    </a>
                                                </MenuItem>
                                            ))}
                                        </MenuItems>
                                    </Menu>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">
                                {/* Mobile menu button */}
                                <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:outline-offset-2 focus:outline-indigo-500">
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open main menu</span>
                                    <Bars3Icon aria-hidden="true" className="block size-6 group-data-open:hidden" />
                                    <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-open:block" />
                                </DisclosureButton>
                            </div>
                        </div>
                    </div>

                    <DisclosurePanel className="md:hidden">
                        <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                            {navigation.map((item) => (
                                <DisclosureButton
                                    key={item.name}
                                    as="a"
                                    href={item.href}
                                    aria-current={item.current ? 'page' : undefined}
                                    className={classNames(
                                        item.href == currentPath ? 'bg-gray-950/50 text-white' : 'text-gray-300 hover:bg-white/5 hover:text-white',
                                        'block rounded-md px-3 py-2 text-base font-medium',
                                    )}
                                >
                                    {item.name}
                                </DisclosureButton>
                            ))}
                        </div>
                        <div className="border-t border-white/10 pt-4 pb-3">
                            <div className="flex items-center px-5">
                                <div className="shrink-0">
                                    <img
                                        alt=""
                                        src="https://static.vecteezy.com/system/resources/thumbnails/003/337/584/small/default-avatar-photo-placeholder-profile-icon-vector.jpg"
                                        className="size-10 rounded-full outline -outline-offset-1 outline-white/10"
                                    />
                                </div>
                                <div className="ml-3">
                                    <div className="text-base/5 font-medium text-white">{user.full_name}</div>
                                    <div className="text-sm font-medium text-gray-400">{user.email}</div>
                                </div>

                            </div>
                            <div className="mt-3 space-y-1 px-2">
                                {userNavigation.map((item) => (
                                    <DisclosureButton
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        onClick={item.onclick}
                                        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-white/5 hover:text-white"
                                    >
                                        {item.name}
                                    </DisclosureButton>
                                ))}
                            </div>
                        </div>
                    </DisclosurePanel>
                </Disclosure>

                <header className="relative bg-gray-800 after:pointer-events-none after:absolute after:inset-x-0 after:inset-y-0 after:border-y after:border-white/10">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-white">{title}</h1>
                    </div>
                </header>
                <main>
                    {loading && (
                        <div className="fixed inset-0 bg-white flex items-center justify-center z-50">
                            <Loader />
                        </div>
                    )}
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">{children}</div>
                </main>
            </div>
        </>
    )
}
