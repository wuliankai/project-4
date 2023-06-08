import React, { useState, useContext } from "react";
import { fetchData } from "./helpers/common";
import UserContext from "./context/user";

function LogIn() {
  const userCtx = useContext(UserContext);
  const [name, setName] = useState("User1");
  const [phoneNumber, setPhoneNumber] = useState("11111111");

  const handleLogin = async () => {
    const { ok, data } = await fetchData("/auth/login", undefined, "POST", {
      name,
      phoneNumber,
    });
    if (ok) {
      userCtx.setAccessToken(data.access);
      userCtx.setIsAdmin(data.is_admin);
      console.log(data);
      console.log("Log in OK!");
    } else {
      console.log(data);
    }
  };

  return (
    <>
      <input
        placeholder="Name"
        style={{ width: "20rem", height: "2rem" }}
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      <br />
      <input
        placeholder="Phone Number"
        style={{ width: "20rem", height: "2rem" }}
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      ></input>
      <br />
      <button style={{ width: "15rem", height: "2rem" }} onClick={handleLogin}>
        Log In
      </button>
    </>
  );
}

export default LogIn;
