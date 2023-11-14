import React, { useState } from "react";
import { auth, firestore } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const docRef = await addDoc(collection(firestore, "Accounts"), {
        userEmail: email,
        sum_rating: 0,
        num_rating: 0,
      });

      console.log("회원 가입 성공", userCredential);
    } catch (error) {
      console.error("회원 가입 실패", error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("로그인 성공", userCredential);
    } catch (error) {
      console.error("로그인 실패", error.message);
    }
  };

  return (
    <div>
      <h2>회원 가입</h2>
      <input
        type="email"
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>회원 가입</button>

      <h2>로그인</h2>
      <input
        type="email"
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>로그인</button>
    </div>
  );
};

export default Auth;
