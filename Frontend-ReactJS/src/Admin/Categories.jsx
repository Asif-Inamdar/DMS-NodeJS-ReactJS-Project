import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import getHeaders from '../globalScripst'

const Categories = () => {

    let navigate = useNavigate();

    // State variables
    const [data, setData] = useState({ id: 0, name: "" });
    const [categories, setCategories] = useState([]);
    const [editingCategoryId, setEditingCategoryId] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined)


    // Function to handle form submission
    const handleSave = (e) => {
        e.preventDefault();
        // let formdata = new FormData();
        // formdata.append("id", data.id);
        // formdata.append("name", data.name);
        axios.post(process.env.REACT_APP_BASE_URL + "categories", data, getHeaders())
            .then((result) => {
                console.log(result);
                // Refresh categories list after saving
                bind();
            })
            .catch((ex) => {
                console.log(ex);
            });
    };

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}categories/${id}`, getHeaders())
            .then((result) => {
                console.log(result);
                // Refresh categories list after deleting
                bind();
            })
            .catch((ex) => {
                console.log(ex);
            });
    };

    // Function to populate form fields for editing
    const handleEdit = (category) => {
        setData({ id: category.id, name: category.name });
        setEditingCategoryId(category.id);
        console.log(category.id);
    };

    // Function to bind categories data
    const bind = () => {
        setData({ id: 0, name: "" })
        axios.get(process.env.REACT_APP_BASE_URL + "categories", getHeaders())
            .then((result) => {
                if(result.data.status == "success"){
                    setCategories(result.data.data);
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

    // useEffect to load categories data
    useEffect(() => {
        bind();
    }, []);

    // Handler for input field change
    const handleInputChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
        console.log(data);
    };


    return (
        <div className='container mt-5'>
            <p data-toggle="tooltip" data-placement="bottom" title="Admin/Dashboard" className="bread">
                <span><Link to={"/admin"}>Admin</Link></span> / <span>Categories</span>
            </p><br />
            <div className="row">
                <div className="col-lg-5">
                    <h4 className='c-dashboardInfo'>Categories</h4>
                </div>
                <div className="col-lg-4"></div>
                <div className="col-lg-3">
                    <button style={{ fontSize: "12px" }} className='myBtn-dang me-2 mb-5' onClick={() => navigate(-1)}><i class="fa-solid fa-arrow-left"></i> Go Back</button>
                    <button style={{ fontSize: "12px" }} className='myBtn mb-5' onClick={() => window.location.reload()}>Refresh <i class="fa-solid fa-arrow-rotate-right"></i></button>
                </div>
            </div>
            <div className="row p-3 mb-4 bg-light border">
                <div className="col-lg-12">
                    <input
                        className='form-control'
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={handleInputChange}
                        placeholder="Enter categories name"
                    />
                    <div className='mt-3'>
                        <button className='myBtn-succ' onClick={handleSave}>{editingCategoryId ? 'Update' : 'Save'}</button>
                        <button className='myBtn-dang ms-1' onClick={() => setData({ id: 0, name: "" })}>Cancel</button>
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
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            {
                                loading
                                    ?
                                    <tbody>
                                        {categories.map((item, index) => (
                                            <tr className='text-center border ' key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.name}</td>
                                                <td>
                                                    <a href="" onClick={() => handleEdit(item)}><i className="fa-solid fa-pencil text-primary"></i></a>
                                                    <a href="" onClick={() => handleDelete(item.id)}><i className="fa-regular fa-trash-can ms-4 text-danger"></i></a>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    :
                                    <div style={{ marginLeft: "110%", marginTop: "15%", width: '5rem', height: '5rem' }} className="spinner-border text-primary" role="status">
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

export default Categories