import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { Trash, X } from "lucide-react";
import { Form } from "./Form";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";

export function Gallery() {
    const [photos, setPhotos] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const user = useAuth().user;
    const token = localStorage.getItem("token");

    const handleToggleForm = () => {
        setShowForm((prev) => !prev);
        setConfirmDeleteId(null);
    };

    // Fetch photos data from the API
    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/photo`);
                setPhotos(response.data.photos);
            } catch (error) {
                console.error("Error fetching photos:", error);
            }
        };

        fetchPhotos();
    }, [showForm]);

    // Determine number of items per slide based on screen width
    const itemsPerSlide = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 768 ? 2 : 1;

    // Create slides by splitting photos into groups
    const slides = [];
    for (let i = 0; i < photos.length; i += itemsPerSlide) {
        slides.push(photos.slice(i, i + itemsPerSlide));
    }

    // Navigate to the next slide
    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    };

    // Navigate to the previous slide
    const goToPrev = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + slides.length) % slides.length);
    };

    // Auto-scroll with interval
    useEffect(() => {
        const intervalId = setInterval(goToNext, 5000); // 5 seconds per slide

        return () => clearInterval(intervalId); // Clear interval when component unmounts
    }, [slides.length]);

    // Delete photo
    const handleDeletePhoto = async (photoId) => {
        try {
            await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/photo/${photoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            // Remove photo from state
            setPhotos((prevPhotos) => prevPhotos.filter((photo) => photo.id !== photoId));
            setConfirmDeleteId(null); // Reset delete confirmation state
        } catch (error) {
            console.error("Error deleting photo:", error);
        }
    };

    return (
        <>
            <div className="relative w-full max-w-8xl mx-auto p-4 lg:px-20">
                {/* Container for the slides */}
                <div className="relative overflow-hidden rounded-lg shadow-lg">
                    {/* Wrapper for the sliding effect */}
                    <div
                        className="flex transition-transform duration-700 ease-in-out"
                        style={{
                            transform: `translateX(-${currentIndex * (100 / slides.length)}%)`,
                            width: `${slides.length * 100}%`,
                        }}
                    >
                        {slides.map((slide, slideIndex) => (
                            <div
                                key={slideIndex}
                                className="flex"
                                style={{
                                    width: `${100 / slides.length}%`,
                                }}
                            >
                                {slide.map((item, index) => (
                                    <div
                                        key={index}
                                        className="w-full flex-shrink-0 p-2"
                                        style={{
                                            flex: `0 0 calc(100% / ${itemsPerSlide})`,
                                        }}
                                    >
                                        <div className="relative group">
                                            <img
                                                src={`${import.meta.env.VITE_API_BASE_URL}${item.photo_url}`}
                                                alt={`Gallery Image ${slideIndex}-${index}`}
                                                className="w-full h-[300px] lg:h-[400px] object-cover rounded-lg transition-transform duration-300 "
                                            />
                                            {user && user.role === "admin" && (
                                                <button
                                                    onClick={() => setConfirmDeleteId(item.id)}
                                                    className="absolute top-2 right-2 bg-red-600 text-white p-2 rounded-full transition-colors duration-200 hover:bg-red-700"
                                                >
                                                    <Trash className="w-5 h-5" />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    {/* Navigation buttons */}
                    <button
                        onClick={goToPrev}
                        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full shadow-lg focus:outline-none"
                    >
                        &#8592;
                    </button>
                    <button
                        onClick={goToNext}
                        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full shadow-lg focus:outline-none"
                    >
                        &#8594;
                    </button>
                </div>

                {/* Indicators */}
                <div className="flex justify-center mt-4">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`h-2 w-2 mx-1 rounded-full ${currentIndex === index ? "bg-gray-800" : "bg-gray-400"}`}
                        ></span>
                    ))}
                </div>
            </div>

            {/* Delete confirmation dialog */}
            {confirmDeleteId && (
                <Dialog open={confirmDeleteId !== null} onOpenChange={() => setConfirmDeleteId(null)}>
                    <DialogContent>
                        <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
                        <DialogDescription>Apakah Anda yakin ingin menghapus foto ini?</DialogDescription>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" onClick={() => setConfirmDeleteId(null)}>
                                    Batal
                                </Button>
                            </DialogClose>
                            <Button
                                onClick={() => handleDeletePhoto(confirmDeleteId)}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                Hapus
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}

            {/* Form for adding new photo */}
            {showForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="p-4 bg-white w-[85%] md:max-w-md rounded-lg shadow-lg relative">
                        <X
                            onClick={handleToggleForm}
                            className="h-6 w-6 text-black absolute right-4 top-4 cursor-pointer"
                        />
                        <Form
                            title="Foto"
                            api={`${import.meta.env.VITE_API_BASE_URL}/api/photo`}
                            method="POST"
                            handleToggleForm={handleToggleForm}
                            fields={[{ type: "file", name: "photo", label: "Foto" }]}
                        />
                    </div>
                </div>
            )}

            {/* Button to open the photo upload form (for admin) */}
            {user && user.role === "admin" && (
                <div className="w-full flex justify-center items-center mt-4 mb-20">
                    <Button
                        onClick={handleToggleForm}
                        className="py-2 px-6 flex gap-2 items-center rounded-lg text-sm bg-green-600 text-white hover:bg-green-700 transition duration-300"
                    >
                        Tambah Foto
                    </Button>
                </div>
            )}
        </>
    );
}
