import React from "react";


const Buttons = ({ filterItem, setItem, menuItems, data }) => {

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
                    onClick={() => setItem(data)}
                >
                    All
                </button>
            </div>
        </>
    );
};

export default Buttons;