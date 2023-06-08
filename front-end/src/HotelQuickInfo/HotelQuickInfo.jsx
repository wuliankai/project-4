import React, { useState } from "react";

function HotelQuickInfo() {
  const [hotelName, setHotelName] = useState("");
  const [hotelLocation, setHotelLocation] = useState("");
  return (
    <>
      <h2
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          color: "white",
          fontSize: "2rem",
        }}
      >
        Hotel
      </h2>
      <input
        placeholder="Hotel name"
        value={hotelName}
        onChange={(e) => {
          setHotelName(e.target.value);
        }}
      ></input>

      <input
        placeholder="Hotel location"
        value={hotelLocation}
        onChange={(e) => {
          setHotelLocation(e.target.value);
        }}
      ></input>
    </>
  );
}

export default HotelQuickInfo;
