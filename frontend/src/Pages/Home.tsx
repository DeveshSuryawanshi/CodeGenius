import React from 'react';
import styled from 'styled-components';
// import aiImage from "../assets/intervuew2.jpg";
import aiImage from "../assets/pngwing2.png";
import {Link} from "react-router-dom";


export const Home = () => {
  return (
    <>
    <DIV>
      <div className="text">
        <h1>Have your <br />best <strong>Mock</strong> <br /> interview session</h1>
        <p>Ace Your Interviews with AI-Powered Practice Sessions.</p>
        <Link to={"/interviews"}>
           <button>Try it Free</button>
        </Link>
      </div>
      <div className="image-container">
        <img src={aiImage} alt="" className="image" />
      </div>
     
    </DIV>
     </>
  );
};

const DIV = styled.div`
  width: 100%;
  height: 400px;
  background-color: #0a2640;
  display: flex;
  margin-top: 0px;
  padding-top: 130px;
  padding-bottom: 130px;
  color: white;
  justify-content: space-evenly;

h1{
  font-size:47px;
}
  .text {
    margin-top:2px;
    text-align: left;
  }

  .image-container {
    border-radius: 10%;
    overflow: hidden;
    
  }

  .image {
    /* width: 100%; */
    width: 400px;
    height: auto;
   
  }
  
  button {
    width: 50%;
    margin-top:30px;
    background-color: #5cdb94;
    font-size: 25px;
    padding: 16px;
    border-radius: 20px;
    border: none;
  }

  button:hover {
    background-color: white;
    color: black;
    cursor: pointer;
  }
  @media (max-width: 768px) {
    padding-top: 40px;
    padding-bottom: 60px;
    width:100%;
    display: flex;
    flex-direction:column;
    padding-left:20px;
    padding-right:20px;
    
    button {
      width: 50%;
      font-size: 20px;
      padding: 12px;
      margin:20px;
    }
    .text {
      margin-top:5px;
     
    }
  }
`;
