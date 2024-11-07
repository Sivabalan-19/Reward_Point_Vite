import React from "react";
import photo from "../../../assets/nomyevent.png";
import { Navigate, useNavigate } from "react-router-dom";

function Noevent() {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/faculty/event-enter");
  };
  return (
    <div className="main-body" style={{ flexDirection: "column" }}>
      <img src={photo} alt="" style={{ maxWidth: "50%", maxHeight: "50%" }} />
      <div>
        {" "}
        <button
          onClick={handleButtonClick}
          style={{
            height: "40px",
            width: "260px",
            display: "flex",
            marginTop: "20px",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "blue",
            borderRadius: "10px",
            border: "none",
            color: "white",
          }}
        >
          {" "}
          Create Request
        </button>
      </div>
    </div>
  );
}

export default Noevent;
