import React from 'react'
import {Link} from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/pngwing3.png"

export const NavBar = () => {
  return (
    <DIV>
        <div className='logo-container'>
        <Link className='link' to={"/"}>
          <img className='logo' src={Logo} alt="logo" />
        </Link>
          CodeGenius
        </div>
        <div className='links-container'>
          <Link className='link' to={"/"}>Home</Link>
          <Link className='link' to={"/interviews"}>Interviews</Link>
          <Link className='link' to={"/about"}>About</Link>
          <Link className='link' to={"/contact"}>Contact</Link>
        </div>
    </DIV>
  )
}

const DIV = styled.div`
width:100%;
height: 40px;
display: flex;
justify-content: space-between;
padding-top: 20px;
padding-bottom:20px;
 /* padding: 15px 20px; */

.link {
  margin: 0 20px;
  color: black;
  text-decoration: none;
  font-weight: bold;
}

.links-container{
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.logo{
  width: 40px;
}

.logo-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 50px;
  font-weight: 500;
}

background-color: #5cdb94;
@media (max-width: 768px) {
  display: flex;
justify-content: space-arround;
  wdith:100%;
   padding: 15px 20px;

}


`;
