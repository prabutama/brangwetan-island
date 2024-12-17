import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Trash, X } from "lucide-react";
import { Form } from "./Form";
import { useAuth } from "@/context/AuthContext";
import { motion } from 'framer-motion'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

export const Collaborators = () => {
    const [collaborators, setCollaborators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState(null);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);  // Add state for dialog visibility
    const user = useAuth().user;
    const token = localStorage.getItem("token");

    const handleToggleForm = () => {
        setShowForm((prevShowForm) => !prevShowForm);
    };

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/collaborator")
            .then((response) => {
                if (Array.isArray(response.data.collaborators)) {
                    setCollaborators(response.data.collaborators);
                } else {
                    setError("Invalid data format. Expected 'collaborators' array.");
                }
                setLoading(false);
            })
            .catch((err) => {
                setError("Error fetching data: " + err.message);
                setLoading(false);
            });
    }, [showForm]);

    const deleteCollaborator = async () => {
        if (confirmDeleteId === null) return;

        try {
            await axios.delete(`http://localhost:3000/api/collaborator/${confirmDeleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setCollaborators((prev) => prev.filter((collaborator) => collaborator.id !== confirmDeleteId));
            setConfirmDeleteId(null);
            setIsDialogOpen(false); // Close dialog after deletion
        } catch (err) {
            console.error("Error deleting collaborator:", err);
            alert("Failed to delete collaborator");
        }
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setConfirmDeleteId(null);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="relative w-full h-auto py-10 bg-gradient-to-b from-green-50 to-white">
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
            <div className="mt-5 grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 gap-6 justify-center lg:border-2 lg:border-hijau rounded-full py-10 lg:w-[50%] mx-auto lg:shadow-md">
                {Array.isArray(collaborators) && collaborators.map((collaborator) => (
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex justify-center items-center mx-auto">
                        {
                            user && user.role === "admin" ? (
                                <Dialog>
                                    <DialogTrigger>
                                        <Button
                                            onClick={() => {
                                                setConfirmDeleteId(collaborator.id);
                                                setIsDialogOpen(true); // Open dialog on delete button click
                                            }}
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
                                                <Button variant="outline" onClick={handleCloseDialog}>
                                                    Batal
                                                </Button>
                                            </DialogClose>
                                            <Button className="bg-red-500" onClick={deleteCollaborator}>
                                                Hapus
                                            </Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            ) : (
                                ""
                            )
                        }

                        <a
                            href={`https://${collaborator.website_link}`}
                            key={collaborator.id}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transform transition-all duration-300 flex justify-center items-center z-10"
                        >
                            <img
                                className="w-full h-full object-contain rounded-full transition-all duration-300 hover:grayscale-0"
                                src={`http://localhost:3000${collaborator.image}`}
                                alt={collaborator.name}
                            />
                        </a>
                    </div>
                ))}
            </div>

            {/* Form Pop-up Modal */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${showForm ? "z-50" : "hidden"}`}
            >
                <div className="p-4 bg-white w-[85%] md:max-w-md rounded-lg shadow-lg relative transition-transform transform scale-110">
                    <X
                        onClick={handleToggleForm}
                        className="h-6 w-6 text-black absolute right-4 top-4 cursor-pointer"
                    />
                    <Form
                        title="Collaborator"
                        api="http://localhost:3000/api/collaborator"
                        fields={[
                            {
                                name: "name",
                                label: "Nama Collaborator",
                                placeholder: "Masukkan Nama Collaborator",
                            },
                            {
                                name: "website_link",
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

            {/* Add Collaborator Button */}
            {
                user ? (
                    <div className="w-full flex justify-center items-center py-6">
                        <Button
                            onClick={handleToggleForm}
                            variant="outline"
                            className="py-2 px-6 flex gap-2 items-center rounded-lg text-sm bg-hijau text-white hover:text-white hover:bg-green-500 transition duration-300"
                        >
                            <span>Tambah Collaborators</span>
                        </Button>
                    </div>
                ) : ""
            }
        </div >
    );
};

export default Collaborators;
