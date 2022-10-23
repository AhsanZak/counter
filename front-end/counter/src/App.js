import {useState, useEffect} from 'react';
import './App.css';
import { io } from "socket.io-client";

function App() {
  const [countervalue, setcounterValue] = useState(0);

  const [socketInstance, setSocketInstance] = useState("");
  const [buttonStatus, setButtonStatus] = useState(false);

  const handleClick = () => {
    if (buttonStatus === false) {
      setButtonStatus(true);
    } else {
      setButtonStatus(false);
    }
  };

  useEffect(() => {
    if (buttonStatus === true) {
      const socket = io("http://localhost:5001/", {
        cors: {
          origin: "http://localhost:3000/",
          methods: ["GET", "POST"],
          transports: ['websocket', 'polling'],
        },
      });

      setSocketInstance(socket);

      socket.on("connect", (data) => {
        console.log(data);
      });

      
      socket.emit("data", countervalue);

      socket.on("data", (data) => {
        console.log("Value from backend : ", data);
        setcounterValue(data.data);
      });

      socket.on("disconnect", (data) => {
        console.log(data);
      });

      return function cleanup() {
        socket.disconnect();
      };
    }
  }, [buttonStatus]);

  return (
    <div className="App">
      <button onClick={handleClick}>Click</button>
      <p>{countervalue}</p>
    </div>
  );
}

export default App;
