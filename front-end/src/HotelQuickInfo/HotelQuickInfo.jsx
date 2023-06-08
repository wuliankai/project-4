import React, { useEffect, useState } from "react";
import { fetchData } from "../helpers/common";

function HotelQuickInfo() {
  const [hotelName, setHotelName] = useState("Four Seasons Hotel Bangkok");
  const [hotelLocation, setHotelLocation] = useState(
    "300 Charoen Krung Road, Sathorn, Bangkok Riverside, Bangkok, Thailand, 10120"
  );
  const handleHotelInfo = async () => {
    const { ok, data } = await fetchData("/hotel_data", undefined, "POST", {
      hotelName,
      hotelLocation,
    });
    if (ok) {
      console.log(data);
      console.log("Hotel data saved!");
    } else {
      console.log(data);
    }
  };

  const getHotelInfo = async () => {
    const { ok, data } = await fetchData("/hotel_data", undefined, "GET");
    if (ok) {
      setHotelName(data[0].name);
      setHotelLocation(data[0].location);
    } else console.log(data);
  };

  useEffect(() => {
    getHotelInfo();
  }, []);

  return (
    <>
      <h2
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          color: "white",
          fontSize: "3rem",
        }}
      >
        Hotel
      </h2>
      <input
        placeholder="Hotel name"
        value={hotelName}
        style={{ width: "20rem", height: "2rem" }}
        onChange={(e) => {
          setHotelName(e.target.value);
        }}
      ></input>
      <input
        placeholder="Hotel location"
        value={hotelLocation}
        style={{ width: "20rem", height: "2rem" }}
        onChange={(e) => {
          setHotelLocation(e.target.value);
        }}
      ></input>
      <button
        style={{ width: "10rem", height: "2rem" }}
        onClick={handleHotelInfo}
      >
        Input Hotel Details
      </button>{" "}
      <br />
      <p
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          color: "white",
          fontSize: "2rem",
        }}
      >
        {hotelName}
      </p>
      <p
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          color: "white",
          fontSize: "2rem",
        }}
      >
        {hotelLocation}
      </p>
      <hr />
    </>
  );
}

export default HotelQuickInfo;
