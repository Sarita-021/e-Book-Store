import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom"
import axios from "axios"
import toast from "react-hot-toast";

function AddBooks(props) {

    const navigate = useNavigate();
    const inputFile = useRef(null);
    const [selectedFile, setSelectedFile] = useState('');

    //Constants for storig input variables
    const [inputs, setInputs] = useState({
        bName: '',
        bGenre: '',
        pLink: ''
    })

    //Handling Change while inputing data
    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            return alert('Please select a file to upload.');
        }

        const formData = new FormData();
        formData.append('bName', inputs.bName);
        formData.append('bGenre', inputs.bGenre);
        formData.append('pLink', inputs.pLink);
        formData.append('file', selectedFile);
        for (const value of formData.values()) {
            console.log(value);
        }

        try {
            // https://e-book-store-bsk3.vercel.app/addBooks
            const response = await axios.post('https://e-book-store-ten.vercel.app/api/v1/user/uploadBook', formData, {
                withCredentials: true, headers: { 'Content-Type': 'multipart/form-data' }
            });
            if (inputFile.current) {
                inputFile.current.value = "";
                inputFile.current.type = "text";
                inputFile.current.type = "file";
            }
            setInputs({
                bName: '',
                bGenre: '',
                pLink: ''
            })
            console.log(response.data.success);
            console.log(response.success);
            if (response.data.success) {
                toast.success("Book added Successfully");
            }
            else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Upload error:', error);
        }
    };



    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data" className="form">
            <div className="">
                <h3>Add Books to DB</h3>
                <label className="label" htmlFor="bName">Book Name</label>
                <input className="input" onChange={handleChange} value={inputs.bName} type="text" placeholder="" id="bName" name="bName" />
                <label className="label" htmlFor="bGenre">Book Genre</label>
                <input className="input" onChange={handleChange} value={inputs.bGenre} type="text" placeholder="" id="bGenre" name="bGenre" />
                <label className="label" htmlFor="pLink">Purchase Link</label>
                <input className="input" onChange={handleChange} value={inputs.pLink} type="text" placeholder="" id="pLink" name="pLink" />
                <h6 style={{ paddingTop: "14px", fontSize: "16px" }}>Upload Book's cover image</h6>
                <input
                    type="file"
                    name="file"
                    id="file"
                    className="custom-file-input input"
                    onChange={handleFileChange}
                    ref={inputFile}
                />
                {/* <label htmlFor="file" className="custom-file-label">
                    {selectedFile ? selectedFile.name : 'Choose File'}
                </label> */}
                <button className="btn" type="submit" >Add Book</button>
            </div>
        </form>
    )
}

export default AddBooks;