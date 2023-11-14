import React, { useState } from "react";
import { Paper, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./buttonTheme";
import { useAuth } from "../AuthContext";
import { useEffect } from "react";
import { firestore } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

export default function PostCreate() {
  const navigate = useNavigate();
  const { loggedInUser, loggedInEmail } = useAuth();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  useEffect(() => {
    if((loggedInUser && loggedInEmail)== null){
      navigate("/post");
    }
  }, []);

  const handleTitleChange = (event) => {
    setPostTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleCancel = (event) => {
    navigate("/post"); // Redirect to the post list or another page
  };

  const handlePostSubmit = async () => {
    if(loggedInUser!=null){
      try {
        await addDoc(collection(firestore, "Postings"), {
          title: postTitle,
          text: postContent,
          createAt: Date.now(),
          uid: loggedInUser,
          userEmail: loggedInEmail,
          //여기다가 이것저것 추가하면 될듯
        });
        setPostTitle(""); // Clear the title input after submission
        setPostContent(""); // Clear the content input after submission
        alert("글 작성에 성공하였습니다.")
        navigate("/post");
      } catch (error) {
        alert("로그인에 실패했습니다. 이메일이나 비밀번호를 확인해주세요.");
      }
    }else{
      alert("로그인하지 않으면 글을 적을 수 없습니다.")
    }
  }

  return (
    <div style={{ padding: 14, maxWidth: 1000, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, marginBottom: 20 }}>Create a New Post</h1>
      <Paper style={{ padding: "20px 10px", marginTop: 10 }}>
        <TextField
          label="Title"
          fullWidth
          value={postTitle}
          onChange={handleTitleChange}
          variant="outlined"
          style={{ marginBottom: 10 }}
        />
        <TextField
          label="Write your post"
          multiline
          fullWidth
          rows={6}
          value={postContent}
          onChange={handleContentChange}
          variant="outlined"
          style={{ marginBottom: 10 }}
        />
        <ThemeProvider theme={theme}>
          <Button type="submit" variant="contained" color="error" style={{ marginRight: 10 }} onClick={handleCancel}>
            Cancel Post
          </Button>
          <Button type="submit" variant="contained" color="black" onClick={handlePostSubmit}>
            Submit Post
          </Button>
        </ThemeProvider>
      </Paper>
    </div>
  );
}
