import React from 'react';
import InputButton from './InputButton';

const InputButtonPair = ({
    parentClass = "inputContainerButtons",
    tabIndex = "0",
    value1 = "",
    value2 = "",
    className1 = "inputButtonAlternative",
    className2 = "inputButton",
    type = "button",
    onClick1 = "",
    onClick2 = "",
}) => (
    <div className={parentClass}>
        <InputButton
            tabIndex={tabIndex}
            className={className1}
            type={type}
            onClick={onClick1}
            value={value1} />
        <InputButton
            tabIndex={tabIndex}
            className={className2}
            type={type}
            onClick={onClick2}
            value={value2} />
    </div>
);

export default InputButtonPair;
