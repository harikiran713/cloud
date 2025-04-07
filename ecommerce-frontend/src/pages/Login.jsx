import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  const { token, setToken, backendUrl, navigate } = useContext(ShopContext);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message || "Sign Up failed");
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message || "Login failed");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const response = await axios.post(`${backendUrl}/api/user/google-login`, {
        name: user.displayName,
        email: user.email,
      });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      } else {
        toast.error(response.data.message || "Google login failed");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error(error.message || "Google Sign-In Failed");
    }
  };

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token, navigate]);

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 bg-white p-8 rounded-xl shadow-lg"
    >
      <div className="inline-flex items-center gap-2 mb-4">
        <p className="text-3xl font-semibold text-indigo-600">{currentState}</p>
        <hr className="border-none h-[2px] w-8 bg-indigo-600" />
      </div>

      {currentState === "Sign Up" && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Name"
          required
        />
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Email"
        required
      />

      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm text-gray-500">
        <p className="cursor-pointer hover:text-indigo-600">Forgot your Password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => setCurrentState("Sign Up")}
            className="cursor-pointer hover:text-indigo-600"
          >
            Create account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("Login")}
            className="cursor-pointer hover:text-indigo-600"
          >
            Login Here
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-2 mt-4 rounded-lg transition-colors"
      >
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>

      {/* Google Sign In Button */}
      <div
        onClick={handleGoogleLogin}
        className="cursor-pointer mt-3 bg-red-500 hover:bg-red-600 text-white font-medium px-8 py-2 rounded-lg transition-colors"
      >
        Sign In with Google
      </div>
    </form>
  );
};

export default Login;
