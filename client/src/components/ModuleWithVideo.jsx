import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Pencil, Trash, X } from 'lucide-react';
import { Form } from "./Form";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";

function ModuleWithVideo() {
    const [modules, setModules] = useState([]);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editModule, setEditModule] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const token = localStorage.getItem("token");

    // Toggle Form Display
    const handleToggleForm = useCallback(() => {
        setShowForm((prev) => !prev);
        setEditModule(null);
    }, []);

    // Set Module for Editing
    const handleEdit = (module) => {
        setEditModule(module);
        setShowForm(true);
    };

    // Delete Module
    const deleteModule = useCallback(async () => {
        if (confirmDeleteId === null) return;
        try {
            await axios.delete(`http://localhost:3000/api/module/${confirmDeleteId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setModules((prev) => prev.filter((module) => module.id !== confirmDeleteId));
            setConfirmDeleteId(null);
        } catch (err) {
            setError(err?.response?.data?.message || err.message || "Error deleting module");
        }
    }, [confirmDeleteId, token]);

    // Fetch Modules on Component Mount and Form Toggle
    useEffect(() => {
        const fetchModules = async () => {
            setIsLoading(true);
            try {
                const response = await axios.get("http://localhost:3000/api/module");
                setModules(response.data.modules.filter((module) => module.type === "video"));
            } catch (err) {
                setError(err?.response?.data?.message || err.message || "Failed to fetch modules");
            } finally {
                setIsLoading(false);
            }
        };
        fetchModules();
    }, [showForm]);

    // Render Loading State
    const renderLoading = () => (
        Array.from({ length: 4 }).map((_, index) => (
            <motion.div
                key={index}
                className="bg-gray-100 rounded-xl shadow-lg overflow-hidden animate-pulse h-72 flex flex-col"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            >
                <div className="aspect-video bg-gray-300"></div>
                <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
            </motion.div>
        ))
    );

    // Render Modules
    const renderModules = () => (
        modules.map((module) => (
            <motion.div
                key={module.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transition-shadow duration-300 flex flex-col"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <div className="relative w-full h-72 group">
                    <iframe
                        src={`${module.content}`}
                        allowFullScreen
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    ></iframe>
                    {user?.role === "admin" && renderAdminControls(module)}
                </div>
                <div className="p-6 flex-grow">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{module.title}</h3>
                    <p className="text-gray-600 text-sm">{module.description}</p>
                </div>
            </motion.div>
        ))
    );

    // Render Admin Controls
    const renderAdminControls = (module) => (
        <div className="absolute top-3 right-3 flex space-x-2">
            <Button
                className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
                onClick={() => handleEdit(module)}
            >
                <Pencil className="w-4 h-4" />
            </Button>
            <Dialog>
                <DialogTrigger>
                    <Button
                        className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                        onClick={() => setConfirmDeleteId(module.id)}
                    >
                        <Trash className="w-4 h-4" />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
                    <DialogDescription>
                        Apakah Anda yakin ingin menghapus modul ini?
                    </DialogDescription>
                    <DialogFooter>
                        <DialogClose>
                            <Button variant="outline">Batal</Button>
                        </DialogClose>
                        <Button className="bg-red-600 hover:bg-red-700" onClick={deleteModule}>
                            Hapus
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );

    // Handle Error State
    const renderError = () => <p className="text-red-500">Error: {error}</p>;

    return (
        <div className="w-full px-4 md:px-8 lg:px-16 py-12 bg-gradient-to-t from-green-50 to-white">
            <motion.div
                className="w-full lg:w-3/4 mb-8 text-left lg:text-center mx-auto lg:mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <motion.h1
                    className="mb-2 lg:mb-6 text-3xl tracking-tight font-bold text-left lg:text-center sm:text-5xl lg:text-5xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                >
                    <motion.span
                        className="block bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-400"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Video Pembelajaran
                    </motion.span>
                </motion.h1>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
                {isLoading ? renderLoading() : renderModules()}
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="p-4 bg-white w-[85%] md:max-w-md rounded-lg shadow-lg relative">
                        <X
                            onClick={handleToggleForm}
                            className="h-6 w-6 text-black absolute right-4 top-4 cursor-pointer"
                        />
                        <Form
                            title={editModule ? "Edit Modul" : "Tambah Modul"}
                            api={`http://localhost:3000/api/module${editModule ? `/${editModule.id}` : ""}`}
                            method={editModule ? "PUT" : "POST"}
                            initialValues={
                                editModule || {
                                    title: "",
                                    description: "",
                                    type: "video",
                                    content: null,
                                }
                            }
                            fields={[
                                { name: "title", label: "Judul", placeholder: "Masukkan Judul Modul" },
                                { name: "description", label: "Deskripsi", placeholder: "Masukkan deskripsi", type: "textarea" },
                                ...(editModule
                                    ? []
                                    : [{ name: "content", label: "Konten", type: "text" }]),
                            ]}
                        />
                    </div>
                </div>
            )}

            {user?.role === "admin" && (
                <div className="w-full flex justify-center items-center mt-12">
                    <Button
                        onClick={handleToggleForm}
                        className="py-2 px-6 flex gap-2 items-center rounded-lg text-sm bg-hijau text-white hover:bg-green-500 transition duration-300"
                    >
                        Tambah Modul
                    </Button>
                </div>
            )}
        </div>
    );
}

export default ModuleWithVideo;
