import React from "react";
import bookspedia from "../bookspedia";


const Buttons = ({ filterItem, setItem, menuItems }) => {
    return (
        <>
            <div className="d-flex filterBtn">
                {menuItems.map((Val, id) => {
                    return (
                        <button
                            className="btn "
                            onClick={() => filterItem(Val)}
                            key={id}
                        >
                            {Val}
                        </button>
                    );
                })}
                <button
                    className="btn"
                    onClick={() => setItem(bookspedia)}
                >
                    All
                </button>
            </div>
        </>
    );
};

export default Buttons;