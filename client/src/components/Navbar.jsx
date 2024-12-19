import React, { useState } from "react";
import { Menu, X, Home, BookOpen, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

const Navbar = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const { user, logout } = useAuth();

    const scrollToEbtExplanation = () => {
        const element = document.getElementById('ebt-explanation');
        if (element) {
            const offset = window.innerWidth < 768 ? -60 : -100;
            window.scrollTo({
                top: element.getBoundingClientRect().top + window.scrollY + offset,
                behavior: 'smooth',
            });
        }
    };

    const menuItems = [
        { name: "Beranda", href: "/", icon: Home },
        { name: "Modul", href: "#modul", icon: BookOpen, action: scrollToEbtExplanation },
    ];

    const renderMenu = (isMobile = false) =>
        menuItems.map((item, index) => (
            <a
                key={index}
                href={item.href || "#"}
                onClick={item.action || null}
                className={`text-md font-semibold flex items-end gap-2 ${isMobile ? "text-gray-800 hover:text-green-500" : "text-white transition-colors duration-300"
                    }`}
            >
                {isMobile && <item.icon size={24} />}
                <span className={`${isMobile ? "mt-2 block" : ""}`}>{item.name}</span>
            </a>
        ));

    const UserDropdown = () => (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center space-x-2 cursor-pointer">
                    <User size={24} className="text-white" />
                    <p className="text-white text-lg">{user.name}</p>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white text-gray-800 rounded-lg shadow-lg p-2">
                <DropdownMenuItem
                    onClick={() => setOpenDialog(true)}
                    className="flex items-center space-x-2 hover:bg-indigo-100"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    const MobileMenu = () => (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 z-50 p-4 lg:hidden">
            <div className="bg-white rounded-lg p-5">
                <div className="flex justify-end">
                    <X onClick={() => setNavOpen(false)} className="text-3xl text-gray-800 cursor-pointer" />
                </div>
                <div className="flex flex-col items-center space-y-6">
                    {renderMenu(true)}
                    {user ? (
                        <div className="mt-4">
                            <UserDropdown />
                        </div>
                    ) : (
                        <Button className="bg-hijau text-white text-sm py-3 px-6 rounded-lg hover:bg-hijau">
                            <Link to="/login">Login sebagai Admin</Link>
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );

    const LogoutDialog = () => (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="bg-white text-hijau rounded-lg shadow-lg p-4 max-w-[90%] lg:w-1/2">
                <DialogTitle>Konfirmasi Logout</DialogTitle>
                <DialogDescription>Apakah Anda yakin ingin logout?</DialogDescription>
                <DialogFooter>
                    <Button variant="outline" className="hover:text-hijau" onClick={() => setOpenDialog(false)}>
                        Batal
                    </Button>
                    <Button
                        className="bg-hijau hover:bg-green-600 hover:text-white mb-2"
                        onClick={() => {
                            logout();
                            setOpenDialog(false);
                        }}
                    >
                        Logout
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );

    return (
        <nav className="bg-gradient-to-r from-green-500 via-green-500 to-yellow-500 py-4 px-6 fixed w-full top-0 z-50 transition-all duration-300 ease-in-out rounded-b-lg">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <p className="text-white text-xl font-normal font-poppins">Brangwetan Island</p>
                </div>

                <div className="lg:hidden">
                    {!navOpen ? (
                        <Menu onClick={() => setNavOpen(true)} className="text-3xl text-white cursor-pointer" />
                    ) : (
                        <X onClick={() => setNavOpen(false)} className="text-3xl text-white cursor-pointer" />
                    )}
                </div>

                <div className="hidden lg:flex gap-10 justify-center items-center">{renderMenu()}</div>

                <div className="hidden sm:block">
                    {user ? <UserDropdown /> : <Button className="bg-white text-hijau text-sm py-3 px-6 rounded-lg hover:bg-gray-100">
                        <Link to="/login">Login sebagai Admin</Link>
                    </Button>}
                </div>
            </div>

            {navOpen && <MobileMenu />}
            <LogoutDialog />
        </nav>
    );
};

export default Navbar;
