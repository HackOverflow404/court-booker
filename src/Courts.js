import "./Courts.css";
import { useState } from "react";

function Courts(props) {

  function handleChange(event) {
    props.setCourt(event.target.value);
    props.setSelectedTiming("");
    console.log("Now selected " + event.target.value);
  };

  return (
    <div className="courts-choice-panel">
      {props.courts.map((court, index) => {
        return (
          <label
            key={court}
            className={"court-radio-button"}
            for={court + "-radio"}
            id={
              index == 0
                ? "first-label"
                : index == props.courts.length - 1
                ? "last-label"
                : ""
            }
          >
            <input
              type="radio"
              value={court}
              id={court + "-radio"}
              name="court-radio"
              checked={court === props.value}
              onChange={handleChange}
            />
            {court}
          </label>
        );
      })}
    </div>
  );
}

export default Courts;
