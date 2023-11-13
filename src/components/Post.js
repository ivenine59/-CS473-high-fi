// 예시: PostForm 컴포넌트

import React, { useState } from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/database"; // for realtime database
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { firestore } from "../firebase";

const PostForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handlePost = async () => {
    console.log("posting");
    try {
      const docRef = await addDoc(collection(firestore, "fweets"), {
        text: content,
        createAt: Date.now(),
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
