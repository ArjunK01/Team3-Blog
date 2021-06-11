import React, { useEffect, useState } from "react";
import "../styles/blog-post.css";

const MerchItem = ({ m }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    let t = m.time
      .toString()
      .substring(0, 10)
      .split("-");
    t.push(t.shift());
    setDate(t.join("/"));
    setTime(m.time.substring(11, 16));
  }, [m]);
  return (
    <div style={{ marginBottom: "24px" }}>
      <p style={{ fontWeight: "bold" }}>
        {date} - {time}
      </p>
      {m &&
        m.purchase.map(item => {
          return (
            <div
              className="post-container"
              style={{ fontWeight: "600", fontSize: "20px" }}
            >
              {item.merch_id.title}
            </div>
          );
        })}
    </div>
  );
};

export default MerchItem;
