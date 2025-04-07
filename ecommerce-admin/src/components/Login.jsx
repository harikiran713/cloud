import { useState } from "react";
import axios from 'axios';
import { toast } from "react-toastify";
import { backendUrl } from "../App";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });

      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl px-8 py-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-indigo-600 mb-6 text-center">Admin Panel</h1>
        <form onSubmit={onSubmitHandler} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">Email Address</label>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" 
              type="email" 
              placeholder="your@email.com" 
              required 
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-600 block mb-2">Password</label>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400" 
              type="password" 
              placeholder="Enter your password" 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="w-full py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
