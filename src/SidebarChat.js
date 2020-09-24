import React, { useState, useEffect } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import db from "./firebase";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import TextTruncate from "react-text-truncate";

function SidebarChat({ id, name, addNewChat }) {
  const [{ user }, dispatch] = useStateValue();
  const [messages, setMessages] = useState("");
  const [seed, setSeed] = useState("");

  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please enter name for chat");

    if (roomName) {
      // do some stuff.....
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/male/${seed}.svg?mood[]=happy`}
        />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <TextTruncate
            line={1}
            element="p"
            truncateText="…"
            text={messages[0]?.message}
          />
          {/* <p>{messages[0]?.message}</p> */}
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add new Chat</h2>
    </div>
  );
}

export default SidebarChat;
