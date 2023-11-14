/* src/App.js */
import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
import Auth from "./components/Auth";
import PostForm from "./components/Post";
import PostList from "./components/display_post";
import Home from "./pages/Home";
import Post from "./pages/Post";
import PostDetail from "./pages/PostDetail";
import PostCreate from "./pages/PostCreate";
import MyPage from "./pages/MyPage";
import LogIn from "./pages/Login";
import SignUp from "./pages/SignUp";
import AboutUs from "./components/AboutUs";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/post" element={<Post />} />
            <Route path="/postdetail" element={<PostDetail />} />
            <Route path="/postcreate" element={<PostCreate />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </AuthProvider>
      {/* <div className="category-buttons">
        <p style={{ color: "black", fontSize: "25px" }}>
          Here are categories you can find
        </p>
        <div className="button-container">
          {categories.map((category, index) => (
            <button key={index} className="category-button">
              {category}
            </button>
          ))}
        </div>
      </div> */}
      {/* <div>
        <h1>로그인 및 회원 가입 파트</h1>
        <Auth />
      </div>
      <div>
        <h1>글쓰기 기능 파트</h1>
        <PostForm />
      </div>
      <div>
        <h1>display 기능 파트</h1>
        <PostList />
      </div> */}
    </Router>
  );
}

export default App;
