import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  addDoc,
} from "firebase/firestore";
import { firestore, auth } from "../firebase";

const PostList = () => {
  const [postings, setPostings] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [comment, setComment] = useState("");

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

  const handleSelectPost = (postId) => {
    const selected = postings.find((post) => post.id === postId);
    setSelectedPost(selected);
  };

  const handleComment = async (postId) => {
    console.log("commenting");
    try {
      const user = auth.currentUser; // Get the current user
      const uid = user ? user.uid : null; // Get the user's uid

      if (!uid) {
        console.error("User not authenticated");
        return;
      }

      const userEmail = user ? user.email : null; // Get the user's email

      if (!userEmail) {
        console.error("User email not available");
        return;
      }

      const commentData = {
        text: comment,
        createAt: Date.now(),
        uid: uid,
        userEmail: userEmail,
        // Other comment-related fields
      };

      const postRef = doc(firestore, "Postings", postId);
      const commentsRef = collection(postRef, "Comments");
      await addDoc(commentsRef, commentData);

      setComment(""); // Reset the comment input field

      console.log("댓글이 성공적으로 게시되었습니다.");
      // Perform necessary actions after comment submission
    } catch (error) {
      console.log("댓글 게시 중 오류 발생:", error.message);
    }
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
            <strong>CreatedAt:</strong> {post.createAt}
            <br />
            <button onClick={() => handleSelectPost(post.id)}>Select</button>
            {/* Add other fields as needed */}
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

          {/* Add other fields as needed */}
        </div>
      )}
    </div>
  );
};

export default PostList;
