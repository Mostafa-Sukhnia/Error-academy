import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from '../store/Slices/authSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const image = "https://cdn-icons-png.freepik.com/512/711/711769.png";
  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      dispatch(signup({ fname, lname, email, password,image }));
      localStorage.setItem('yourEmail', JSON.stringify({ email, password }));
        navigate('/');
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="bg-[#9E5CF2] min-h-screen flex justify-center items-center flex-col">
      <div className="container flex justify-center">
        <div className="min-w-[350px] shadow-lg bg-white rounded-md p-8 pb-4">
          <div className="text-center mb-8">
            <div>
              <p className='text-2xl '>Welcome To</p>
              <p className='text-[#a855f7] text-2xl font-bold my-4'>Technology School</p>
            </div>
            <p className="text-gray-500">Sign up to create an account</p>
          </div>
          <form className="flex flex-col gap-4" onSubmit={submitHandler}>
            <div className="relative">
              <input
                type="text"
                placeholder="First name"
                className="w-full pl-[40px] py-3 border bg-[#fafafa] border-gray-300 rounded-md"
                onChange={(e) => setFname(e.target.value)}
              />
              <i className="fa-solid fa-user-tie"
                style={{
                  color: '#bdbdbd',
                  position: 'absolute',
                  fontSize: '20px',
                  top: '16px',
                  left: '13px',
                }}
              ></i>
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Last name"
                className="pl-[40px] w-full p-3 border bg-[#fafafa] border-gray-300 rounded-md"
                onChange={(e) => setLname(e.target.value)}
              />
              <i className="fa-solid fa-user-tie"
                style={{
                  color: '#bdbdbd',
                  position: 'absolute',
                  fontSize: '20px',
                  top: '16px',
                  left: '13px',
                }}
              ></i>
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="pl-[40px] w-full p-3 border bg-[#fafafa] border-gray-300 rounded-md"
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="fa-solid fa-envelope"
                style={{
                  color: '#bdbdbd',
                  position: 'absolute',
                  fontSize: '20px',
                  top: '16px',
                  left: '13px',
                }}
              ></i>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="w-full pl-[40px] p-3 border bg-[#fafafa] border-gray-300 rounded-md"
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="fa-solid fa-key"
                style={{
                  color: '#bdbdbd',
                  position: 'absolute',
                  fontSize: '20px',
                  top: '16px',
                  left: '13px',
                }}
              ></i>
              <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                style={{
                  position: 'absolute',
                  color: '#9E5CF2',
                  top: '16px',
                  right: '13px',
                  cursor: 'pointer',
                }}
                onClick={togglePasswordVisibility}
              ></i>
            </div>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm Password"
                className="w-full pl-[40px] p-3 border bg-[#fafafa] border-gray-300 rounded-md"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <i className="fa-solid fa-key"
                style={{
                  color: '#bdbdbd',
                  position: 'absolute',
                  fontSize: '20px',
                  top: '16px',
                  left: '13px',
                }}
              ></i>
              <i className={`fa-regular ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}
                style={{
                  position: 'absolute',
                  color: '#9E5CF2',
                  top: '16px',
                  right: '13px',
                  cursor: 'pointer',
                }}
                onClick={toggleConfirmPasswordVisibility}
              ></i>
            </div>
            <input
              type="submit"
              value="Sign Up"
              className="cursor-pointer w-full p-3 bg-[#9E5CF2] text-white font-bold rounded-md hover:bg-[#7d4bcc] transition"
            />
          </form>
          <div className='flex justify-between mt-2'>
            <p>Do you have an account?</p>
            <Link to="/login" className='text-[#9E5CF2]'>Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
