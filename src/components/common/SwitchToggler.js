import React from "react";

const SwitchToggler = ({ text, checked, onChange, id }) => {
  return (
    <ul class="tg-list">
      <li class="tg-list-item">
        <input
          class="tgl tgl-light"
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />
        <label class="tgl-btn" htmlFor={id}></label>
        <h4>{text}</h4>
      </li>
    </ul>
  );
};

export default SwitchToggler;
