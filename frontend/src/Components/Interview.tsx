import React from "react";
import { useState } from "react";
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import styled from "styled-components";
import Webcam from "react-webcam";
import {MdCopyAll} from "react-icons/md";

export const Interview = () => {

  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();
  const [text, setText] = useState("");
  const [isCopied, setCopied] = useClipboard(text);

  const start = () => {
    SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
  };
  const stop = () => {
    SpeechRecognition.stopListening();
  };

  const handleClear = () => {
    resetTranscript();
  };

  const handleTurnoff = () => {
    SpeechRecognition.abortListening();
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <DIV>
      <div>
        <div className="question-and-cam-container">
          <div className="question-container">
            <h1>Question 01</h1>
            <p className="question">01. What is middleware?</p>
          </div>
          <div className="cam-container">
            <Webcam
              height="300px"
            />
          </div>
        </div>

        <div
          className="speech-text-container"
          onClick={() => setText(transcript)}
        >
          {transcript}
        </div>
        <div className="btn-contianer">
          <div>
            <button className="btn copy" onClick={setCopied}>
              {isCopied ? "Copied!" : "Copy"} <MdCopyAll className="copy-icon"/>
            </button>
          </div>
          <div>
            <button className="btn" onClick={start}>
              Start
            </button>
            <button className="btn stop" onClick={handleTurnoff}>
              Stop
            </button>
            <button className="btn" onClick={handleClear}>
              Clear
            </button>
          </div>
        </div>
      </div>
    </DIV>
  );
};

const DIV = styled.div`
  .speech-text-container {
    width: 90%;
    height: 250px;
    border: solid lightgray 1px;
    border-radius: 5px;
    margin: auto;
    margin-top: 10px;
    padding: 20px;
    text-align: start;
  }

  .question-and-cam-container {
    display: flex;
    width: 90%;
    margin: auto;
  }

  .question-container {
    width: 50%;
    height: 300px;
    text-align: left;
    padding: 20px;
  }

  .cam-container {
    width: 50%;
    height: 300px;
    display: flex;
    justify-content: right;
    padding-top: 30px;
  }

  .question {
    font-size: 18px;
    margin-left: 20px;
  }

  .btn-contianer{
    display: flex;
    justify-content: space-between;
    width: 94%;
    margin: auto;
  }

  .btn {
    padding: 10px 25px;
    border: solid lightgray 1px;
    margin: 10px 15px;
    border-radius: 5px;
    background-color: #5cdb94;
    background-color: #05396b;
    color: white;
    font-weight: 700;
  }

  .copy{
    background-color: #FF6969;
    font-weight: 900;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    display: flex;
    align-items: center;
  }

  .stop{
    background-color: #ff3d3d;
  }

  .copy-icon{
    font-size: 20px;
  }


`;
