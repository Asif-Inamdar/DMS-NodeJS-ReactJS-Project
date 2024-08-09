import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import getHeaders from '../globalScripst'

const DUsers = () => {
    let navigate = useNavigate();

    let [data, setData] = useState({ id: 0, name: "", email: "", mobileno: "", password: "", utype: "" });
    let [users, setUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined)

    function bind() {
        setData({ id: 0, name: "", email: "", mobileno: "", password: "", utype: "" });
        axios.get(process.env.REACT_APP_BASE_URL + "users", getHeaders())
            .then((result) => {
                if(result.data.status == "success"){
                    setUsers(result.data.data);
                     setLoading(true);
                }else{
                    alert(result.data.data)
                }
            })
            .catch((ex) => {
                setError("Uneble to Fetch User Data", ex);
                setLoading(true)
            });
    };

    useEffect(() => {
        bind();
    }, []);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

    return (
        <div className='container mt-5'>
            <p ddata-toggle="tooltip" data-placement="bottom" title="Admin/Dashboard" className="bread"><span><Link to={"/admin"}>Admin</Link></span> / <span>Users</span></p><br />
            <div className="row">
                <div className="col-lg-5">
                    <h4 className='c-dashboardInfo'>Users</h4>
                </div>
                <div className="col-lg-4"></div>
                <div className="col-lg-3">
                    <button style={{ fontSize: "12px" }} className='myBtn-dang me-2 mb-5' onClick={() => navigate(-1)}><i class="fa-solid fa-arrow-left"></i> Go Back</button>
                    <button style={{ fontSize: "12px" }} className='myBtn mb-5' onClick={() => window.location.reload()}>Refresh <i class="fa-solid fa-arrow-rotate-right"></i></button>
                </div>
            </div>

            <div className=''>
                {/* <input
                    type="text"
                    className="form-control mb-3 w-25 border-black"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                /> */}

                <div class="wrapper">
                    <div class="search">
                        <input type="text" placeholder="Search..." value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} />
                        <div class="icon">
                            <i class="fa-solid fa-magnifying-glass"></i>
                        </div>
                    </div>
                </div>
                {
                    !error
                        ?
                        <table className="table table-bordered table-striped border-primary table-hover mt-5">
                            <thead>
                                <tr className='bg-primary text-center border'>
                                    <th scope="col">Sr No</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Mobile</th>
                                    <th scope="col">Password</th>
                                    <th scope="col">Type</th>
                                </tr>
                            </thead>
                            {
                                loading
                                    ?
                                    <tbody>
                                        {filteredUsers.map((item, index) => (
                                            <tr key={index} className='text-center border'>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.mobileno}</td>
                                                <td>{item.password}</td>
                                                <td>{item.utype}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    :
                                    <div style={{ marginLeft: "250%", marginTop: "15%", width: '5rem', height: '5rem' }} className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                            }

                        </table>
                        :
                        <div className="alert alert-success">
                            <strong>{error} ! </strong><a href="" className="alert-link">Error Link</a>
                        </div>
                }
            </div>
        </div>
    )
}

export default DUsers;
