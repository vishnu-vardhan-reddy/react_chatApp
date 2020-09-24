import React, { useState, useEffect, useReducer } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, SearchOutlined, MoreVert } from "@material-ui/icons";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import { useParams, useHistory } from "react-router-dom";
import db from "./firebase";
import firebase from "firebase";
import { useStateValue } from "./StateProvider";
import SendIcon from "@material-ui/icons/Send";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import Media from "react-media";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

function Chat() {
  const [{ user }, dispatch] = useStateValue();
  const [seed, setSeed] = useState("");
  const [input, setInput] = useState("");
  var { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const history = useHistory();
  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRoomName(snapshot.data().name);
        });

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (roomId) {
      if (input) {
        db.collection("rooms").doc(roomId).collection("messages").add({
          message: input,
          name: user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
      }
    } else {
      alert("select Room name");
    }
    setInput("");
  };

  return (
    <div className="chat">
      <div className="header">
        <div className="chat__header">
          <Media query="(max-width:800px)">
            {(matches) => {
              return matches ? (
                <IconButton
                  onClick={() => {
                    history.push("/");
                  }}
                >
                  <ArrowBackIcon />
                </IconButton>
              ) : (
                " "
              );
            }}
            {/* <IconButton className='chat__goBack' onClick={() => {history.push('/')}}><ArrowBackIcon /></IconButton> */}
          </Media>
          <Avatar
            src={`https://avatars.dicebear.com/api/male/${seed}.svg?mood[]=happy`}
          />

          <div className="chat__headerInfo">
            <h3>{roomName}</h3>
          </div>

          <div className="chat__headerRight">
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <AttachFile />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
        <p>
          Last seen at{" "}
          {new Date(
            messages[messages.length - 1]?.timestamp?.toDate()
          ).toUTCString()}
        </p>
      </div>
      <div className="chat__body">
        {messages.map((message) => (
          <p
            className={`chat__message ${
              message.name == user.displayName && "chat__reciever"
            }`}
          >
            <span className="chat__sender"> {message.name} </span>
            <div className="text__ellipsis">
              <span className="chat__messageLength"> {message.message}</span>
              <ExpandMoreIcon className="chat__expandMore" />
            </div>
            <span className="chat__timestamp">
              {new Date(message.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
          />
          <IconButton className="button" onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
