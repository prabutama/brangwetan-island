import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function AddForm({ title = "Collaborator" }) {
    const [formData, setFormData] = useState({
        name: "",
        website_url: "",
        image: null,
    });

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "image" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append("name", formData.name);
        data.append("website_url", formData.web_url);
        if (formData.image) data.append("image", formData.image);

        try {
            const response = await axios.post(
                "http://localhost:3000/api/collaborator",
                data
            );
            alert(response.data.message);
        } catch (error) {
            console.error("Error:", error.response?.data || error.message || error);
            alert("Error occurred, check the server logs");
        }
    };

    return (
        <Card className="max-w-md mx-auto shadow-none border-none">
            <CardHeader className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Tambah {title}
                </h2>
                <p className="text-sm text-gray-600">
                    Pastikan data yang Anda masukkan sudah benar.
                </p>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 p-4">
                    <div>
                        <Label htmlFor="name">Nama {title}</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder={`Masukkan Nama ${title}`}
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="web_url">Alamat Website {title}</Label>
                        <Input
                            id="website_url"
                            name="website_url"
                            placeholder="Masukkan alamat website jika tersedia"
                            value={formData.web_url}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="image">Logo {title}</Label>
                        <Input
                            id="image"
                            name="image"
                            type="file"
                            accept="image/*"
                            onChange={handleInputChange}
                        />
                    </div>
                </CardContent>
                <CardFooter className="p-4">
                    <Button type="submit" className="w-full">
                        Submit
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
