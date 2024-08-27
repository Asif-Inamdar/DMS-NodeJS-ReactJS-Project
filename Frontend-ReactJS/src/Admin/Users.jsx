import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getHeaders from '../globalScripst'

const Users = () => {
    let navigate = useNavigate();

    let [data, setData] = useState({ id: 0, name: "", email: "", mobileno: "", password: "", utype: "" });
    let [users, setUsers] = useState([]);
    let [editMode, setEditMode] = useState(false);
    let [editId, setEditId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined)
    const [searchTerm, setSearchTerm] = useState('');

    function handleChange(e) {
        setData({ ...data, [e.target.id]: e.target.value });
    }

    function handleSave() {
        if (editMode) {
            axios.put(`${process.env.REACT_APP_BASE_URL}users/${editId}`, data, getHeaders())
                .then((result) => {
                    console.log(result);
                    bind();
                    exitEditMode();
                    toast.success('User Details Update', { position: "top-right", autoClose: 2000 });
                })
                .catch((ex) => {
                    console.log(ex);
                });
        } else {
            axios.post(`${process.env.REACT_APP_BASE_URL}users`, data, getHeaders())
                .then((result) => {
                    console.log(result);
                    bind();
                    setData({ id: 0, name: "", email: "", mobileno: "", password: "", utype: "" });
                    toast.success('New User Add', { position: "top-right", autoClose: 2000 });
                })
                .catch((ex) => {
                    console.log(ex);
                });
        }
    }

    const enterEditMode = (id) => {
        setEditMode(true);
        setEditId(id);
        const userToEdit = users.find(user => user.id === id);
        if (userToEdit) {
            setData({ ...userToEdit });
        }
    };

    const exitEditMode = () => {
        setEditMode(false);
        setEditId(null);
        setData({ id: 0, name: "", email: "", mobileno: "", password: "", utype: "" });
    };

    function bind() {
        axios.get(`${process.env.REACT_APP_BASE_URL}users`, getHeaders())
            .then((result) => {
                if(result.data.status === "success"){
                    setUsers(result.data.data);
                    setLoading(true);
                }else{
                    alert(result.data.data);
                }
            })
            .catch((ex) => {
                setError("Unable to Fetch Product Data");
                setLoading(true);
            });
    }

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}users/${id}`, getHeaders())
            .then((result) => {
                console.log(result);
                bind();
                toast.success('Delete User', { position: "top-right", autoClose: 2000 });
            })
            .catch((ex) => {
                console.error('Error deleting item:', ex);
            });
    };

    useEffect(() => {
        bind();
    }, []);

    // Filter the users based on the search term
    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.mobileno.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.utype.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='container mt-5'>
            <ToastContainer />
            <p ddata-toggle="tooltip" data-placement="bottom" title="Admin/Dashboard" className="bread">
                <span><Link to={"/admin"}>Admin</Link></span> / <span>Users</span>
            </p><br />

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
            <div class="wrapper">
                <div class="search">
                    <input type="text" placeholder="Search..." value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    <div class="icon">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
            </div>

            <div className='mt-4 border p-4 mb-5'>
                <div className="row">
                    <div className="col-lg-4">
                        <label htmlFor="name">Name</label>
                        <input className='w-100 form-control mt-4' type="text" placeholder='Name' id='name' value={data.name} onChange={handleChange} />
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="email">Email</label>
                        <input type="text" className='form-control mt-4 w-100' id='email' placeholder='Email' value={data.email} onChange={handleChange} />
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="mobileno">Mobile</label>
                        <input type="text" className='form-control mt-4 w-100' id='mobileno' placeholder='Mobile' value={data.mobileno} onChange={handleChange} />
                    </div>
                    <div className="col-lg-4">
                        <label className='mt-4' htmlFor="password">Password</label>
                        <input className='w-100 form-control mt-3' type="password" placeholder='Password' id='password' value={data.password} onChange={handleChange} />
                    </div>
                    <div className="col-lg-4">
                        <label className='mt-4' htmlFor="utype">User Type</label>
                        <input className='w-100 form-control mt-3' type="text" placeholder='User Type' id='utype' value={data.utype} onChange={handleChange} />
                    </div>

                    <div className='mt-4'>
                        <button style={{fontSize:"12px"}} className='myBtn-succ me-2' onClick={handleSave}>{editMode ? 'Update' : 'Save'}</button>
                        <button style={{fontSize:"12px"}} className='myBtn-dang' onClick={exitEditMode}>Cancel</button>
                    </div>
                </div>
            </div>

            <div className=''>
                {
                    !error
                        ?
                        <table className="table table-bordered table-striped border-primary table-hover">
                            <thead>
                                <tr className='bg-primary text-center border form-control-sm'>
                                    <th scope="col">Sr No</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">EMAIL</th>
                                    <th scope="col">MOBILE</th>
                                    <th scope="col">PASSWORD</th>
                                    <th scope="col">U'TYPE</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            {
                                loading
                                    ?
                                    <tbody>
                                        {filteredUsers.map((item, index) => (
                                            <tr className='text-center border' key={item.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.mobileno}</td>
                                                <td>{item.password}</td>
                                                <td>{item.utype}</td>
                                                <td>
                                                    <button style={{fontSize:"12px"}} className='myBtn-Edit' onClick={() => enterEditMode(item.id)}>Edit</button>
                                                    <button style={{fontSize:"12px"}} className='myBtn-dang-Delete ms-1' onClick={() => handleDelete(item.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    :
                                    <div style={{ marginLeft: "290%", marginTop: "45%", width: '5rem', height: '5rem' }} className="spinner-border text-primary" role="status">
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
    );
}

export default Users;
