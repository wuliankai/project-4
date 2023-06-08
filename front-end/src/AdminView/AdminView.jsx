import React, { useEffect, useState } from "react";
import { fetchData } from "../helpers/common";

function AdminView() {
  const [allUsers, setAllUsers] = useState([]);
  const getAllUsers = async () => {
    const { ok, data } = await fetchData("/users", undefined, "GET");
    if (ok) {
      console.log(allUsers);
      setAllUsers(data);
      console.log("All users get");
    } else {
      console.log("wtf");
    }
  };

  const deleteOneUser = async (userID) => {
    console.log(userID);
    const { ok, data } = await fetchData(
      `/users/${userID}`,
      undefined,
      "DELETE"
    );
    if (ok) {
      getAllUsers();
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div>
      {allUsers
        ?.filter((eachUser) => {
          return !eachUser.is_admin;
        })
        .map((eachUser) => (
          <div
            key={eachUser.id}
            style={{
              fontFamily: "'Tsukimi Rounded', sans-serif",
              color: "white",
              fontSize: "2rem",
            }}
          >
            {eachUser.name}

            <button
              key={eachUser.id + ".1"}
              value={eachUser.id}
              style={{ width: "5rem", height: "2rem" }}
              onClick={(e) => {
                deleteOneUser(e.target.value);
              }}
            >
              Delete
            </button>
            <hr style={{ width: "20rem" }} />
          </div>
        ))}
    </div>
  );
}

export default AdminView;
