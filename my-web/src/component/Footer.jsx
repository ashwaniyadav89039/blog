import React from 'react'
import { Link } from 'react-router-dom';

import Logo from "../images/logo.webp";

const Footer = () => {
  return (
    <footer>
        <Link  to= "/">
                <img src={Logo} alt="" /></Link>

        <span>
            Maded By <b>Ashwani yadav</b>
        </span>
    </footer>
  )
}

export default Footer