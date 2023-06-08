import React, { useEffect, useState } from "react";
import { fetchData } from "../helpers/common";

function FlightsQuickInfo() {
  const [toHomeFlightNumber, setToHomeFlightNumber] = useState("SQ701");
  const [toHomeFlightAirport, setToHomeFlightAirport] = useState(
    "Don Mueang International"
  );
  const [toHomeFlightDateAndTime, setToHomeFlightDateAndTime] = useState("");

  const [toDestFlightNumber, setToDestFlightNumber] = useState("SQ714");
  const [toDestFlightAirport, setToDestFlightAirport] =
    useState("Changi Airport");
  const [toDestFlightDateAndTime, setToDestFlightDateAndTime] = useState("");

  const handleToHomeFlightData = async () => {
    const { ok, data } = await fetchData(
      "/flight_to_home_data",
      undefined,
      "POST",
      {
        toHomeFlightNumber,
        toHomeFlightAirport,
        toHomeFlightDateAndTime,
      }
    );
    if (ok) {
      console.log("Flight to home saved!");
    } else {
      console.log(data);
    }
  };

  const getToHomeFlightData = async () => {
    const { ok, data } = await fetchData(
      "/flight_to_home_data",
      undefined,
      "GET"
    );
    if (ok) {
      setToHomeFlightNumber(data[0].flight_number);
      setToHomeFlightAirport(data[0].airport);
      setToHomeFlightDateAndTime(data[0].date_time);
    } else {
      console.log(data);
    }
  };

  const handleToDestFlightData = async () => {
    const { ok, data } = await fetchData(
      "/flight_to_dest_data",
      undefined,
      "POST",
      {
        toDestFlightNumber,
        toDestFlightAirport,
        toDestFlightDateAndTime,
      }
    );
    if (ok) {
      console.log("Flight to dest saved!");
    } else {
      console.log(data);
    }
  };

  const getToDestFlightData = async () => {
    const { ok, data } = await fetchData(
      "/flight_to_dest_data",
      undefined,
      "GET"
    );
    if (ok) {
      setToDestFlightNumber(data[0].flight_number);
      setToDestFlightAirport(data[0].airport);
      setToDestFlightDateAndTime(data[0].date_time);
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    getToHomeFlightData();
    getToDestFlightData();
  }, []);

  return (
    <>
      {/* "Flights" header */}
      <h2
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          color: "white",
          fontSize: "3rem",
        }}
      >
        Flights
      </h2>

      {/* "Flights to desti" header */}
      <p
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          color: "white",
          fontSize: "2rem",
        }}
      >
        {" "}
        Flight to destination{" "}
      </p>
      <input
        placeholder="Flight number"
        style={{ width: "20rem", height: "2rem" }}
        value={toDestFlightNumber}
        onChange={(e) => {
          setToDestFlightNumber(e.target.value);
        }}
      ></input>
      <input
        placeholder="Airport"
        style={{ width: "20rem", height: "2rem" }}
        value={toDestFlightAirport}
        onChange={(e) => {
          setToDestFlightAirport(e.target.value);
        }}
      ></input>
      <input
        type="datetime-local"
        style={{ width: "20rem", height: "2rem" }}
        value={toDestFlightDateAndTime}
        onChange={(e) => {
          setToDestFlightDateAndTime(e.target.value);
        }}
      ></input>
      <button onClick={handleToDestFlightData}>Enter</button>
      <p
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          color: "white",
          fontSize: "1rem",
        }}
      >
        {toDestFlightNumber}
      </p>
      <p
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          color: "white",
          fontSize: "1rem",
        }}
      >
        {toDestFlightAirport}
      </p>
      <p
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          color: "white",
          fontSize: "1rem",
        }}
      >
        {toDestFlightDateAndTime}
      </p>

      {/* Flight to home header */}
      <p
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          color: "white",
          fontSize: "2rem",
        }}
      >
        Flight to home{" "}
      </p>
      <br />
      <input
        placeholder="Flight number"
        style={{ width: "20rem", height: "2rem" }}
        value={toHomeFlightNumber}
        onChange={(e) => {
          setToHomeFlightNumber(e.target.value);
        }}
      ></input>
      <input
        placeholder="Airport"
        style={{ width: "20rem", height: "2rem" }}
        value={toHomeFlightAirport}
        onChange={(e) => {
          setToHomeFlightAirport(e.target.value);
        }}
      ></input>
      <input
        type="datetime-local"
        style={{ width: "20rem", height: "2rem" }}
        value={toHomeFlightDateAndTime}
        onChange={(e) => {
          setToHomeFlightDateAndTime(e.target.value);
        }}
      ></input>
      <button onClick={handleToHomeFlightData}>Enter</button>
      <p
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          color: "white",
          fontSize: "1rem",
        }}
      >
        {toHomeFlightNumber}
      </p>
      <p
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          color: "white",
          fontSize: "1rem",
        }}
      >
        {toHomeFlightAirport}
      </p>
      <p
        style={{
          fontFamily: "'Tsukimi Rounded', sans-serif",
          color: "white",
          fontSize: "1rem",
        }}
      >
        {toHomeFlightDateAndTime}
      </p>
      <hr />
    </>
  );
}
export default FlightsQuickInfo;
