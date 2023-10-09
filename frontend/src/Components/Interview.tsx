import React, { useEffect } from "react";
import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import styled from "styled-components";
import Webcam from "react-webcam";
import { MdCopyAll } from "react-icons/md";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
import { Loader } from "./Loader ";

type Array = {
  question: string;
  techStack: string;
};

export const Interview = () => {
  const { transcript, browserSupportsSpeechRecognition, resetTranscript } =
    useSpeechRecognition();
  const [text, setText] = useState("");
  const [isCopied, setCopied] = useClipboard(text);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showFeed, setShowFeed] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const techStack = searchParams.get("tectStack");
  const [questions, setQuestions] = useState<Array[]>([]);
  const [render, setRender] = useState<boolean>(false);
  const [feedBack, setFeedBack] = useState<string>("");

  const start = () => {
    alert("Interview Started");
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

  const handleNextQuestion = () => {
    setShowFeed(false);
    resetTranscript();
    setCurrentIndex((prev) => (prev === questions?.length - 1 ? 0 : prev + 1));
    // SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    window.speechSynthesis.cancel();
  };

  const handleprevious = () => {
    setShowFeed(false);
    // SpeechRecognition.startListening({ continuous: true, language: "en-IN" });
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    setRender(true);
    axios
      .get(`http://localhost:8080/questions/get?techStack=${techStack}`)
      .then((res) => {
        // console.log(res.data);
        setQuestions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = () => {
    setShowFeed(true);
    setIsLoading(true);
    SpeechRecognition.stopListening();

    let prompt = `Consider your self as a interviewer for full stack web developer. This is question :- ${questions[currentIndex].question} and this is my answer of this question :- ${transcript} give me feedback on this answer. The feedback should be evaluated using the following rubrics Feedback for Subject Matter Expertise and Communication skills should contain ratings on my interview responses from 0 - 10. Don't mention any where that you are an AI model just give feedback`;
    axios
      .get(`http://localhost:8081/bot/chat?prompt= ${prompt}`)
      .then((res) => {
        setFeedBack(res.data);
        setIsLoading(false);
        const value = new SpeechSynthesisUtterance(res.data);
        window.speechSynthesis.speak(value);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  return (
    <div>
      {render && (
        <DIV>
          {showFeed ? (
            <div className="feedback-container">
              <div className="feedback">
                <div>
                <div className="student-answer">
                  <h1 className="student-answer-heading">Your Answer</h1>
                  <p>{transcript}</p>
                </div>
                {/* <div className="gif">
                {
                  isLoading ? <Loader /> : <video> <source src={bot} type="video/mp4"/> </video> />
                }
                </div> */}
                </div>
                <div className="chat-feedback">
                  {isLoading === false && (
                    <p className="feedback-heading">Feedback</p>
                  )}
                  {isLoading ? (
                    <div className="loader">
                      <Loader />
                    </div>
                  ) : (
                    <p>{feedBack}</p>
                  )}
                </div>
              </div>
              {isLoading ? null : (
                <div className="next-prev-container">
                  <button
                    disabled={isLoading}
                    className="next-Question-btn"
                    onClick={handleprevious}
                  >
                    Previous Question
                  </button>
                  <button
                    className="next-Question-btn"
                    onClick={handleNextQuestion}
                    disabled={isLoading}
                  >
                    Next Question
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="question-and-cam-container">
                <div className="question-container">
                  <h1>Question {currentIndex + 1}</h1>
                  <p className="question">
                    {currentIndex + 1}.{" "}
                    {questions.length !== 0 && questions[currentIndex].question}
                  </p>
                  <p className="Caution">
                    Caution: We kindly request that you refrain from refreshing
                    or clicking on backward or forward button on the page. Doing
                    so may result in the loss of your current progress,
                    necessitating the need to restart the interview from the
                    beginning. Your cooperation in this matter is greatly
                    appreciated.
                  </p>
                </div>
                <div className="cam-container">
                  <Webcam height="260px" />
                </div>
              </div>

              <div
                className="speech-text-container"
                onClick={() => setText(transcript)}
              >
                {transcript ? (
                  transcript
                ) : (
                  <h2 className="your_answer">
                    Click on Start button and start speaking and submit your
                    answer after completing ....
                  </h2>
                )}
              </div>
              <div className="btn-contianer">
                <div>
                  <button className="btn copy" onClick={setCopied}>
                    {isCopied ? "Copied!" : "Copy"}{" "}
                    <MdCopyAll className="copy-icon" />
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
                  <button className="btn" onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          )}
        </DIV>
      )}
    </div>
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
    width: 93%;
    margin: auto;
    height: 295px;
  }

  .question-container {
    width: 50%;
    /* height: 300px; */
    /* border: solid lightgray 1px; */
    text-align: left;
    padding: 20px;
  }

  .cam-container {
    width: 50%;
    /* height: 300px; */
    /* border: solid lightgray 1px; */
    display: flex;
    justify-content: right;
    padding-top: 30px;
  }

  .question {
    font-size: 18px;
    margin-left: 20px;
  }

  .your_answer {
    margin-left: 20px;
  }

  .btn-contianer {
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
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    color: white;
    font-weight: 700;
  }

  .btn:hover {
    padding: 10px 25px;
    border: solid lightgray 1px;
    margin: 10px 15px;
    border-radius: 5px;
    background-color: #97afc6;
    color: white;
    font-weight: 700;
  }

  .copy {
    background-color: #5cdb94;
    font-weight: 900;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    display: flex;
    align-items: center;
  }

  .stop {
    background-color: #ff3d3d;
  }

  .stop:hover {
    background-color: #ddacac;
  }

  .copy-icon {
    font-size: 20px;
  }

  .feedback-container {
    padding: 20px;
    background-color: #0a2640;
    /* border: solid lightgray 1px; */
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .feedback {
    display: flex;
    justify-content: space-between;
  }

  .student-answer {
    width: 640px;
    height: 560px;
    border: solid lightgray 1px;
    background-color: white;
    text-align: left;
    padding: 0px 30px;
    background-color: #244361;
    color: white;
    border-radius: 5px;
    margin-right: 20px;
  }

  .chat-feedback {
    width: 700px;
    height: 560px;
    border: solid lightgray 1px;
    background-color: white;
    text-align: left;
    padding: 0px 30px;
    border-radius: 5px;
  }

  .student-answer-heading {
    color: #5cdb94;
  }

  .feedback-heading {
    font-size: 25px;
  }

  .next-Question-btn {
    padding: 10px 20px;
    margin: 10px;
    margin-top: 30px;
    border-radius: 3px;
    width: 200px;
    background-color: white;
    border: solid black 1px;
    background-color: #5cdb94;
    color: black;
    font-weight: 600;
  }

  .next-Question-btn:hover {
    padding: 10px 20px;
    margin: 10px;
    margin-top: 30px;
    border-radius: 3px;
    width: 200px;
    background-color: white;
    border: solid black 1px;
    background-color: white;
    color: black;
    font-weight: 600;
  }

  .Caution {
    font-size: 13px;
    border: solid red 1px;
    padding: 10px;
    border-radius: 5px;
    background-color: #fac8c8;
  }

  .next-prev-container {
    display: flex;
  }

  .loader {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    /* align-items: center; */
  }

  /* .gif{
    width: 640px;
    height: 300px;
    display: flex;
    justify-content: center;
    align-items: center;
  } */
`;
