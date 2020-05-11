import React from "react";

function ListArea(props) {
  return (
    <li className={props.checked ? "passive row" : "row"}>
      <label className="ten columns pointer">
        <input
          className="pointer"
          type="checkbox"
          checked={props.checked}
          onChange={props.onChange}
        ></input>
        <span className="label-body">{props.value}</span>
      </label>
      <button className="two columns" onClick={props.onRemove}>
        Remove
      </button>
    </li>
  );
}

export default ListArea;
