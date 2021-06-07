import React from "react";

const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        height: "100vh",
        width: "100%",
        backgroundColor: "#1d4270",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        class="spinner-border text-light"
        style={{ marginTop: "-64px" }}
        role="status"
      ></div>
    </div>
  );
};

export default Loading;
