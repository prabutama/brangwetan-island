import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Trash, X } from "lucide-react";
import { Form } from "./Form";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

const Collaborators = () => {
    const [collaborators, setCollaborators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const user = useAuth().user;
    const token = localStorage.getItem("token");

    // Toggle form visibility
    const toggleFormVisibility = () => setShowForm((prev) => !prev);

    // Fetch collaborators from the API
    useEffect(() => {
        const fetchCollaborators = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/collaborator`);
                const { collaborators } = response.data;

                if (Array.isArray(collaborators)) {
                    setCollaborators(collaborators);
                } else {
                    setError("Invalid data format. Expected 'collaborators' array.");
                }
            } catch (err) {
                setError(`Error fetching data: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchCollaborators();
    }, [showForm]);

    // Delete a collaborator
    const handleDeleteCollaborator = async () => {
        if (!confirmDeleteId) return;

        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/collaborator/${confirmDeleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCollaborators((prev) => prev.filter((c) => c.id !== confirmDeleteId));
            setConfirmDeleteId(null);
        } catch (err) {
            console.error("Error deleting collaborator:", err);
            alert("Failed to delete collaborator.");
        }
    };

    // Render loading or error states
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="relative w-full py-10 bg-gradient-to-b from-green-50 to-white">
            {/* Header */}
            <motion.h1
                className="mb-2 lg:mb-6 text-3xl tracking-tight font-bold sm:text-5xl lg:text-6xl flex gap-3 justify-center"
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
                    Kolaborator
                </motion.span>
                <motion.span
                    className="block bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-yellow-400"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    Kami
                </motion.span>
            </motion.h1>
            <motion.p
                className="mb-3 lg:mb-6 text-[17px] text-slate-500 lg:text-xl text-center tracking-tight w-full lg:w-[50%] mx-auto px-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                Platform pembelajaran ini adalah hasil kolaborasi yang apik dari beberapa pihak yang berdedikasi dan berkomitmen untuk memberikan pengetahuan tentang Energi Baru Terbarukan
            </motion.p>

            {/* Collaborators Grid */}
            <div className="mt-5 grid grid-cols-3 gap-6 justify-center lg:border-2 lg:border-hijau rounded-full py-10 lg:w-[50%] mx-auto lg:shadow-md">
                {collaborators.map((collaborator) => (
                    <div
                        key={collaborator.id}
                        className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex justify-center items-center mx-auto"
                    >
                        {user?.role === "admin" && (
                            <Dialog>
                                <DialogTrigger>
                                    <Button
                                        onClick={() => setConfirmDeleteId(collaborator.id)}
                                        className="absolute z-30 -top-2 -right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                    >
                                        <Trash className="w-4 h-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="w-[90%] rounded-md">
                                    <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
                                    <DialogDescription>
                                        Apakah Anda yakin ingin menghapus kolaborator ini?
                                    </DialogDescription>
                                    <DialogFooter>
                                        <DialogClose>
                                            <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>
                                                Batal
                                            </Button>
                                        </DialogClose>
                                        <Button className="bg-red-500" onClick={handleDeleteCollaborator}>
                                            Hapus
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}

                        <a
                            href={`https://${collaborator.website_link}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transform transition-all duration-300 flex justify-center items-center z-10"
                        >
                            <img
                                className="w-full h-full object-contain rounded-full transition-all duration-300 hover:grayscale-0"
                                src={`${import.meta.env.VITE_API_BASE_URL}${collaborator.image}`}
                                alt={collaborator.name}
                            />
                        </a>
                    </div>
                ))}
            </div>

            {/* Form Modal */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="p-4 bg-white w-[85%] md:max-w-md rounded-lg shadow-lg relative">
                        <X
                            onClick={toggleFormVisibility}
                            className="h-6 w-6 text-black absolute right-4 top-4 cursor-pointer"
                        />
                        <Form
                            title="Collaborator"
                            api={`${import.meta.env.VITE_API_BASE_URL}/api/collaborator`}
                            fields={[
                                {
                                    name: "name",
                                    label: "Nama Collaborator",
                                    placeholder: "Masukkan Nama Collaborator",
                                },
                                {
                                    name: "website_",
                                    label: "Alamat Website Collaborator",
                                    placeholder: "Masukkan alamat website jika tersedia",
                                },
                                {
                                    name: "image",
                                    label: "Logo Collaborator",
                                    type: "file",
                                    accept: "image/*",
                                },
                            ]}
                        />
                    </div>
                </div>
            )}

            {/* Add Collaborator Button */}
            {user && (
                <div className="w-full flex justify-center items-center py-6">
                    <Button
                        onClick={toggleFormVisibility}
                        variant="outline"
                        className="py-2 px-6 flex gap-2 items-center rounded-lg text-sm bg-hijau text-white hover:bg-green-500 transition duration-300 hover:text-white"
                    >
                        Tambah Collaborators
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Collaborators;
