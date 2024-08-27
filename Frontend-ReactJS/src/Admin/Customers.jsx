import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getHeaders from '../globalScripst'

const Customers = () => {
    let navigate = useNavigate();

    // State variables
    let [data, setData] = useState({ id: 0, name: "", email: "", mobileno: "", address: "", town: "" });
    let [customers, setCustomers] = useState([]);
    let [editMode, setEditMode] = useState(false);
    let [editId, setEditId] = useState(null);
    let [selectedCustomer, setSelectedCustomer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined)
    const [searchTerm, setSearchTerm] = useState('');


    // Function to handle input changes
    function handleChange(e) {
        setData({ ...data, [e.target.id]: e.target.value });
    };

    // Function to save or update a customer
    function handleSave() {
        if (editMode) {
            // Update existing customer
            axios.put(`${process.env.REACT_APP_BASE_URL}customers/${editId}`, data, getHeaders())
                .then((result) => {
                    toast.success('Update Successfull', { position: "top-right", autoClose: 2000 });
                    console.log(result);
                    bind(); // Reload customers after update
                    exitEditMode(); // Cancel Button
                })
                .catch((ex) => {
                    console.log(ex);
                });
        } else {
            // Add new customer
            axios.post(`${process.env.REACT_APP_BASE_URL}customers`, data, getHeaders())
                .then((result) => {
                    console.log(result);
                    bind(); // Reload customers after add
                    setData({ id: 0, name: "", email: "", mobileno: "", address: "", town: "" }); // Clear form fields
                    toast.success('Add a new customer', { position: "top-right", autoClose: 2000 });
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
        // Find the customer to edit
        const customerToEdit = customers.find(customer => customer.id === id);
        if (customerToEdit) {
            setSelectedCustomer(customerToEdit);
            setData({ ...customerToEdit }); // Populate form fields with customer data
        }
    };

    // Function to exit edit mode
    const exitEditMode = () => {
        setEditMode(false);
        setEditId(null);
        setSelectedCustomer(null);
        setData({ id: 0, name: "", email: "", mobileno: "", address: "", town: "" }); // Clear form fields
    };

    // Function to fetch customers
    function bind() {
        axios.get(`${process.env.REACT_APP_BASE_URL}customers`, getHeaders())
            .then((result) => {
                if(result.data.status == "success"){
                    setCustomers(result.data.data);
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

    // Function to handle customer deletion
    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}customers/${id}`, getHeaders())
            .then((result) => {
                console.log(result);
                bind(); // Reload customers after delete
                toast.success('Delete Customer', { position: "top-right", autoClose: 2000 });
            })
            .catch((ex) => {
                console.log(ex);
            });
    };

    // Fetch customers on component mount
    useEffect(() => {
        bind();
    }, []);

    const filteredCustomers = customers.filter(customers =>
        customers.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    return (
        <div className='mt-5'>
            <ToastContainer />
            {/* Breadcrumb */}
            <p ddata-toggle="tooltip" data-placement="bottom" title="Admin/Dashboard" className="bread">
                <span><Link to={"/admin"}>Admin</Link></span> / <span>Customers</span>
            </p><br />

            {/* Header and Back Button */}
            <div className="row">
                <div className="col-lg-5">
                    <h4 className='c-dashboardInfo'>Customers</h4>
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

            {/* Customer Form */}
            <div className='mt-4 border p-4 mb-5'>
                <div className="row">
                    <div className="col-lg-4">
                        <label htmlFor="name">Name </label>
                        <input className='w-100 form-control mt-4' type="text" placeholder='Name' id='name' value={data.name} onChange={handleChange} />
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="email">Email </label>
                        <input type="text" className='form-control mt-4 w-100' id='email' placeholder='Email' value={data.email} onChange={handleChange} />
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="mobileno">Mobile </label>
                        <input type="text" className='form-control mt-4 w-100' id='mobileno' placeholder='Mobile' value={data.mobileno} onChange={handleChange} />
                    </div>
                    <div className="col-lg-4">
                        <label className='mt-3' htmlFor="address">Address </label>
                        <input className='w-100 form-control mt-2' type="text" placeholder='Address' id='address' value={data.address} onChange={handleChange} />
                    </div>
                    <div className="col-lg-4">
                        <label className='mt-3' htmlFor="town">Town </label>
                        <input className='w-100 form-control mt-2' type="text" placeholder='Town' id='town' value={data.town} onChange={handleChange} />
                    </div>

                    {/* Save and Cancel buttons */}
                    <div className='mt-4'>
                        <button style={{fontSize:"12px"}} className='myBtn-succ me-2' onClick={handleSave}>{editMode ? 'Update' : 'Save'}</button>
                        <button style={{fontSize:"12px"}} className='myBtn-dang' onClick={exitEditMode}>Cancel</button>
                    </div>
                </div>
            </div>

            {/* Customer Table */}
            {
                !error
                    ?
                    <table className="table table-bordered table-striped border-primary table-hover mt-5">
                        <thead>
                            <tr className='bg-primary text-center border form-control-sm'>
                                <th scope="col">Sr No</th>
                                <th scope="col">NMAE</th>
                                <th scope="col">EMAIL</th>
                                <th scope="col">MOBILE</th>
                                <th scope="col">ADDRESS</th>
                                <th scope="col">TOWN</th>
                                <th scope="col">ACTION</th>
                            </tr>
                        </thead>
                        {
                            loading
                                ?
                                <tbody>
                                    {
                                        filteredCustomers.map((item, index) => (
                                            <tr className='text-center border form-control-sm' key={item.id}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.mobileno}</td>
                                                <td>{item.address}</td>
                                                <td>{item.town}</td>
                                                <td>
                                                    <button style={{fontSize:"12px"}} className='myBtn-Edit' onClick={() => enterEditMode(item.id)}>Edit</button>
                                                    <button style={{fontSize:"12px"}} className='myBtn-dang-Delete ms-1' onClick={() => handleDelete(item.id)}>Delete</button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                :
                                <div style={{ marginLeft: "300%", marginTop: "15%", width: '5rem', height: '5rem' }} className="spinner-border text-primary" role="status">
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
    )
}

export default Customers;
