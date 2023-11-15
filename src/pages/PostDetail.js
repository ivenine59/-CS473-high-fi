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
import { postRate } from "../components/comment";
import getpercentrank from "../components/giverank";
import { async } from "q";

const formatCreatedAt = (createdAt) => {
  const date = new Date(createdAt);
  return date.toLocaleString(); // 또는 다른 원하는 형식으로 포맷 가능
};

const CommentCard = ({ comment, postId, uid, userEmail }) => {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [tempRating, setTempRating] = useState(0);
  const [receivedTier, setReceivedTier] = useState("iron");
  const [receivedTierColor, setReceivedTierColor] = useState("#696969");
  const [deliverTier, setDeliverTier] = useState("iron");
  const [deliverTierColor, setDeliverTierColor] = useState("#696969");
  const badgeNames = [
    "diamond",
    "platinum",
    "gold",
    "silver",
    "bronze",
    "iron",
  ];
  const badgeColors = [
    "#0F4C81",
    "#0EC492",
    "#FFD700",
    "#B0C4DE",
    "#CD7F32",
    "#43464B",
  ];

  getpercentrank(comment.userEmail);

  useEffect(() => {
    async function fetchRank() {
      const rankResult = await getpercentrank(comment.userEmail);

      const receivedRank = rankResult[0];
      const deliverRank = rankResult[1];

      if (receivedRank > 0.8) {
        setReceivedTier(badgeNames[5]);
        setReceivedTierColor(badgeColors[5]);
      } else if (receivedRank > 0.5) {
        setReceivedTier(badgeNames[4]);
        setReceivedTierColor(badgeColors[4]);
      } else if (receivedRank > 0.3) {
        setReceivedTier(badgeNames[3]);
        setReceivedTierColor(badgeColors[3]);
      } else if (receivedRank > 0.15) {
        setReceivedTier(badgeNames[2]);
        setReceivedTierColor(badgeColors[2]);
      } else if (receivedRank > 0.05) {
        setReceivedTier(badgeNames[1]);
        setReceivedTierColor(badgeColors[1]);
      } else {
        setReceivedTier(badgeNames[0]);
        setReceivedTierColor(badgeColors[0]);
      }

      if (deliverRank > 0.8) {
        setDeliverTier(badgeNames[5]);
        setDeliverTierColor(badgeColors[5]);
      } else if (deliverRank > 0.5) {
        setDeliverTier(badgeNames[4]);
        setDeliverTierColor(badgeColors[4]);
      } else if (deliverRank > 0.3) {
        setDeliverTier(badgeNames[3]);
        setDeliverTierColor(badgeColors[3]);
      } else if (deliverRank > 0.15) {
        setDeliverTier(badgeNames[2]);
        setDeliverTierColor(badgeColors[2]);
      } else if (deliverRank > 0.05) {
        setDeliverTier(badgeNames[1]);
        setDeliverTierColor(badgeColors[1]);
      } else {
        setDeliverTier(badgeNames[0]);
        setDeliverTierColor(badgeColors[0]);
      }
    }
    fetchRank();

  }, []);

  const handleRatingOpen = () => {
    if (uid == null) {
      alert("로그인하지 않아 별점을 줄 수 없습니다.");
    } else {
      if(userEmail == comment.userEmail){
        alert("자신의 댓글은 점수를 줄 수 없습니다.")
      }else{
        setIsRatingOpen(true);

      }
    }
  };

  const handleRatingClose = () => {
    setIsRatingOpen(false);
  };

  const handleRatingChange = (event, value) => {
    setTempRating(value);
    console.log(value);
  };

  const handleRatingSubmit = () => {
    // Add logic to handle the submitted rating
    // For example, update the comment's rating in the state
    // and close the rating popover
    try {
      postRate(postId, comment.id, uid, userEmail, tempRating);
      setIsRatingOpen(false);
      setTempRating(0);
    } catch (error) {
      alert("점수를 주는데 실패하였습니다.");
    }
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
                label={receivedTier}
                size="small"
                color="primary"
                style={{ backgroundColor: receivedTierColor }}
              />
              <Chip
                label={deliverTier}
                size="small"
                color="primary"
                style={{ backgroundColor: deliverTierColor }}
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
                style={{
                  marginLeft: 10,
                  backgroundColor: "#000",
                  color: "#FFF",
                }}
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
  }, []);

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  //댓글 달기 함수
  const handleCommentSubmit = async () => {
    if (loggedInUser != null) {
      try {
        const commentData = {
          text: comment,
          createAt: Date.now(),
          uid: loggedInUser,
          userEmail: loggedInEmail,
        };

        console.log(state.id, commentData);

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
    } else {
      alert("로그인하지 않으면 댓글을 적을 수 없습니다.");
    }
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
            <h1 style={{ fontSize: 24, marginBottom: 10 }}>{state.title}</h1>
          </Grid>
          <Grid item>
            {/* <Button
              onClick={handleDelete}
              variant="contained"
              color="error"
              style={{ marginRight: 10 }}
            >
              <DeleteIcon />
            </Button> */}
            <Button onClick={handleBack} variant="contained" color="primary">
              <ArrowBackIcon />
            </Button>
          </Grid>
        </Grid>
        <p style={{ color: "gray", fontSize: 14 }}>
          Posted by: {state.userEmail} | Created At:{" "}
          {formatCreatedAt(state.createAt)}
        </p>
        <p>{state.text}</p>
      </Paper>
      {/* 댓글 영역 */}
      <h1 style={{ fontSize: 20, marginBottom: 10 }}>Comments</h1>{" "}
      {/* 폰트 크기 조절 및 마진 추가 */}
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          comment={comment}
          postId={state.id}
          uid={loggedInUser}
          userEmail={loggedInEmail}
        />
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
          <Button
            type="submit"
            variant="contained"
            color="black"
            onClick={() => handleCommentSubmit()}
          >
            Submit Comment
          </Button>
        </Paper>
      </ThemeProvider>
    </div>
  );
}
