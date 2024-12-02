import React, { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export function AddForm({ title = "Form", api, fields = [] }) {
    const initialData = fields.reduce((acc, field) => {
        acc[field.name] = field.type === "file" ? null : "";
        return acc;
    }, {});

    const [formData, setFormData] = useState(initialData);
    const [alert, setAlert] = useState({ message: "", variant: "" });
    const token = localStorage.getItem("token");

    const handleInputChange = (e) => {
        const { name, value, files, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "file" ? files[0] : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        for (const field of fields) {
            if (field.required && !formData[field.name]) {
                setAlert({
                    message: `${field.label} wajib diisi.`,
                    variant: "error",
                });
                return;
            }
        }

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            if (formData[key]) {
                data.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post(api, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setAlert({
                message: `${title} berhasil ditambahkan!`,
                variant: "success",
            });
            setFormData(initialData);
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Terjadi kesalahan.";
            setAlert({
                message: errorMessage,
                variant: "error",
            });
        } finally {
            setTimeout(() => {
                setAlert({ message: "", variant: "" });
            }, 3000);
        }
    };

    return (
        <Card className="max-w-md mx-auto shadow-none border-none">
            {alert.message && (
                <Alert className={`mt-7 p-4 rounded-md ${alert.variant === "success"
                    ? "bg-green-100 border-green-300 text-green-700"
                    : "bg-red-100 border-red-300 text-red-700"
                    }`}>
                    <AlertTitle>{alert.variant === "success" ? "Berhasil" : "Gagal"}</AlertTitle>
                    <AlertDescription>{alert.message}</AlertDescription>
                </Alert>
            )}
            <CardHeader className="p-4">
                <h2 className="text-lg font-semibold text-hijau">Tambah {title}</h2>
                <p className="text-sm text-gray-600">
                    Pastikan data yang Anda masukkan sudah benar.
                </p>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4 p-4">
                    {fields.map((field, index) => (
                        <div key={index} className="flex flex-col space-y-1">
                            <Label htmlFor={field.name}>{field.label}</Label>
                            {field.type === "select" ? (
                                <select
                                    id={field.name}
                                    name={field.name}
                                    className="form-select w-full border rounded-md p-2"
                                    value={formData[field.name]}
                                    onChange={handleInputChange}
                                >
                                    <option value="">Pilih {field.label}</option>
                                    {field.options.map((option, idx) => (
                                        <option key={idx} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            ) : (
                                <Input
                                    id={field.name}
                                    name={field.name}
                                    placeholder={field.placeholder || `Masukkan ${field.label}`}
                                    type={field.type || "text"}
                                    accept={field.accept}
                                    value={field.type === "file" ? undefined : formData[field.name]}
                                    onChange={handleInputChange}
                                    className="border rounded-md p-2"
                                />
                            )}
                        </div>
                    ))}
                </CardContent>
                <CardFooter className="p-4">
                    <Button
                        type="submit"
                        className="w-full bg-hijau hover:bg-green-500 hover:text-white"
                    >
                        Submit
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
