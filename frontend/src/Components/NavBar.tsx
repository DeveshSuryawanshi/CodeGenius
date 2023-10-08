import React from 'react'
import {Link} from "react-router-dom";
import styled from "styled-components";

export const NavBar = () => {
  return (
    <DIV>
        <div>
          <img src="" alt="logo" />
        </div>
        <div>
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
display: flex;
justify-content: space-between;
padding-top: 20px;
padding-bottom:20px;
// padding: 15px 20px;

.link {
  margin: 0 20px;
  color: black;
  text-decoration: none;
  font-weight: bold;
}

background-color: #5cdb94;
@media (max-width: 768px) {
  display: flex;
justify-content: space-arround;
  wdith:100%;
   padding: 15px 20px;

}


`;
