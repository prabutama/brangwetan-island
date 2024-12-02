import React, { useState } from "react";
import { Menu, X, Home, BookOpen, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);  // State to handle the dialog visibility
    const { user, logout } = useAuth();

    const menu = [
        { name: "Beranda", href: "/", icon: Home },
        { name: "Modul", href: "#", icon: BookOpen },
    ];

    return (
        <nav className="bg-hijau py-4 px-6 fixed w-full top-0 z-50 transition-all duration-300 ease-in-out rounded-b-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <img
                        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
                        alt="logo"
                        width="50"
                        className="text-white"
                    />
                    <p className="text-white text-xl font-normal font-poppins">
                        Brangwetan Island
                    </p>
                </div>

                {/* Menu Hamburger untuk Mobile */}
                <div className="lg:hidden">
                    {!navOpen ? (
                        <Menu
                            onClick={() => setNavOpen(true)}
                            className="text-3xl text-white cursor-pointer"
                        />
                    ) : (
                        <X
                            onClick={() => setNavOpen(false)}
                            className="text-3xl text-white cursor-pointer"
                        />
                    )}
                </div>

                {/* Menu Desktop */}
                <div className="hidden lg:flex gap-10 justify-center items-center">
                    {menu.map((item, index) => (
                        <a
                            key={index}
                            href={item.href}
                            className="text-white text-lg font-semibold transition-colors duration-300"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                {/* Tombol Login / User */}
                <div className="hidden sm:block">
                    {
                        user ? (
                            // Dropdown untuk Logout di Desktop
                            <DropdownMenu>
                                <DropdownMenuTrigger>
                                    <div className="flex items-center space-x-2 cursor-pointer">
                                        <User size={24} className="text-white" />
                                        <p className="text-white text-lg">{user.name}</p>
                                    </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="bg-white text-gray-800 rounded-lg shadow-lg p-2">
                                    <DropdownMenuItem
                                        onClick={() => setOpenDialog(true)} // Show dialog on logout
                                        className="flex items-center space-x-2 hover:bg-indigo-100"
                                    >
                                        <LogOut size={20} />
                                        <span>Logout</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button className="bg-white text-hijau text-sm py-3 px-6 rounded-lg hover:bg-gray-100">
                                <Link to="/login">
                                    Login sebagai Admin
                                </Link>
                            </Button>
                        )
                    }
                </div>
            </div>

            {/* Menu Mobile */}
            {navOpen && (
                <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 p-4 lg:hidden">
                    <div className="bg-white rounded-lg p-5">
                        <div className="flex justify-end">
                            <X
                                onClick={() => setNavOpen(false)}
                                className="text-3xl text-gray-800 cursor-pointer"
                            />
                        </div>
                        <div className="flex flex-col items-center space-y-6">
                            {menu.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className="text-gray-800 text-lg flex flex-col items-center justify-center hover:text-indigo-500"
                                >
                                    <item.icon size={24} />
                                    <span className="mt-2">{item.name}</span>
                                </a>
                            ))}
                            {/* Dropdown Logout di Mobile */}
                            {user ? (
                                <div className="mt-4">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <div className="flex items-center space-x-2 cursor-pointer">
                                                <User size={24} className="text-gray-800" />
                                                <span className="text-lg text-gray-800">{user.name}</span>
                                            </div>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="bg-white text-gray-800 rounded-lg shadow-lg p-2 mt-4">
                                            <DropdownMenuItem
                                                onClick={() => setOpenDialog(true)} // Show dialog on logout
                                                className="flex items-center space-x-2 hover:bg-indigo-100"
                                            >
                                                <LogOut size={20} />
                                                <span>Logout</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            ) : (
                                <Button className="bg-hijau text-white text-sm py-3 px-6 rounded-lg">
                                    <Link to="/login">
                                        Login sebagai Admin
                                    </Link>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Dialog Konfirmasi Logout */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                <DialogContent className="bg-white text-gray-800 rounded-lg shadow-lg p-4 w-[90%`] sm:w-full">
                    <DialogTitle>Konfirmasi Logout</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin logout?
                    </DialogDescription>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpenDialog(false)}>
                            Batal
                        </Button>
                        <Button
                            className="ml-2"
                            onClick={() => {
                                logout();
                                setOpenDialog(false); // Close the dialog after logout
                            }}
                        >
                            Logout
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </nav>
    );
};

export default Navbar;
