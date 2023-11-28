import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loggedInEmail, setLoggedInEmail] = useState(null);

  useEffect(() => {
    // 페이지 로드 시 로컬 스토리지에서 로그인 정보를 가져옴
    const storedUser = localStorage.getItem("loggedInUser");
    const storedEmail = localStorage.getItem("loggedInEmail");
    if (storedUser && storedEmail) {
      setLoggedInUser(JSON.parse(storedUser));
      setLoggedInEmail(JSON.parse(storedEmail));
    }else{
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("loggedInEmail");
    }
    
  }, []);

  const login = (user, email) => {
    setLoggedInUser(user);
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    setLoggedInEmail(email);
    localStorage.setItem("loggedInEmail", JSON.stringify(email));

    // 30분(1800000 밀리초) 후에 로그인 정보를 삭제
    setTimeout(() => {
      logout();
    }, 1800000);
  };

  const logout = () => {
    setLoggedInUser(null);
    setLoggedInEmail(null);
    // 로그아웃 시 로컬 스토리지에서 로그인 정보 제거
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("loggedInEmail");
    alert("로그아웃되었습니다");
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, loggedInEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};