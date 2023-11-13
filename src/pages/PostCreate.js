import React, { useState } from "react";
import { Paper, TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from '@mui/material/styles';
import { theme } from "./buttonTheme";

export default function PostCreate() {
  const navigate = useNavigate();
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");

  const handleTitleChange = (event) => {
    setPostTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleCancel = (event) => {
    navigate("/post"); // Redirect to the post list or another page
  };

  const handlePostSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle the submitted post title and content, e.g., send to server
    console.log("Submitted post title:", postTitle);
    console.log("Submitted post content:", postContent);
    setPostTitle(""); // Clear the title input after submission
    setPostContent(""); // Clear the content input after submission
    navigate("/post"); // Redirect to the post list or another page
  };

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
