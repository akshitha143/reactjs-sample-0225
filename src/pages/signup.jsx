import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useTogglePassword } from "../hooks/useTogglePassword";
import AuthLayout from "../components/layouts/authlayout";
import { addUser } from "../services/user";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const { showPassword, toggle } = useTogglePassword();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
const handelSubmit = async (e) => {
    try {
    setLoading(true);
      e.preventDefault();
    if (!username || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    if (!termsAccepted) {
      alert("Please accept the terms and conditions");
      return;
    }
    await addUser({ name: username, email, password });
    setUsername("");
    setEmail("");
    setPassword("");
    setTermsAccepted(false);
    alert("User registered successfully!");
    navigate("/");
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert("An error occurred while signing up. Please try again.");
    }
    finally {
      setLoading(false);
    }
    
  }
  return (
    

    <AuthLayout>
        <>
            <h2 className="text-5xl font-bold text-center mb-8">Sign up</h2>
            <form className="bg-transparent">
            <div className="mb-4">
                <label htmlFor="username" className="block text-sm mb-1">
                Username
                </label>
                <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                placeholder="Enter Name"
                className="w-full px-4 py-2 border border-white bg-transparent rounded focus:outline-none"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="email" className="block text-sm mb-1">
                Email Address
                </label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                placeholder="abcd@gmail.com"
                className="w-full px-4 py-2 border border-white bg-transparent rounded focus:outline-none"
                />
            </div>

            <div className="mb-4 relative">
                <label htmlFor="password" className="block text-sm mb-1">
                Password
                </label>
                <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-4 py-2 border border-white bg-transparent rounded focus:outline-none pr-10"
                />
                <button
                type="button"
                onClick={toggle}
                className="absolute top-8 right-3 text-white focus:outline-none"
                >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

            <div className="flex items-center mb-6 text-sm">
                <input
                checked={termsAccepted}
                onChange={(e) => setTermsAccepted(e.target.checked)}
                type="checkbox"
                id="terms"
                className="form-checkbox mr-2"
                />
                <label htmlFor="terms">
                I accept the <a href="#" className="underline">terms & conditions</a>
                </label>
            </div>


            <div className="w-full flex justify-center">
            <button
            onClick={handelSubmit}
            type="submit"
            className={`w-auto px-12 py-2 text-lg bg-white text-[#1A4A8C] font-semibold rounded hover:bg-gray-100 hover:cursor-pointer ${loading ? "bg-white/60 cursor-not-allowed" : ""}`}
          >
            {loading ? 
              <div className="flex items-center justify-center">
                <div className="w-8 h-8">
                        <Spinner/>
                  </div>
                <span className="ml-2 text-[#1A4A8C]">Logging in...</span>
              </div>

              : "sign up"}
          </button>
          </div>
            </form>
        </>
    </AuthLayout>
      
  );
};

export default Signup;
