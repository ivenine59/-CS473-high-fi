import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy,} from "firebase/firestore";
import { firestore, auth } from "../firebase";
import { fetchComments, postComment, postRating } from "./comment"; // Import comment-related functions

const PostList = () => {
  const [postings, setPostings] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [userRatings, setUserRatings] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(firestore, "Postings"), orderBy("createAt", "desc")),
      (snapshot) => {
        const newPostings = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPostings(newPostings);
      }
    );

    return () => unsubscribe();
  }, []); // Run the effect only once on mount

  useEffect(() => {
    if (selectedPost) {
      const unsubscribe = fetchComments(selectedPost.id, setComments);
      return () => unsubscribe();
    }
  }, [selectedPost]);

  const handleSelectPost = (postId) => {
    const selected = postings.find((post) => post.id === postId);
    setSelectedPost(selected);
  };

  const handleComment = async (postId) => {
    console.log("commenting");
    await postComment(postId, comment);
    setComment(""); // Reset the comment input field
  };

  const handleRatingClick = async (postId, commentId, rating) => {
    console.log("rating");
    const existingRatingIndex = userRatings.findIndex(
      (userRating) => userRating.postId === postId && userRating.commentId === commentId
    );

    if (existingRatingIndex !== -1) {
      // If the user has already rated, update the existing rating
      const updatedRatings = [...userRatings];
      updatedRatings[existingRatingIndex] = { postId, commentId, rating };
      setUserRatings(updatedRatings);
    } else {
      // If the user hasn't rated, add a new rating
      setUserRatings((prevRatings) => [
        ...prevRatings,
        { postId, commentId, rating },
      ]);
    }
  
    // Update the selected rating state
    setSelectedRating({ postId, commentId, rating });
  
    // Update the rating in the database
    await postRating(postId, commentId, rating);
  
  };

  return (
    <div>
      <h2>게시물 목록</h2>
      <ul>
        {postings.map((post) => (
          <li key={post.id}>
            <strong>Id:</strong> {post.id} <br />
            <strong>Title:</strong> {post.title} <br />
            <strong>UserID:</strong> {post.userEmail} <br />
            <strong>Text:</strong> {post.text} <br />
            <strong>CreatedAt:</strong> {post.createAt} <br />
            <button onClick={() => handleSelectPost(post.id)}>Select</button>
          </li>
        ))}
      </ul>

      {selectedPost && (
        <div>
          <h2>Selected Post Details</h2>
          <p>
            <strong>Id:</strong> {selectedPost.id}
          </p>
          <p>
            <strong>Title:</strong> {selectedPost.title}
          </p>
          <p>
            <strong>UserID:</strong> {selectedPost.userEmail}
          </p>
          <p>
            <strong>Text:</strong> {selectedPost.text}
          </p>
          <p>
            <strong>CreatedAt:</strong> {selectedPost.createAt}
          </p>
          <h2>댓글 작성</h2>
          <textarea
            placeholder="댓글 작성"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button onClick={() => handleComment(selectedPost.id)}>
            댓글 작성
          </button>

          <h2>댓글 목록</h2>
          <ul>
            {comments.map((comment) => (
              <li key={comment.id}>
                <strong>ID:</strong> {comment.id} <br />
                <strong>User ID:</strong> {comment.userEmail} <br />
                <strong>Text:</strong> {comment.text} <br />
                <strong>CreatedAt:</strong> {comment.createAt} <br />
                <h3>별점 선택</h3>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() =>
                      handleRatingClick(selectedPost.id, comment.id, rating)
                    }
                    style={{
                      backgroundColor:
                        (rating === selectedRating?.rating &&
                        comment.id === selectedRating?.commentId)||
                        userRatings.some((userRating) =>
                        userRating.commentId === comment.id &&
                        userRating.rating === rating
                        )
                        ? "yellow" : "white",
                    }}
                  >
                    {rating}
                  </button>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PostList;
