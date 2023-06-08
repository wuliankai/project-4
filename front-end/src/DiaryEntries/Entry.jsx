import React, { useState, useEffect, useContext } from "react";
import { fetchData } from "../helpers/common";
import UserContext from "../context/user";

function Entry(props) {
  const userCtx = useContext(UserContext);
  const { entryObj, getEntries } = props;

  const [editMode, setEditMode] = useState(false);
  const [entryData, setEntryData] = useState(false);
  const [entryDescription, setEntryDescription] = useState("");

  const saveEntry = async () => {
    const { ok, data } = await fetchData(
      "/entries/" + entryObj.id,
      userCtx.accessToken,
      "PUT",
      {
        entryData,
      }
    );
    if (ok) {
      console.log(data);
      console.log("Entry updated!");
      setEntryDescription(entryData);
      entryObj.entry = entryData;
      setEditMode(false);
    } else {
      console.log(data);
    }
  };

  const deleteEntry = async () => {
    const { ok, data } = await fetchData(
      "/entries/" + entryObj.id,
      userCtx.accessToken,
      "DELETE"
    );
    if (ok) {
      console.log(data);
      console.log("Entry deleted!");
      getEntries();
    } else {
      console.log(data);
    }
  };

  useEffect(() => {
    console.log(entryObj);
    setEntryDescription(entryObj.entry);
    setEntryData(entryObj.entry);
    console.log("EditMode=>", editMode);
  }, []);

  return (
    <>
      {editMode === true && (
        <tr>
          <td>{entryData.id}</td>
          <td>
            <textarea
              value={entryData}
              style={{ width: "20rem", height: "5rem" }}
              onChange={(e) => {
                setEntryData(e.target.value);
              }}
            ></textarea>
          </td>
          <td>
            <button
              style={{ width: "10rem", height: "2rem" }}
              onClick={saveEntry}
            >
              Save
            </button>
          </td>
        </tr>
      )}
      {editMode === false && (
        <tr>
          <td>{entryData.id}</td>
          <td>{entryDescription}</td>
          <td>
            <button
              style={{ width: "10rem", height: "2rem" }}
              onClick={() => {
                setEditMode(true);
                setEntryData(entryObj.entry);
              }}
            >
              Edit
            </button>
            <button
              style={{ width: "10rem", height: "2rem" }}
              onClick={deleteEntry}
            >
              Delete
            </button>
          </td>
        </tr>
      )}
    </>
  );
}

export default Entry;
