// 예시: PostForm 컴포넌트

import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/firestore";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePost = async () => {
    try {
      const db = firebase.firestore();
      const postsRef = db.collection("posts");

      await postsRef.add({
        title,
        content,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

      console.log("글이 성공적으로 게시되었습니다.");
      // 게시 후 필요한 동작을 수행하세요.

      // 게시 후에 입력 필드 초기화
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("글 게시 중 오류 발생:", error.message);
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
    </div>
  );
};

export default PostForm;
