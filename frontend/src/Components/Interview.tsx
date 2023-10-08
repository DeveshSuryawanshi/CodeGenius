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

    let prompt = `This is question :- ${questions[currentIndex].question} and this is answer of this question :- ${transcript} give me feedback on this answer`;
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
                <div className="student-answer">
                  <h1 className="student-answer-heading">Your Answer</h1>
                  <p>{transcript}</p>
                </div>
                <div className="chat-feedback">
                  <p className="feedback-heading">Feedback</p>
                  {isLoading ? <h1>Loading...</h1> : <p>{feedBack}</p>}
                </div>
              </div>
              <button
                className="next-Question-btn"
                onClick={handleNextQuestion}
              >
                Next Question
              </button>
            </div>
          ) : (
            <div>
              <div className="question-and-cam-container">
                <div className="question-container">
                  <h1>Question {currentIndex + 1}</h1>
                  <p className="question">
                    {questions.length !== 0 && questions[currentIndex].question}
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
                {transcript}
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
    width: 90%;
    margin: auto;
    height: 295px;
  }

  .question-container {
    width: 50%;
    /* height: 300px; */
    text-align: left;
    padding: 20px;
  }

  .cam-container {
    width: 50%;
    /* height: 300px; */
    display: flex;
    justify-content: right;
    padding-top: 30px;
  }

  .question {
    font-size: 18px;
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
    color: white;
    font-weight: 700;
  }

  .copy {
    background-color: #ff6969;
    font-weight: 900;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    display: flex;
    align-items: center;
  }

  .stop {
    background-color: #ff3d3d;
  }

  .copy-icon {
    font-size: 20px;
  }

  .feedback-container {
    padding: 20px;
    background-color: #05396b;
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
    width: 45%;
    height: 560px;
    border: solid lightgray 1px;
    background-color: white;
    text-align: left;
    padding: 0px 30px;
    background-color: #05396b;
    color: white;
    border-radius: 5px;
  }

  .chat-feedback {
    width: 45%;
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
    border: solid lightgray 1px;
    background-color: #ff3d3d;
    color: white;
    font-weight: 600;
  }
`;
