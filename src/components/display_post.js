import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { firestore } from "../firebase";

const PostList = () => {
  const [postings, setPostings] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestore, "Postings"),
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

  return (
    <div>
      <h2>게시물 목록</h2>
      <ul>
        {postings.map((post) => (
          <li key={post.id}>
            <strong>Title:</strong> {post.title} <br />
            <strong>UID:</strong> {post.uid} <br />
            <strong>Text:</strong> {post.text} <br />
            <strong>CreatedAt:</strong> {post.createAt}{" "}
            {/* Add other fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
