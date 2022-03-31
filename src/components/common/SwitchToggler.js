import React from "react";

const SwitchToggler = ({ text, checked, onChange, id }) => {
  return (
    <ul className="tg-list">
      <li className="tg-list-item">
        <input
          className="tgl tgl-light"
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <label className="tgl-btn" htmlFor={id}></label>
        <h4>{text}</h4>
      </li>
    </ul>
  );
};

export default SwitchToggler;
