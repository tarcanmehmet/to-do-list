import React from "react";

function InputArea(props) {
  return (
    <input
      className="u-full-width"
      type="text"
      onKeyUp={props.onEnter}
      value={props.value}
      onChange={props.onChange}
      placeholder="Start filling your ~to-do~ list then hit enter for magic"
    ></input>
  );
}

export default InputArea;
