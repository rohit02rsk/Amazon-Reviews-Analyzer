import React from "react";

const FeatureCard = (props) => {
  return (
    <div className="badge bg-light border text-secondary rounded-3 py-2 px-3">
      <div className="mb-1">{props.name}</div>
      <div
        className={`feature-polarity ${
          props.sum < 0
            ? "text-danger"
            : props.sum === "0"
            ? "text-warning"
            : "text-success"
        }`}
      >
        {(props.sum / props.count).toFixed(2)}
      </div>
      {/* <div className="progress mb-1">
        <div
          className="progress-bar bg-success"
          role="progressbar"
          style={{ width: `${(props.sum / props.count).toFixed(2) * 100}%` }}
          aria-valuenow=""
          aria-valuemin="-1"
          aria-valuemax="1"
        ></div>
      </div> */}
    </div>
  );
};

export default FeatureCard;
