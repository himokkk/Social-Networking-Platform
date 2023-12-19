import React from 'react';

const InputButton = ({
    tabIndex = "0",
    value = "",
    className = "inputButton",
    type = "button",
    onClick = "",
}) => (
    <input
        tabIndex={tabIndex}
        className={className}
        type={type}
        onClick={onClick}
        value={value} />
);

export default InputButton;
