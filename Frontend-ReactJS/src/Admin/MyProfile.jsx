import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const MyProfile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [list, setList] = useState([]);
    const [data, setData] = useState({ id: 0, image: null });

    useEffect(() => {
        const userData = localStorage.getItem("user");
        if (userData) {
            setUser(JSON.parse(userData));
            bind();
        } else {
            navigate("/login");
        }
    }, [navigate]);

    function handleFileChange(e) {
        e.preventDefault();
        setData({ ...data, image: e.target.files[0] });
    }

    function handleSave(e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", data.image);
    
        const request = data.id === 0 
            ? axios.post(`${process.env.REACT_APP_BASE_URL}userprofileimage`, formData) 
            : axios.put(`${process.env.REACT_APP_BASE_URL}userprofileimage/${data.id}`, formData);
    
        request
            .then(() => {
                bind();
                setData({ id: 0, image: null });
                toast.success(data.id === 0 ? 'Profile Image Added' : 'Profile Image Updated', { position: "top-right", autoClose: 2000 });
            })
            .catch(handleError);
    }

    function bind() {
        axios.get(`${process.env.REACT_APP_BASE_URL}userprofileimage`)
            .then((result) => {
                setList(result.data.data);
                console.log("API Response: ", result.data.data);
            })
            .catch(handleError);
    }

    const handleDelete = (id) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}userprofileimage/${id}`)
        .then(() => {
            bind();
            toast.success('Profile Image Deleted', { position: "top-right", autoClose: 2000 });
        })
        .catch(handleError);
}


    function handleError(ex) {
        let errorMsg = 'An unexpected error occurred.';
        if (ex.response) {
            errorMsg = ex.response.data.message || `Error: ${ex.response.status}`;
            console.error("Response data:", ex.response.data);
            console.error("Response status:", ex.response.status);
            console.error("Response headers:", ex.response.headers);
        } else if (ex.request) {
            console.error("Request data:", ex.request);
            errorMsg = 'No response received from the server.';
        } else {
            console.error('Error message:', ex.message);
            errorMsg = `Error: ${ex.message}`;
        }
        console.error("Error config:", ex.config);
        toast.error(errorMsg, { position: "top-right", autoClose: 2000 });
    }

    return (
        <div className="container emp-profile">
            <form method="post">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            {list.length > 0 && list[0].imagepath ? (
                                <img width={40} src={`${process.env.REACT_APP_BASE_URL}${list[0].imagepath}`} alt="User Profile" />
                            ) : (
                                <p>No Image Available</p>
                            )}
                            <div className="file btn btn-lg btn-primary mt-3">
                                Change Photo 
                                <input type="file" onChange={handleFileChange} name="file" id='image' accept='image/*' />
                            </div>
                        </div>
                        <button className='myBtn-succ' onClick={handleSave}>{data.id === 0 ? 'Save' : 'Update'}</button>
                        <button className='myBtn-dang ms-1' onClick={() => handleDelete(data.id)}>Delete</button>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5>{user.name}</h5>
                            <h6>{user.utype}</h6>
                            <p className="proile-rating">RANKINGS : <span>8/10</span></p>
                            <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item">
                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Timeline</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <input type="button" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                        <br />
                        <br />
                        <input type="button" className="profile-edit-btn" name="btnExit" value="Exit Page" onClick={() => navigate(-1)} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-work">
                            <p>WORK LINK</p>
                            <a href="#">Website Link</a><br />
                            <a href="#">Bootsnipp Profile</a><br />
                            <a href="#">Bootply Profile</a>
                            <p>SKILLS</p>
                            <a href="#">Web Designer</a><br />
                            <a href="#">Web Developer</a><br />
                            <a href="#">WordPress</a><br />
                            <a href="#">WooCommerce</a><br />
                            <a href="#">PHP, .Net</a><br />
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="tab-content profile-tab" id="myTabContent">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>User Id</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{user.id}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Name</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{user.name}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Email</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{user.email}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Phone</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{user.mobileno}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Profession</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>Web Developer and Designer</p>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Experience</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>Expert</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Hourly Rate</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>$10/hr</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Total Projects</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>230</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>English Level</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>Expert</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Availability</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>6 months</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <label>Your Bio</label><br />
                                        <p>Your detailed description</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default MyProfile;
