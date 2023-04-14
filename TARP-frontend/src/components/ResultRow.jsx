import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";

const ResultRow = (props) => {
  //   Title: "Title",
  //   Review_Text: "Review Text",
  //   Rating: "Rating",
  //   Location_and_Date: "Location and Date",
  //   Verified: "Verified",
  const [isExpanded, setIsExpanded] = useState(false);

  function toggleExpand() {
    setIsExpanded(!isExpanded);
  }
  return (
    <>
      <div
        className={`col-1 text-center border p-3 ${
          props.fake === "1" ? "true" : "fake"
        }`}
      >
        {props.sno}
      </div>
      <div
        className={`col-3 border text-wrap p-3 ${
          props.fake === "1" ? "true" : "fake"
        } `}
      >
        {props.title}
      </div>
      <div
        className={`col-4 collapsible-text border text-wrap p-3 ${
          props.fake === "1" ? "true" : "fake"
        } `}
      >
        <div className={`content ${isExpanded ? "expanded" : ""}`}>
          <p>{props.text}</p>
        </div>
        <div className="toggle" onClick={toggleExpand}>
          {isExpanded ? "Show less" : "Show more"}
        </div>
      </div>
      <div
        className={`col-1 d-flex py-3 text-center border justify-content-center ${
          props.fake === "1" ? "true" : "fake"
        }`}
      >
        {/* {props.rating} */}
        <ReactStars
          count={5}
          size={18}
          value={parseFloat(props.rating)}
          edit={false}
          activeColor="#ffd700"
        />
      </div>
      <div
        className={`col-2 text-center text-wrap border p-3 ${
          props.fake === "1" ? "true" : "fake"
        }`}
      >
        {props.loc}
      </div>
      <div
        className={`col-1 text-center border p-3 ${
          props.fake === "1" ? "true" : "fake"
        }`}
      >
        {props.ver}
      </div>
    </>
  );
};

export default ResultRow;
