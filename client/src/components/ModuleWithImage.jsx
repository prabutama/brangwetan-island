import { useEffect, useState } from "react";
import axios from "axios";
import { Trash, X } from "lucide-react";
import { AddForm } from "./AddForm";
import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

function ModuleWithImage() {
    const [modules, setModules] = useState([]);
    const [error, setError] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [alert, setAlert] = useState({ message: "", variant: "" });
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false); 
    const user = useAuth().user;
    const token = localStorage.getItem("token");

    const handleToggleForm = () => {
        setShowForm((prevShowForm) => !prevShowForm); // Toggle the modal visibility
    };

    const deleteModule = async () => {
        if (confirmDeleteId === null) return;

        console.log('Deleting module with ID:', confirmDeleteId); // Log the ID being deleted

        try {
            await axios.delete(`http://localhost:3000/api/module/${confirmDeleteId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setModules((prev) => prev.filter((module) => module.id !== confirmDeleteId));
            setConfirmDeleteId(null);  // Reset the confirmDeleteId after deletion
        } catch (err) {
            console.error("Error deleting module:", err);
        }
    };

    useEffect(() => {
        // Fetch data from the API using Axios
        const fetchModules = async () => {
            try {
                const response = await axios.get("http://localhost:3000/api/module");
                const filteredModules = response.data.modules.filter(
                    (module) => module.type === "image"
                );

                console.log(filteredModules); // For debugging
                setModules(filteredModules);
            } catch (err) {
                setError(err.response?.data?.message || err.message || "Failed to fetch modules");
            }
        };
        fetchModules();
    }, [showForm]);

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
        setConfirmDeleteId(null);
    };

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }


    return (
        <>
            <div className="w-full px-4 md:px-8 lg:px-16 py-12 bg-white">
                <div className="text-center mb-12">
                    <h2 className="text-2xl md:text-3xl font-bold text-hijau">Penerapan EBT</h2>
                    <p className="mt-4 text-center text-gray-500 text-sm md:text-base sm:w-3/4 mx-auto sm:px-10">
                        Energi Baru Terbarukan (EBT) adalah sumber energi yang berkelanjutan dan ramah lingkungan.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative">
                    {modules.map((module) => (
                        <div key={module.id} className="bg-white rounded-xl shadow-lg p-6 relative">
                            {
                                user && user.role === "admin" ? (
                                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <DialogTrigger>
                                            <Button
                                                onClick={() => {
                                                    setConfirmDeleteId(module.id);
                                                    setIsDialogOpen(true); // Open dialog on delete button click
                                                }}
                                                className="absolute z-30 -top-2 -right-2 bg-black text-white p-2 rounded-full hover:bg-red-600"
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
                                                <Button variant="outline" onClick={handleCloseDialog}>
                                                    Batal
                                                </Button>
                                                <Button className="bg-black" onClick={deleteModule}>
                                                    Hapus
                                                </Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                ) : (
                                    ""
                                )
                            }
                            <h3 className="text-lg font-semibold text-gray-800">{module.title}</h3>
                            <p className="mt-2 text-gray-500 text-sm">{module.description}</p>
                            <div className="rounded-lg mt-6 w-full aspect-square overflow-hidden">
                                <img
                                    src={`http://localhost:3000${module.content}`}
                                    alt={module.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Form Pop-up Modal */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${showForm ? "z-50" : "hidden"}`}
            >
                <div className="p-4 bg-white w-[85%] md:max-w-md rounded-lg shadow-lg relative transition-transform transform scale-110">
                    <X
                        onClick={handleToggleForm} // Close modal when X is clicked
                        className="h-6 w-6 text-black absolute right-4 top-4 cursor-pointer"
                    />
                    <AddForm
                        title="Modul"
                        api="http://localhost:3000/api/module"
                        fields={[
                            { name: "title", label: "Judul", placeholder: "Masukkan Judul Modul" },
                            { name: "description", label: "Deskripsi", placeholder: "Masukkan deskripsi" },
                            {
                                name: "type",
                                label: "Tipe",
                                type: "select",
                                options: [
                                    { value: "image", label: "Gambar" },
                                    { value: "video", label: "Video" },
                                ],
                            },
                            { name: "content", label: "Konten", type: "file", accept: "image/*,video/*" },
                        ]}
                    />
                </div>
            </div>

            {user && user.role === "admin" && (
                <div className="w-full flex justify-center items-center -pt-2 pb-10">
                    <Button
                        onClick={handleToggleForm} // Open the modal
                        variant="outline"
                        className="py-2 px-6 flex gap-2 items-center rounded-lg text-sm bg-hijau text-white hover:text-white hover:bg-green-500 transition duration-300"
                    >
                        <span>Tambah Modul</span>
                    </Button>
                </div>
            )}
        </>
    );
}

export default ModuleWithImage;
