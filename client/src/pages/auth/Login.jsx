import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Navbar from "@/components/Navbar";

export function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState({ message: "", variant: "" });
    const [loading, setLoading] = useState(false);
    const { login } = useAuth()

    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/api/login", { email, password });

            console.log("API Response:", response.data);

            if (!response.data.token || !response.data.user) {
                throw new Error("Invalid response from server");
            }

            const { token, user } = response.data;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            setAlert({
                message: "Login successful! Redirecting to dashboard...",
                variant: "success",
            });


            setTimeout(() => {
                window.location.href = "/";
            }, 2000);

        } catch (error) {
            console.error("Login Error:", error);
            setAlert({
                message: error.response?.data?.message || "Login failed. Please check your credentials.",
                variant: "error",
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <>
            <Navbar />
            <div className="flex items-center justify-center min-h-screen bg-gray-200">
                <Card className="w-full max-w-sm p-6 space-y-6 bg-white shadow-lg rounded-xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-hijau font-poppins">Login</h2>
                        <p className="mt-2 text-slate-600 font-poppins">Gunakan akun administrator untuk login dan kelola website dengan bijak</p>
                    </div>
                    {alert.message && (
                        <Alert
                            className={`mt-4 ${alert.variant === "success" ? "bg-green-200" : "bg-red-200"}`} 
                            variant={alert.variant === "success" ? "success" : "error"}
                        >
                            <AlertTitle>
                                {alert.variant === "success" ? "Success" : "Error"}
                            </AlertTitle>
                            <AlertDescription>{alert.message}</AlertDescription>
                        </Alert>
                    )}
                    <form onSubmit={handleLogin} className="space-y-4">
                        {/* Email Input */}
                        <div>
                            <Label htmlFor="email" className="text-sm font-medium font-poppins text-gray-700">
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="mt-2 p-2 border border-gray-300 rounded-md w-full font-poppins"
                            />
                        </div>

                        {/* Password Input */}
                        <div>
                            <Label htmlFor="password" className="text-sm font-medium text-gray-700 font-poppins">
                                Password
                            </Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="mt-2 p-2 border border-gray-300 rounded-md w-full font-poppins"
                            />
                        </div>

                        {/* Submit Button */}
                        <div>
                            <Button type="submit" className="w-full bg-hijau text-white hover:bg-green-600 font-poppins" disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </>
    );
}