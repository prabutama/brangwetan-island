import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash, X } from 'lucide-react';
import { Form } from "./Form";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
    Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose
} from "@/components/ui/dialog";

const ModuleWithImage = () => {
    const [modules, setModules] = useState([]);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [editModule, setEditModule] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();
    const token = localStorage.getItem("token");

    const fetchModules = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get("http://localhost:3000/api/module");
            const filteredModules = data.modules.filter((module) => module.type === "image");
            setModules(filteredModules);
        } catch (err) {
            setError(err.response?.data?.message || err.message || "Failed to fetch modules");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleForm = () => {
        setShowForm((prev) => !prev);
        setEditModule(null);
    };

    const handleEdit = (module) => {
        setEditModule(module);
        setShowForm(true);
    };

    const deleteModule = async () => {
        if (confirmDeleteId === null) return;

        try {
            await axios.delete(`http://localhost:3000/api/module/${confirmDeleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setModules((prev) => prev.filter((module) => module.id !== confirmDeleteId));
            setConfirmDeleteId(null);
        } catch (err) {
            console.error("Error deleting module:", err);
        }
    };

    useEffect(() => {
        fetchModules();
    }, [showForm]);

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    return (
        <div className="w-full px-4 md:px-8 lg:px-16 py-12 bg-gradient-to-b from-green-50 to-white">
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
                        className="block text-green-600"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Penerapan
                    </motion.span>
                    <motion.span
                        className="block bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-400"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Energi Baru Terbarukan
                    </motion.span>
                </motion.h1>
                <motion.p
                    className="mb-3 text-[17px] text-slate-500 lg:text-xl text-justify lg:text-center tracking-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    Penerapan EBT melibatkan proses mengubah sumber energi alami yang berkelanjutan menjadi energi yang dapat kita manfaatkan dalam kehidupan sehari-hari, terutama dalam bentuk listrik. Penerapan ini bisa dilakukan dalam skala besar maupun kecil, baik oleh pemerintah, perusahaan, maupun individu.
                </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {isLoading
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse flex flex-col h-full">
                            <div className="aspect-video bg-gray-200"></div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-10 bg-gray-200 rounded w-1/2 mt-auto"></div>
                            </div>
                        </div>
                    ))
                    : modules.map((module) => (
                        <motion.div
                            key={module.id}
                            className="bg-white rounded-xl shadow-lg overflow-hidden transition-shadow duration-300 hover:shadow-xl flex flex-col h-full"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="relative w-full h-72">
                                <img
                                    src={`http://localhost:3000${module.content}`}
                                    alt={module.title}
                                    className="w-full h-full object-cover"
                                />
                                {user?.role === "admin" && (
                                    <div className="absolute top-2 right-2 flex space-x-2">
                                        <Button
                                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                                            onClick={() => handleEdit(module)}
                                        >
                                            <Pencil className="w-4 h-4" />
                                        </Button>
                                        <Dialog>
                                            <DialogTrigger>
                                                <Button
                                                    className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
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
                                                    <Button className="bg-red-500 hover:bg-red-600" onClick={deleteModule}>
                                                        Hapus
                                                    </Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                )}
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{module.title}</h3>
                                <div className="text-gray-600 text-sm flex-grow">
                                    <p className="text-gray-600 text-justify tracking-tight">{module.description}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
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
                            initialValues={editModule || { title: "", description: "", type: "image", content: null }}
                            fields={[
                                { name: "title", label: "Judul", placeholder: "Masukkan Judul Modul" },
                                { name: "description", label: "Deskripsi", placeholder: "Masukkan deskripsi", type: "textarea" },
                                ...(editModule ? [] : [
                                    { name: "content", label: "Konten", type: "file", accept: "image/*,video/*" }
                                ]),
                            ]}
                        />
                    </div>
                </div>
            )}

            {user?.role === "admin" && (
                <div className="w-full flex justify-center items-center mt-12">
                    <Button
                        onClick={handleToggleForm}
                        className="py-2 px-6 flex gap-2 items-center rounded-lg text-sm bg-green-600 text-white hover:bg-green-700 transition duration-300"
                    >
                        Tambah Modul
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ModuleWithImage;
