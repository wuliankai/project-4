import React, { useState } from "react";
import { fetchData } from "./helpers/common";

function Register() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const registerUser = async () => {
    const { ok, data } = await fetchData("/user", undefined, "POST", {
      name,
      phoneNumber,
    });

    if (ok) {
      setName("");
      setPhoneNumber("");
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
      <button style={{ width: "15rem", height: "2rem" }} onClick={registerUser}>
        Register
      </button>
    </>
  );
}

export default Register;
