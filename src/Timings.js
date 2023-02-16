import "./Timings.css";
import { useState } from "react";

function Timings(props) {
  const handleChange = (event) => {
    props.setTiming(event.target.value);
    console.log("Now selected " + event.target.value);
  };

  return (
    <div className="timings-choice-panel">
      {props.timings.map((timing, index) => {
        return (
          <label
            key={timing}
            className={"timing-radio-button"}
            for={timing + "-radio"}
            id={
              index == 0
                ? "first-label"
                : index == props.timings.length - 1
                ? "last-label"
                : ""
            }
          >
            <input
              type="radio"
              value={timing}
              id={timing + "-radio"}
              name="timing-radio"
              checked={timing === props.value}
              onChange={handleChange}
            />
            {timing}
          </label>
        );
      })}
    </div>
  );
}

export default Timings;
