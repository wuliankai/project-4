import React, { useState, useEffect, useContext } from "react";
import { fetchData } from "../helpers/common";
import UserContext from "../context/user";
import Entry from "./Entry";

function DiaryEntries() {
  const userCtx = useContext(UserContext);
  const [entries, setEntries] = useState([]);
  const [entryData, setEntryData] = useState("");

  const getEntries = async () => {
    const { ok, data } = await fetchData(
      "/entries",
      userCtx.accessToken,
      "GET"
    );
    if (ok) {
      console.log(data);
      setEntries(data);
    } else {
      console.log(data);
    }
  };

  const createEntry = async () => {
    const { ok, data } = await fetchData(
      "/entries",
      userCtx.accessToken,
      "POST",
      {
        entryData,
      }
    );
    if (ok) {
      console.log(data);
      console.log("Entry Added!");
      getEntries();
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    getEntries();
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
        Diaries
      </h2>
      <textarea
        value={entryData}
        style={{ width: "40rem", height: "10rem" }}
        onChange={(e) => {
          setEntryData(e.target.value);
        }}
      ></textarea>
      <button style={{ width: "10rem", height: "2rem" }} onClick={createEntry}>
        Create
      </button>
      <table
        style={{
          fontFamily: "sans-serif",
          color: "white",
          fontSize: "1rem",
        }}
      >
        <tbody>
          <tr>
            <th>Entry Id</th>
            <th>Description</th>
            <th>Options</th>
          </tr>
          {entries?.map((eachEntry) => (
            <Entry entryObj={eachEntry} getEntries={getEntries}></Entry>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default DiaryEntries;
