import React, { useState } from "react";
import Book from "./book";
import bookspedia from "../bookspedia";
import Buttons from "./button";

import { NavLink, useNavigate } from "react-router-dom";



function AllBooks() {

    const [item, setItem] = useState(bookspedia);

    const menuItems = [...new Set(bookspedia.map((book) => book.category))];

    const filterItem = (curcat) => {
        const newItem = bookspedia.filter((newVal) => {
            console.log(newVal.category === curcat)
            if (newVal.category === curcat) {
                return newVal
            }
        });

        setItem(newItem);
    };



    const [searchField, setSearchField] = useState("");
    const [searchShow, setSearchShow] = useState(false);


    const filteredBooks = bookspedia.filter(
        items => {
            return (
                items
                    .name
                    .toLowerCase()
                    .includes(searchField.toLowerCase())
            );

        }
    );

    const handleChange = e => {
        setSearchField(e.target.value);
        if (e.target.value === "") {
            setSearchShow(false);
        }
        else {
            setSearchShow(true);
        }
    };
    const navigate = useNavigate();
    const filtered = filteredBooks.map((item) => item.name);
    let isLogin = localStorage.getItem('islogin');


    return (
        <div id="popular-container">
            <div className="">
                <div className="srch">
                    <div className="tc ma0 pa4">
                        <div className="pa2">
                            <input
                                className="pa3 bb br3 grow b--none bg-lightest-blue ma3"
                                type="search"
                                placeholder="Search book"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <div className="featured">
                    <h1 className="aBH1">All Books</h1>

                    <Buttons
                        filterItem={filterItem}
                        setItem={setItem}
                        menuItems={menuItems}
                    />
                    <Book item={searchShow ? filteredBooks : item} />

                </div>
            </div>
        </div>
    )
}

export default AllBooks;
