import React, { useState, useContext, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Login = () => {
  const [currentState, setCurrentState] = useState('Login ');
  const { setToken, backendUrl, token } = useContext(ShopContext);
  const navigate = useNavigate(); // Initialize useNavigate

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    // 🚨 Validate Inputs
    if (!email || !password || (currentState === 'SignUp' && !name)) {
      toast.error("All fields are required!");
      return;
    }

    if (!backendUrl) {
      toast.error("Backend URL is missing!");
      return;
    }

    setLoading(true);

    try {
      let endpoint = currentState === 'SignUp' ? '/api/user/register' : '/api/user/login';
      let payload = currentState === 'SignUp' ? { name, email, password } : { email, password };

      const response = await axios.post(`${backendUrl}${endpoint}`, payload);

      if (response.data.success) {
        const token = response.data.token;
        if (token) {
          // Set the token in context and localStorage
          setToken(token);
          localStorage.setItem('token', token);
          toast.success(`${currentState} Successful! 🎉`);
          navigate('/'); // Redirect to home page
        } else {
          toast.error("Authentication failed. Please try again.");
        }
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Redirect to home if token exists
  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800"></hr>
      </div>

      {currentState !== 'Login' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
        />
      )}
      
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
      />
      
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
      />
      
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <a href="#" className="cursor-pointer text-blue-600">Forgot your password?</a>
        <p 
          onClick={() => setCurrentState(currentState === 'Login' ? 'SignUp' : 'Login')}
          className="cursor-pointer text-blue-600"
        >
          {currentState === 'Login' ? 'Create account' : 'Login Here'}
        </p>
      </div>

      <button 
        className="bg-black text-white font-light px-8 py-2 mt-4"
        disabled={loading}
      >
        {loading ? "Processing..." : (currentState === 'Login' ? 'Sign In' : 'Sign Up')}
      </button>
    </form>
  );
};

export default Login;
