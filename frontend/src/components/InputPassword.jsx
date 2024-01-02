import React, { useState } from 'react';

const InputPassword = ({
    parentClass = "inputContainerText",
    tabIndex = "0",
    value = "",
    className = "inputBox",
    placeholder = "",
    onChange = () => {},
    onKeyDown = () => {},
    error = "",
    onFocus = () => {}
}) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSelect = (event) => {
        event.preventDefault();
      };

    return (
        <div className={parentClass}>
            <div className={"inputBoxBack"}>
                <input
                    tabIndex={tabIndex}
                    value={value}
                    className={className}
                    type={showPassword ? "text" : "password"}
                    placeholder={placeholder}
                    onChange={onChange}
                    onKeyDown={onKeyDown}
                    autoComplete="password"
                    onFocus={onFocus}
                    onSelectCapture={(ev) => handleSelect(ev)}
                />
                <i className="inputIcon prevent-select" onClick={handleTogglePassword}>
                    {showPassword ? '🙈' : '👁️'}
                </i>
            </div>
            <label className="errorLabel">{error}</label>
        </div>
    );
};

export default InputPassword;
