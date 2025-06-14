import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Helmet } from "react-helmet";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { useAuth } from "../context/AuthContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const { login, googleLogin } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await login(email, password);
            navigate("/");
            Swal.fire({
                title: "Login Successful!",
                icon: "success",
                draggable: true
            });
        } catch (error) {
            console.error("Login error:", error);
            setError("Invalid email or password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        setError("");

        try {
            await googleLogin();
            navigate("/");
            Swal.fire({
                title: "Login Successful!",
                icon: "success",
                draggable: true
            });
        } catch (error) {
            console.error("Google login error:", error);
            setError("Google login failed. Please try again.");
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>

            <div className="min-h-screen flex items-center justify-center  py-12 px-4">
                <div className="w-full max-w-md bg-base-100  border border-neutral/20 rounded-xl p-8
        shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-content   cursor-pointer
                ">
                    <h2 className="text-3xl font-bold text-center mb-6 text-base-content">Login Please</h2>

                    {error && (
                        <div className="alert alert-error mb-4">
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="label" htmlFor="email">
                                <span className="label-text">Email Address</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="label" htmlFor="password">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="input input-bordered w-full pr-10"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="checkbox checkbox-sm" />
                                <span>Remember me</span>
                            </label>

                            <Link
                                to="/forgot-password"
                                state={{ email }}
                                className="link link-hover text-sm text-primary"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>

                    <div className="divider my-6">OR</div>

                    <button
                        onClick={handleGoogleLogin}
                        className="btn btn-outline w-full gap-2"
                        disabled={loading}
                    >
                        <img
                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                            alt="Google"
                            className="w-5 h-5"
                        />
                        Continue with Google
                    </button>

                    <p className="mt-6 text-center text-sm">
                        Don't have an account?{" "}
                        <Link to="/register" className="link link-neutral font-bold">
                            Register now
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default Login;
