import React, { useContext } from "react";
import AppContext from "../../context/AppContext";

function Profile() {
  const { user } = useContext(AppContext);
  return (
    <>
      <div className="container">
        <h1>{user?.name}</h1>
      </div>
    </>
  );
}

export default Profile;
