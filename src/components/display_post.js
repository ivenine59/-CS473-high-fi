import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { firestore } from "../firebase";

const PostList = () => {
  const [postings, setPostings] = useState([]);

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
            <br /> {/* Add other fields as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
