import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import getHeaders from '../globalScripst'

const Units = () => {
    let navigate = useNavigate();

    // State variables
    const [data, setData] = useState({ id: 0, name: "" });
    const [units, setUnits] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);
    const [selectedUnit, setSelectedUnit] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined)

    // Function to handle form submission (save or update)
    const handleSave = () => {
        if (editMode) {
            axios.put(`${process.env.REACT_APP_BASE_URL}units/${editId}`, data, getHeaders())
                .then((result) => {
                    console.log(result);
                    bind();
                    exitEditMode();
                })
                .catch((ex) => {
                    console.log(ex);
                });
        } else {
            // Add new unit
            axios.post(`${process.env.REACT_APP_BASE_URL}units`, data, getHeaders())
                .then((result) => {
                    console.log(result);
                    bind();
                    setData({ id: 0, name: "" });
                })
                .catch((ex) => {
                    console.log(ex);
                });
        }
    };

    // Function to enter edit mode
    const enterEditMode = (id) => {
        setEditMode(true);
        setEditId(id);
        const unitToEdit = units.find(unit => unit.id === id);
        if (unitToEdit) {
            setSelectedUnit(unitToEdit);
            setData({ ...unitToEdit });
        }
    };

    // Function to exit edit mode
    const exitEditMode = () => {
        setEditMode(false);
        setEditId(null);
        setSelectedUnit(null);
        setData({ id: 0, name: "" });
    };

    // Function to fetch units data
    const bind = () => {
        setData({id:0, name:"",});
        
        axios.get(`${process.env.REACT_APP_BASE_URL}units`,getHeaders()).then((result) => {
        if(result.data.status == "success"){
            setUnits(result.data.data);
             setLoading(true);
        }else{
            alert(result.data.data)
        }
               
            })
            .catch((ex) => {
                setError("Unable to Fetch Product Data", ex)
                setLoading(true);
            });
    };

    // Function to handle unit deletion
    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}units/${id}`,getHeaders())
            .then((result) => {
                console.log(result);
            })
            .catch((ex) => {
                console.log(ex);
            });
    };

    // useEffect to load units data initially
    useEffect(() => {
        bind();
    }, []);

    // Handler for input field change
    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div className='container mt-5'>
            {/* Breadcrumb */}
            <p data-toggle="tooltip" data-placement="bottom" title="Admin/Dashboard" className="bread">
                <span><Link to={"/admin"}>Admin</Link></span> / <span>Units</span>
            </p><br />

            {/* Header and Back Button */}
            <div className="row">
                <div className="col-lg-5">
                    <h4 className='c-dashboardInfo'>Units</h4>
                </div>
                <div className="col-lg-4"></div>
                <div className="col-lg-3">
                    <button style={{ fontSize: "12px" }} className='myBtn-dang me-2 mb-5' onClick={() => navigate(-1)}><i class="fa-solid fa-arrow-left"></i> Go Back</button>
                    <button style={{ fontSize: "12px" }} className='myBtn mb-5' onClick={() => window.location.reload()}>Refresh <i class="fa-solid fa-arrow-rotate-right"></i></button>
                </div>
            </div>

            {/* Form Section */}
            <div className="row p-3 mb-4 bg-light border">
                <div className="col-lg-12">
                    <input
                        className='form-control'
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleInputChange}
                        placeholder="Enter unit name"
                    />
                    <div className='mt-3'>
                        <button style={{fontSize:"12px"}} className='myBtn-succ' onClick={handleSave}>{editMode ? 'Update' : 'Save'}</button>
                        <button style={{fontSize:"12px"}} className='myBtn-dang ms-1' onClick={exitEditMode}>Cancel</button>
                    </div>
                </div>
            </div>

            {/* Units Table */}
            <div className=''>
                {
                    !error
                        ?
                        <table className="table table-bordered table-striped border-primary table-hover">
                            <thead>
                                <tr className='bg-primary text-center border form-control-sm'>
                                    <th scope="col">Sr No</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            {
                                loading
                                    ?
                                    <tbody>
                                        {units.map((item, index) => (
                                            <tr className='text-center border' key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.name}</td>
                                                <td>
                                                    <button style={{fontSize:"12px"}} className='myBtn-Edit' onClick={() => enterEditMode(item.id)}>Edit</button>
                                                    <button style={{fontSize:"12px"}} className='myBtn-dang-Delete ms-1' onClick={() => handleDelete(item.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    :
                                    <div style={{ marginLeft: "100%", marginTop: "15%", width: '5rem', height: '5rem' }} className="spinner-border text-primary" role="status">
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
};

export default Units;
