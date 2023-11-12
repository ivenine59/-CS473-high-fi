/* src/App.js */
import './App.css';
import React, { useState } from 'react';
import Header from './Header'
import Auth from './components/Auth';
import { db } from './firebase'

function App() {
  const categories = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5', 'Category 6', 'Category 7', 'Category 8', 'Category 9', 'Category 10', 'Category 11', 'Category 12', 'Category 13' ];

  return (
    <div className="App">
      <Header />
      <div className="wrap">
          <img src={process.env.PUBLIC_URL + '/hdr-image.jpg'} />
          <p>We are HDR who pursue healthy discussion</p>
      </div>
      <div className="category-buttons">
        <p style={{ color: 'black', fontSize: '25px'}}>
          Here are categories you can find
        </p>
        <div className="button-container">
          {categories.map((category, index) => (
            <button key={index} className="category-button">
              {category}
            </button>
          ))}
        </div>
        </div>
      <div>
        <h1>로그인 및 회원 가입 파트</h1>
        <Auth />
      </div>
    </div>
    
  );
}


export default App;
