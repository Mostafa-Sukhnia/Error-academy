import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { loginuser, getUsers } from '../store/Slices/authSlice';
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigator = useNavigate();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const dispatch = useDispatch();
    const loggedInUser = useSelector(state => state.authSlice.loggedInUser); 
    

    useEffect(() => {
        dispatch(getUsers()); 
    }, [dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(loginuser({ email, password }));
        localStorage.setItem('yourEmail', JSON.stringify({ email, password }));
    }

    const done = () => {
        if (loggedInUser) {
            return (
                <div className='tex-4xl bg-green-600 text-white '>
            <div className='container flex justify-between items-center '>
            <div className=' '>is done</div>
            <Link to="/" className='underline'>back to home</Link>
            </div>
            </div>
            )
        }else{
            return (<div className=' tex-4xl bg-red-600 text-white'>is rejectes</div>)
        }
    }
  
    useEffect(() => {
        const yourEmail = JSON.parse(localStorage.getItem("yourEmail"));
    
        if (yourEmail) {
          dispatch(loginuser({ email: yourEmail.email, password:yourEmail.password }))
            .unwrap()
            .catch((error) => {
              console.error("Failed to log in:", error);
            });
            navigator("/");
        }
      }, [dispatch,navigator]);

    return (
        <main className='bg-[#a855f7] min-h-screen flex flex-col'>
        
            <div className='container flex items-center justify-center min-h-screen'>
            
                
                <div className='bg-white p-4 rounded-lg flex-1 h-fit max-w-[350px] shadow-lg '>
                    <div>
                        <p className='text-2xl my-4'>Welcome Back</p>
                        <p className='text-[#a855f7] text-2xl font-bold'>To Technology School</p>
                    </div>
                    <form onSubmit={submitHandler}>
                        <div className='relative'>
                            <input 
                                type='text' 
                                placeholder='Email' 
                                className='bg-[#fafafa] pl-8 border p-2 rounded w-full my-6 focus:outline-none'
                                 
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <i className="fa-solid fa-envelope" style={{position:'absolute', left:10, top:"42%", color:"#bdbdbd"}}></i>
                        </div>
                        <div className='relative '>
                            <input 
                                type={show ? "text" : "password"} 
                                placeholder='Password' 
                                className='bg-[#fafafa] pl-8 pr-10 border p-2 rounded w-full focus:outline-none mb-4'
                                
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <i className="fa-solid fa-key" style={{position:'absolute', left:10, top:"13px", color:"#bdbdbd"}}></i>
                            {
                                show ? 
                                (<i className="fa-regular fa-eye-slash" style={{position:'absolute', right:13, top:13, color:'#9E5CF2', cursor:'pointer'}} onClick={() => setShow(false)}></i>) 
                                : 
                                (<i className="fa-regular fa-eye"  style={{position:'absolute', right:13, top:13, color:'#9E5CF2', cursor:'pointer'}} onClick={() => setShow(true)}></i>) 
                            }
                        </div>

                        <input 
                            type='submit' 
                            value='Login'
                            className="cursor-pointer w-full p-3 bg-[#9E5CF2] text-white font-bold rounded-md hover:bg-[#7d4bcc] transition"
                        />
                    </form>
                    <div className="mt-2 flex justify-between p-2 mp-2">
                        <p>Don`t have an account?</p>
                        <Link to="/signup" className="text-[#a855f7]">Sign up</Link>
                    </div>
                </div> 
            </div>
            <div>
            {
            done()
            }
            </div>
        </main>
    );
}

export default Login;
