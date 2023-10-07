import React from 'react'
import {Link} from "react-router-dom";
import styled from "styled-components";

export const NavBar = () => {
  return (
    <DIV>
        <div>Logo</div>
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
display: flex;
justify-content: space-between;
padding: 20px 30px;

.link{
  margin: 0px 20px;
}
`;
