import React from 'react'
import styled from "styled-components";

export const Loader = () => {
  return (
    <DIV>
      <div className="ring"></div>
      <div className="ring"></div>
      <div className="ring"></div>
      <span className='loading'>wait for feedback...</span>
    </DIV>
  )
}

const DIV = styled.div`
position: relative;
display: flex;
justify-content: center;
align-items: center;

.ring{
  width: 200px;
  height: 200px;
  border: solid white 0px;
  border-radius: 50%;
  position: absolute;
}

.ring:nth-child(1){
  border-bottom-width: 8px;
  /* border-color: #dc0afc; */
  border-color: black;
  animation: rotate1 2s linear infinite;
}

.ring:nth-child(2){
  border-right-width: 8px;
  /* border-color: #0afcd8; */
  border-color: black;
  animation: rotate2 2s linear infinite;
}

.ring:nth-child(3){
  border-top-width: 8px;
  /* border-color: #b7fc0a; */
  border-color: black;
  animation: rotate3 2s linear infinite;
}

.loading{
  color: black;
  font-size: 10px;
}

@keyframes rotate1{
  0%{
    transform : rotateX(35deg) rotateY(-45deg) rotateZ(0deg);
  }
  100%{
    transform : rotateX(35deg) rotateY(-45deg) rotateZ(360deg);
  }
}

@keyframes rotate2{
  0%{
    transform : rotateX(50deg) rotateY(10deg) rotateZ(0deg);
  }
  100%{
    transform : rotateX(50deg) rotateY(10deg) rotateZ(360deg);
  }
}

@keyframes rotate3{
  0%{
    transform : rotateX(35deg) rotateY(55deg) rotateZ(0deg);
  }
  100%{
    transform : rotateX(35deg) rotateY(55deg) rotateZ(360deg);
  }
}

`;