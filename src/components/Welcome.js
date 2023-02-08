import React from "react";
import Robot from "../assets/robot.gif";
import "../styles/welcome.scss";
const Welcome = ({ currentUser }) => {
  console.log(currentUser?.username);

  return (
    <div className="welcomeContainer">
      <img src={Robot} alt="robot" />
      <h1>
        Welcome, <span>{currentUser?.username}!</span>
      </h1>
      <h3>Please select a chat to start messaging</h3>
    </div>
  );
};

export default Welcome;
