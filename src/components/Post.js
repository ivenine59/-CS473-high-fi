// 예시: PostForm 컴포넌트

import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database"; // for realtime database
import { doc, collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { firestore, auth } from "../firebase";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [comment, setComment] = useState("");

  const handlePost = async () => {
    console.log("posting");
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

      const docRef = await addDoc(collection(firestore, "Postings"), {
        title: title,
        text: content,
        createAt: Date.now(),
        uid: uid,
        userEmail: userEmail,
        //여기다가 이것저것 추가하면 될듯
      });
      setContent(docRef);
      console.log("글이 성공적으로 게시되었습니다.");
      // 게시 후 필요한 동작을 수행하세요.

      // 게시 후에 입력 필드 초기화
      setTitle("");
      setContent("");
    } catch (error) {
      console.log("글 게시 중 오류 발생:", error.message);
    }
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

      const commentData ={
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
      <h2>새 글 작성</h2>
      <input
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handlePost}>게시</button>
      <h2>댓글 작성</h2>
      <textarea
        placeholder="댓글 작성"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button onClick={handleComment("9Xexi7pdlU89MHHH3uIg")}>댓글 작성</button>
    </div>
  );
};

export default PostForm;
