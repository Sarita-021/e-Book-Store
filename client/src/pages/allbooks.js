import React, { useState } from "react";
import Book from "./book";
import Buttons from "./button";
import { useEffect } from 'react';
import axios from 'axios';

import { NavLink, useNavigate } from "react-router-dom";

function AllBooks() {

    const [item, setItem] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get('https://e-book-store-ten.vercel.app/api/v1/user/all-books');
                setItem(data);
                setData(data);
                console.log(item)
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);

    const menuItems = [...new Set(data.map((Va) => Va.metadata.bGenre))];


    const filterItem = (curcat) => {
        const newItem = data.filter((newVal) => {
            if (newVal.metadata.bGenre === curcat) {
                return newVal
            }
        });

        setItem(newItem);
    };

    const [searchField, setSearchField] = useState("");
    const [searchShow, setSearchShow] = useState(false);

    // search
    const searchBooks = data.filter(
        items => {
            return (
                items
                    .metadata.bName
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
    const filtered = searchBooks.map((item) => item.metadata.bName);
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
                        data={data}
                    />
                    <Book item={searchShow ? searchBooks : item} />

                </div>
            </div>
        </div>
    )
}

export default AllBooks;
