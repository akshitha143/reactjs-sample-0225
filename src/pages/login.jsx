import logo from "../assets/images/logo.png";
import { Eye, EyeOff } from "lucide-react";
import { useTogglePassword } from "../hooks/useTogglePassword";
import AuthLayout from "../components/layouts/authlayout";
import { loginUser } from "../services/user";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/ui/spinner";

const Login = () => {
    const navigate = useNavigate();
    const { showPassword, toggle } = useTogglePassword();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

  const handelSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    await loginUser( email, password );
    console.log("Logging in with:", { email, password });
    setEmail("");
    setPassword("");
    alert("User logged in successfully!");
    navigate("/");
    } catch (error) {
      console.error("Login failed:", error.message);
    }
    finally {
      setLoading(false);
    }

  }
  return (
    <AuthLayout>
        <>
        <h2 className="text-5xl font-bold text-center mb-8">Log in!</h2>
        <form className="bg-transparent">
          <div className="mb-4">
            <label className="block text-sm mb-1" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="abcd@gmail.com"
              className="w-full px-4 py-2 border border-white bg-transparent rounded focus:outline-none"
            />
          </div>

          <div className="mb-4 relative">
            <label className="block text-sm mb-1" htmlFor="password">
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
              className="absolute top-8 right-3 text-white focus:outline-none hover:cursor-pointer"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center justify-between mb-6 text-sm">
            <label className="flex items-center space-x-2">
              <input type="checkbox" className="form-checkbox text-white hover:cursor-pointer" />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:cursor-pointer">
              Forgot Password?
            </a>
          </div>

          <div className="w-full flex justify-center">
            <button
            onClick={handelSubmit}
            type="submit"
            className={`w-auto px-12 py-2 text-lg bg-white text-[#1A4A8C] font-semibold rounded hover:bg-gray-100 hover:cursor-pointer ${loading ? "cursor-not-allowed bg-white/60" : ""}`}
          >
            
              {loading ? 
              <div className="flex items-center justify-center">
                <div className="w-8 h-8">
                        <Spinner/>
                  </div>
                <span className="ml-2 text-[#1A4A8C]">Logging in...</span>
              </div>

              : "Log in"}

          </button>
          </div>
        </form>
        </>
    </AuthLayout>
  );
};

export default Login;
