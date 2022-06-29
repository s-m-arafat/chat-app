import { React, useEffect, useRef, useState } from "react";
import logo from "./images/logo32.png";
import io from "socket.io-client";

export default function App() {
  const [msg, setMsg] = useState("");
  const [msgList, setMsgList] = useState([]);
  const socketRef = useRef();

  useEffect(() => {
    const socket = io("ws://localhost:5000");
    socket.on("message", (msg) => {
      setMsgList((prevList) => [...prevList, msg]);
      // console.log(msg);
    });
    socketRef.current = socket;
    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(msg);
    socketRef.current.emit("message", msg);
    setMsg("");
  };
  return (
    <div>
      <h1 className="text-3xl p-5 bg-black text-center text-white">
        <img src={logo} alt="logo" className="inline pr-5" />
        Chat App
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="message"
          value={msg}
          className="ml-10 mt-10 border-l"
          onChange={(e) => setMsg(e.target.value)}
        />
        <input
          type="submit"
          value="Send"
          className="bg-blue-900 text-white p-5"
        />
      </form>
      {msgList.map((msg, index) => (
        <div key={index}>{msg}</div>
      ))}
    </div>
  );
}
