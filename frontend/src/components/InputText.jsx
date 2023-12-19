import React from 'react';

const InputText = ({
    parentClass = "inputContainerText",
    tabIndex = "0",
    value = "",
    className = "inputBox",
    type = "text",
    placeholder = "",
    onChange = "",
    onKeyDown = "",
    error = "",
    autoComplete = "username",
    onFocus = () => {}
}) => (
    <div className={parentClass}>
        <input
            tabIndex={tabIndex}
            value={value}
            className={className}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            onKeyDown={onKeyDown}
            autoComplete={autoComplete}
            onFocus={onFocus}
        />
        <label className="errorLabel">{error}</label>
    </div>
);

export default InputText;
