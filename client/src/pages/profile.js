import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import "../CSS/profile.css";
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit';


function Profile(props) {

    const [User, setUser] = useState("");

    const { total, totalItems } = useSelector((state) => state.cart)

    useEffect(() => {
        const userData = sessionStorage.getItem("userdetails");

        if (userData) {
            try {
                const parsedData = JSON.parse(userData);
                setUser(parsedData.user.username);
                console.log(User)
            } catch (error) {
                console.error('Error parsing data from sessionStorage:', error);
            }
        }
    }, []);

    return (
        <div className="gradient-custom-2 mainContainer prof" style={{ marginLeft: "auto" }}>
            <MDBContainer className="py-5 h-100" >
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="9" xl="7">
                        <MDBCard>
                            <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                                <div className="ms-4 mt-5 d-flex flex-column img-visible" style={{ width: '150px' }}>
                                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                                        alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail img-visible" fluid style={{ width: '150px', zIndex: '1' }} />
                                    <MDBBtn outline color="dark" style={{ height: '36px', overflow: 'visible',border:"none" }}>
                                        <p style={{ color: 'black' }}>Edit profile</p>
                                    </MDBBtn>
                                </div>
                                <div className="ms-3" style={{ marginTop: '130px' }}>
                                    <MDBTypography tag="h5">{User}</MDBTypography>
                                    <MDBCardText>India</MDBCardText>
                                </div>
                            </div>
                            <div  className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>
                                <div className="d-flex justify-content-end text-center py-1">
                                    <div style={{ color: 'black' }}>
                                        <MDBCardText className="mb-1 h5">{totalItems}</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Cart</MDBCardText>
                                    </div>
                                    <div className="px-3" style={{ color: 'black' }}>
                                        <MDBCardText className="mb-1 h5">10</MDBCardText>
                                        <MDBCardText className="small text-muted mb-0">Purchase</MDBCardText>
                                    </div>
                                </div>
                            </div>
                            <MDBCardBody className="text-black p-4">
                                <div className="mb-5">
                                    <p style={{ color: 'black' }} className="lead fw-normal mb-1 text-black">About</p>
                                    <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>
                                        <MDBCardText className="font-italic mb-1"><p style={{ color: 'black' }} className='text-black'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p></MDBCardText>
                                    </div>
                                </div>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}


export default Profile;