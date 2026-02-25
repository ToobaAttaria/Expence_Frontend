import { useState } from "react";

function InputComponent({ Input,setInput,setInputBox, showCategory, setShowCategory }) {
    function KeyPress(e) {

        if (e.key === "Enter" && Input.trim() !== "" && !showCategory.includes(Input)) {
            setShowCategory([...showCategory, Input]);
            setInput("");
            setInputBox(false);
        }

    }
    return (
        <>
            <input
                autoFocus
                className="categoryInput"
                placeholder="Enter here"
                value={Input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={KeyPress}
            />

        </>
    );
}
export default InputComponent;