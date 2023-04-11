import React,{useContext} from 'react'

import Logo from "../images/logo.webp";

import{Link} from 'react-router-dom';

import { AuthContext } from '../context/authContext';


const Navbar = () => {

    const {currentUser,logout} = useContext(AuthContext)


      return (
    <div className='navbar'>
        <div className="container">
            <div className="logo">
                <Link  to= "/">
                <img src={Logo} alt="" /></Link>
               
            </div>
            <div className="link">
                <Link className='link' to="./?cat=art">
                    <h6>ART</h6>
                </Link>
                <Link className='link' to="./?cat=linux">
                    <h6>LINUX</h6>
                </Link>
                <Link className='link' to="./?cat=ubantu">
                    <h6>UBANTU</h6>
                </Link>
                <Link className='link' to="./?cat=window">
                    <h6>WINDOW</h6>
                </Link>
                <Link className='link' to="./?cat=ios">
                    <h6>IOS</h6>
                </Link>
                <Link className='link' to="./?cat=technology">
                    <h6>TECHNOLOGY</h6>
                </Link>
                

                <span >{currentUser?.username}</span>
                {currentUser ? (
                 <span onClick={logout}>Logout</span>
                ) : (
                 <Link className='link' to="/login">
                    Login
                    </Link>
                )}
                <span className='write'>
                    <Link className='link' to="write">Write</Link>
                </span>
            </div>
        </div>
    </div>
  )
}

export default Navbar