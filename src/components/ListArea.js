import React from "react";

function ListArea(props) {
  let inputArea = null;
  if (props.checkBox) {
    inputArea = (
      <input
        className="pointer"
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
      ></input>
    );
  }
  return (
    <li className={props.checked ? "passive row" : "row"}>
      <label className={props.checkBox ? "ten columns pointer" : "ten columns"}>
        {inputArea}
        <span className="label-body">{props.value}</span>
      </label>
      <button
        className="two columns"
        style={{
          backgroundColor: "#fc7753",
          color: "#fff",
          borderColor: "#fc7753",
        }}
        onClick={props.onRemove}
      >
        {props.checkBox ? "Remove" : "Delete"}
      </button>
    </li>
  );
}

export default ListArea;
