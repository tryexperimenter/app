import React from "react";

const Toggle = ({isOn, setIsOn, label}) => {

    return (
        <label className="flex items-center">
            <input
            type="checkbox"
            checked={isOn}
            onChange={() => setIsOn(!isOn)}
            className="form-checkbox h-4 w-4 text-indigo-600 transition duration-150 ease-in-out"
            />
            <span className="ml-2 text-sm leading-5">
            {label}
            </span>
        </label>
    )
}

export { Toggle }