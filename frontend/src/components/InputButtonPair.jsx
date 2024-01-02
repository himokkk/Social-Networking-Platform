import React from 'react';
import InputButton from './InputButton';

const InputButtonPair = ({
    parentClass = "inputContainerButtons",
    tabIndex = "0",
    value1 = "",
    value2 = "",
    className1 = "inputButtonAlternative",
    className2 = "inputButton",
    type1 = "button",
    type2 = "submit",
    onClick1 = "",
    onClick2 = "",
}) => (
    <div className={parentClass}>
        <InputButton
            tabIndex={tabIndex}
            className={className1}
            type={type1}
            onClick={onClick1}
            value={value1} />
        <InputButton
            tabIndex={tabIndex}
            className={className2}
            type={type2}
            onClick={onClick2}
            value={value2} />
    </div>
);

export default InputButtonPair;
