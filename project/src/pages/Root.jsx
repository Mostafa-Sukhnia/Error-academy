import React,{useEffect} from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Footer from '../components/footer'
import Header from '../components/header'
import { loginuser } from "../store/Slices/authSlice";
const Root = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const yourEmail = JSON.parse(localStorage.getItem("yourEmail"));

    if (yourEmail) {
      dispatch(loginuser({ email: yourEmail.email, password:yourEmail.password }))
        .unwrap()
        .catch((error) => {
          console.error("Failed to log in:", error);
        });
    }
  }, [dispatch]);
  return (
    <>
    <Header/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Root