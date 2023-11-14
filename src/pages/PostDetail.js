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
import { useEffect } from "react";
import { fetchComments } from "../components/comment";
import { useAuth } from "../AuthContext";
import { addDoc, collection, doc } from "firebase/firestore";
import { firestore } from "../firebase";


const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  return date.toLocaleString(); // 또는 다른 원하는 형식으로 포맷 가능
};




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
              {comment.userEmail}
            </h4>
            <Stack direction="row" spacing={1}>
              <Chip
                label={"diamond"}
                size="small"
                color="primary"
                style={{ backgroundColor: "#834576" }}
              />
            </Stack>
          </div>
          <p style={{ textAlign: "left" }}>{comment.text}</p>
          <p style={{ textAlign: "left", color: "gray", fontSize: 12 }}>
            Created At: {formatCreatedAt(comment.createAt)}
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
  const { loggedInUser, loggedInEmail } = useAuth();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  let navigate = useNavigate();

  useEffect(() => {
    fetchComments(state.id, setComments);
    console.log(state)
  }, []);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  //댓글 달기 함수
  const handleCommentSubmit = async () => {
    try {
      const commentData = {
        text: comment,
        createAt: Date.now(),
        uid: loggedInUser,
        userEmail: loggedInEmail,
      };

      console.log(state.id, commentData)
  
      const postRef = doc(firestore, "Postings", state.id);
      console.log(postRef);
      const commentsRef = collection(postRef, "Comments");
      console.log(commentsRef);
      await addDoc(commentsRef, commentData);
  
      console.log("댓글이 성공적으로 게시되었습니다.");
      fetchComments(state.id, setComments);
      setComment("");
    } catch (error) {
      console.log("댓글 게시 중 오류 발생:", error.message);
    }
  }

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
              {state.title}
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
        <p style={{ color: "gray", fontSize: 14 }}>Posted by: {state.userEmail} | Created At: {formatCreatedAt(state.createAt)}</p>
        <p>{state.text}</p>
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
            <Button type="submit" variant="contained" color="black" onClick={()=> handleCommentSubmit()}>
              Submit Comment
            </Button>
          
        </Paper>
      </ThemeProvider>
    </div>
  );
}
