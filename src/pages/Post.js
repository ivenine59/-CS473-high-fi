import React from "react";
import { Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./buttonTheme";

const PostListItem = ({ id, title, author }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/postdetail`, { state: { postId: id } });
  };

  return (
    <Paper
      style={{
        padding: "20px 20px",
        marginTop: 10,
        marginBottom: 20,
        cursor: "pointer",
      }}
      onClick={handleClick}
    >
      <h2 style={{ fontSize: 20, marginBottom: 10 }}>{title}</h2>
      <p style={{ color: "gray", fontSize: 14 }}>Posted by: {author}</p>
    </Paper>
  );
};

export default function Post() {
  const posts = [
    { id: 1, title: "Post 1", author: "Author 1" },
    { id: 2, title: "Post 2", author: "Author 2" },
    // Add more posts as needed
  ];

  const navigate = useNavigate();

  const handleCreatePost = () => {
    navigate("/postcreate"); // Assuming "/postcreation" is the route for creating a new post
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
        <h1 style={{ fontSize: 24, marginBottom: 20 }}>Post List</h1>
        <ThemeProvider theme={theme}>
          <Button variant="contained" color="black" onClick={handleCreatePost}>
            Create Post
          </Button>
        </ThemeProvider>
      </div>
      {posts.map((post) => (
        <PostListItem key={post.id} {...post} />
      ))}
    </div>
  );
}
