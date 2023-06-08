import React, { useState, useEffect } from "react";
import "./App.css";
import LogIn from "./LogIn";
import Register from "./Register";
import MainDisplay from "./MainDisplay";
import UserContext from "./context/user";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [showLogin, setShowLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      <UserContext.Provider
        value={{ accessToken, setAccessToken, isAdmin, setIsAdmin }}
      >
        <h1
          style={{
            fontFamily: "'Tsukimi Rounded', sans-serif",
            color: "white",
            fontSize: "5rem",
          }}
        >
          Troupe
        </h1>
        {accessToken.length > 0 && { isAdmin: false } && <MainDisplay />}
        {accessToken.length === 0 && showLogin && (
          <LogIn setShowLogin={setShowLogin} />
        )}
      </UserContext.Provider>

      <br />
      <hr style={{ width: "20rem" }} />
      <br />

      <br />
      <UserContext.Provider
        value={{ accessToken, setAccessToken, isAdmin, setIsAdmin }}
      >
        {/* if not login */}
        {accessToken.length === 0 && showLogin && (
          <>
            <h2
              style={{
                fontFamily: "'Tsukimi Rounded', sans-serif",
                color: "white",
                fontSize: "2rem",
              }}
            >
              Register new account
            </h2>

            <Register setShowLogin={setShowLogin} />
          </>
        )}
      </UserContext.Provider>
    </>
  );
}

export default App;
