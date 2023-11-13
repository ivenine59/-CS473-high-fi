import React from "react";
import { Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./buttonTheme";

const MyPage = () => {
  const userData = {
    username: "My Username",
    posts: [
      { id: 1, title: "My Post 1", timestamp: "2 hours ago" },
      { id: 2, title: "My Post 2", timestamp: "3 hours ago" },
      // Add more user posts as needed
    ],
    comments: [
      {
        id: 1,
        postId: 1,
        content: "This is a comment on My Post 1",
        timestamp: "1 hour ago",
      },
      {
        id: 2,
        postId: 2,
        content: "Nice post! Looking forward to more.",
        timestamp: "2 hours ago",
      },
      // Add more user comments as needed
    ],
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div style={{ padding: 14, maxWidth: 1000, margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: 24, marginBottom: 20 }}>My Page</h1>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="black" onClick={handleBack}>
            Back to Home
          </Button>
        </ThemeProvider>
      </div>
      <h2 style={{ fontSize: 20, marginBottom: 10 }}>My Posts</h2>
      {userData.posts.map((post) => (
        <Paper
          key={post.id}
          style={{ padding: "20px 20px", marginTop: 10, marginBottom: 20 }}
        >
          <h3 style={{ fontSize: 18, marginBottom: 10 }}>{post.title}</h3>
          <p style={{ color: "gray", fontSize: 14 }}>Posted {post.timestamp}</p>
        </Paper>
      ))}
      <h2 style={{ fontSize: 20, marginBottom: 10, marginTop: 20 }}>My Comments</h2>
      {userData.comments.map((comment) => (
        <Paper
          key={comment.id}
          style={{ padding: "20px 20px", marginTop: 10, marginBottom: 20 }}
        >
          <p style={{ fontSize: 16, marginBottom: 10 }}>{comment.content}</p>
          <p style={{ color: "gray", fontSize: 14 }}>
            Commented on Post {comment.postId}, {comment.timestamp}
          </p>
        </Paper>
      ))}
    </div>
  );
};

export default MyPage;
