import React, { useState } from "react";
import {
  Avatar,
  Grid,
  Paper,
  Stack,
  Chip,
  TextField,
  Button,
} from "@mui/material";
import { useLocation } from "react-router";
import { theme } from "./buttonTheme";
import { ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Rating from "@mui/material/Rating";

const CommentCard = ({ comment }) => {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [tempRating, setTempRating] = useState(0);

  const handleRatingOpen = () => {
    setIsRatingOpen(true);
  };

  const handleRatingClose = () => {
    setIsRatingOpen(false);
  };

  const handleRatingChange = (event, value) => {
    setTempRating(value);
  };

  const handleRatingSubmit = () => {
    // Add logic to handle the submitted rating
    // For example, update the comment's rating in the state
    // and close the rating popover
    setIsRatingOpen(false);
  };

  const handleRatingCancel = () => {
    // Add logic to cancel the rating
    // For example, close the rating popover without saving the rating
    setIsRatingOpen(false);
  };

  return (
    <Paper key={comment.id} style={{ padding: "20px 10px", marginTop: 10 }}>
      <Grid container wrap="nowrap" spacing={2}>
        <Grid item>
          {/* Avatar or any other content you want to display */}
        </Grid>
        <Grid justifyContent="left" item xs zeroMinWidth>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h4 style={{ margin: 0, textAlign: "left", marginRight: 10 }}>
              {comment.author}
            </h4>
            <Stack direction="row" spacing={1}>
              <Chip
                label={comment.badgeLabel}
                size="small"
                color="primary"
                style={{ backgroundColor: comment.badgeColor }}
              />
            </Stack>
          </div>
          <p style={{ textAlign: "left" }}>{comment.content}</p>
          <p style={{ textAlign: "left", color: "gray", fontSize: 12 }}>
            {comment.timestamp}
          </p>
          {isRatingOpen ? (
            <div
              style={{ marginTop: 10, display: "flex", alignItems: "center" }}
            >
              <Rating
                name="comment-rating"
                value={tempRating}
                onChange={handleRatingChange}
              />
              <Button
                variant="contained"
                style={{
                  marginLeft: 10,
                  backgroundColor: "#FF0000",
                  color: "#FFF",
                }}
                onClick={handleRatingCancel}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                style={{marginLeft: 10, backgroundColor: "#000", color: "#FFF" }}
                onClick={handleRatingSubmit}
              >
                Submit
              </Button>
            </div>
          ) : (
            <Button
              onClick={handleRatingOpen}
              variant="contained"
              style={{
                marginTop: 10,
                backgroundColor: "#FFA500",
                color: "#000",
              }}
            >
              Rate
            </Button>
          )}
        </Grid>
      </Grid>
    </Paper>
  );
};

const imgLink =
  "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function PostDetail() {
  const { state } = useLocation(); //post id
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "ander",
      content: "Lorem ipsum dol",
      timestamp: "1 minute ago",
      badgeLabel: "diamond",
      badgeColor: "#834576",
    },
    {
      id: 2,
      author: "Michel Michel",
      content: "Lol~",
      timestamp: "1 minute ago",
      badgeLabel: "diamond",
      badgeColor: "#834576",
    },
    {
      id: 3,
      author: "Michel Michel",
      content: "don't do",
      timestamp: "1 minute ago",
      badgeLabel: "diamond",
      badgeColor: "#834576",
    },
    // Add more comments as needed
  ]);

  let navigate = useNavigate();

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();
    // Add logic to handle the submitted comment, e.g., send to server
    const newComment = {
      id: comments.length + 1,
      author: "Your Name", // Replace with the actual author
      content: comment,
      timestamp: "just now", // You can use a timestamp library for accurate timestamps
      badgeLabel: "diamond", // You can customize the badge label
      badgeColor: "#834576", // You can customize the badge color
    };
    setComments([...comments, newComment]);
    setComment(""); // Clear the comment input after submission
  };

  const handleDelete = () => {
    // Add logic to delete the post (for example, show a confirmation dialog)
    console.log("Delete post with ID:", state.postId);
  };

  const handleBack = () => {
    // Navigate back to the post list
    navigate("/post");
  };

  return (
    <div
      style={{ padding: 14, maxWidth: 1000, margin: "0 auto" }}
      className="PostDetail"
    >
      {/* 최대 넓이 제한 */}
      {/* 포스트 영역 */}
      <Paper style={{ padding: "20px 20px", marginTop: 10, marginBottom: 20 }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <h1 style={{ fontSize: 24, marginBottom: 10 }}>
              Post Title {state.postId}
            </h1>
          </Grid>
          <Grid item>
            <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              style={{ marginRight: 10 }}
            >
              <DeleteIcon />
            </Button>
            <Button onClick={handleBack} variant="contained" color="primary">
              <ArrowBackIcon />
            </Button>
          </Grid>
        </Grid>
        <p style={{ color: "gray", fontSize: 14 }}>Posted by: Michel Michel</p>
        <p>여기는 포스트의 내용이 들어옵니다.</p>
      </Paper>
      {/* 댓글 영역 */}
      <h1 style={{ fontSize: 20, marginBottom: 10 }}>Comments</h1>{" "}
      {/* 폰트 크기 조절 및 마진 추가 */}
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
      {/*댓글 작성 영역*/}
      <ThemeProvider theme={theme}>
        <Paper style={{ padding: "20px 10px", marginTop: 10 }}>
          <form onSubmit={handleCommentSubmit}>
            <TextField
              label="Write a comment"
              multiline
              fullWidth
              rows={4}
              value={comment}
              onChange={handleCommentChange}
              variant="outlined"
              style={{ marginBottom: 10 }}
            />
            <Button type="submit" variant="contained" color="black">
              Submit Comment
            </Button>
          </form>
        </Paper>
      </ThemeProvider>
    </div>
  );
}
