import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getHeaders from '../globalScripst'

const AdminProducts = () => {
    let navigate = useNavigate();
    let [data, setData] = useState({ id: 0, name: "", categoryid: 0, unitid: 0, description: "", gstpercent: 0, image: null });
    let [list, setList] = useState([]);
    let [categories, setCategories] = useState([]);
    let [units, setUnits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);

    function handleChange(e) {
        e.preventDefault();
        setData({ ...data, [e.target.id]: e.target.value });
    };

    function handleFileChange(e) {
        e.preventDefault();
        setData({ ...data, image: e.target.files[0] });
    };

    function handleSave(e) {
        e.preventDefault();
        let formdata = new FormData();
        formdata.append("id", data.id);
        formdata.append("name", data.name);
        formdata.append("categoryid", data.categoryid);
        formdata.append("unitid", data.unitid);
        formdata.append("description", data.description);
        formdata.append("gstpercent", data.gstpercent);
        formdata.append("image", data.image);

        if (data.id === 0) {
            axios.post(process.env.REACT_APP_BASE_URL + "products", formdata, getHeaders()).then((result) => {
                bind();
                setData({ id: 0, name: "", categoryid: 0, unitid: 0, description: "", gstpercent: 0, image: null });
                toast.success('New Product Added', { position: "top-right", autoClose: 2000 });
            }).catch((ex) => {
                console.log(ex);
            });
        } else {
            axios.put(`${process.env.REACT_APP_BASE_URL}products/${data.id}`, formdata, getHeaders()).then((result) => {
                bind();
                setData({ id: 0, name: "", categoryid: 0, unitid: 0, description: "", gstpercent: 0, image: null });
                toast.success('Product Updated', { position: "top-right", autoClose: 2000 });
            }).catch((ex) => {
                console.log(ex);
            });
        }
    };

    function bind() {
        axios.get(process.env.REACT_APP_BASE_URL + "products", getHeaders()).then((result) => {
            if(result.data.status == "success"){
                setList(result.data.data);
                 setLoading(true);
            }else{
                alert(result.data.data)
            }
        }).catch((ex) => {
            setError("Unable to Fetch Product Data", ex);
            setLoading(true);
        });
    };

    const handleDelete = (id) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}products/${id}`,getHeaders()).then((result) => {
            bind();
            toast.success('Product Deleted', { position: "top-right", autoClose: 2000 });
        }).catch((ex) => {
            console.log(ex);
        });
    };

    const editProduct = (product) => {
        setData({
            id: product.id,
            name: product.name,
            categoryid: product.categoryid,
            unitid: product.unitid,
            description: product.description,
            gstpercent: product.gstpercent,
            image: null
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        bind();
        axios.get(process.env.REACT_APP_BASE_URL + "categories",getHeaders()).then((result) => {
            if(result.data.status == "success"){
                setCategories(result.data.data);
            }else{
                alert(result.data.data)
            }
        }).catch((ex) => {
            console.log(ex);
        });

        axios.get(process.env.REACT_APP_BASE_URL + "units",getHeaders()).then((result) => {
            if(result.data.status == "success"){
                setUnits(result.data.data);
            }else{
                alert(result.data.data)
            }
        }).catch((ex) => {
            console.log(ex);
        });
    }, []);

    return (
        <div className='mt-5'>
            <ToastContainer />
            <p className="bread"><span><Link to={"/admin"}>Admin</Link></span> / <span>Products</span></p><br />
            <div className="row">
                <div className="col-lg-5">
                    <h4 className='c-dashboardInfo'>Products</h4>
                </div>
                <div className="col-lg-4"></div>
                <div className="col-lg-3">
                    <button style={{ fontSize: "12px" }} className='myBtn-dang me-2 mb-5' onClick={() => navigate(-1)}><i className="fa-solid fa-arrow-left"></i> Go Back</button>
                    <button style={{ fontSize: "12px" }} className='myBtn mb-5' onClick={() => window.location.reload()}>Refresh <i className="fa-solid fa-arrow-rotate-right"></i></button>
                </div>
            </div>
            <div className='mt-4 border p-4'>
                <div className="row">
                    <div className="col-lg-4">
                        <label htmlFor="name">Name</label>
                        <input className='w-100 form-control mt-2' onChange={handleChange} value={data.name} type="text" id='name' />
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="categoryid">Category</label>
                        <select className='w-100 form-control mt-2' onChange={handleChange} value={data.categoryid} id='categoryid'>
                            <option value="0">Select Category</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="unitid">Unit</label>
                        <select className='w-100 form-control mt-2' onChange={handleChange} value={data.unitid} id='unitid'>
                            <option value="0">Select Unit</option>
                            {units.map((unit) => (
                                <option key={unit.id} value={unit.id}>{unit.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="description">Description</label>
                        <input className='w-100 form-control mt-2' onChange={handleChange} value={data.description} type="text" id='description' />
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="gstpercent">GST Percent</label>
                        <input className='w-100 form-control mt-2' onChange={handleChange} value={data.gstpercent} type="text" id='gstpercent' />
                    </div>
                    <div className="col-lg-4">
                        <label htmlFor="image">Image</label>
                        <input className='w-100 form-control mt-2' onChange={handleFileChange} type="file" id='image' accept='image/*' />
                    </div>
                    <div className='mt-4'>
                        <button style={{fontSize:"12px"}} className='myBtn-succ me-2' onClick={handleSave}>Save</button>
                        <button style={{fontSize:"12px"}} className='myBtn-dang' onClick={() => setData({ id: 0, name: "", categoryid: 0, unitid: 0, description: "", gstpercent: 0, image: null })}>Cancel</button>
                    </div>
                </div>
            </div>
            {!error ?
                <table className="table table-bordered table-striped border-primary table-hover mt-5">
                    <thead>
                        <tr className='bg-primary text-center border form-control-sm'>
                            <th scope="col">Sr No</th>
                            <th scope="col">NAME</th>
                            <th scope="col">IMAGE</th>
                            <th scope="col">CATEGORY</th>
                            <th scope="col">UNIT</th>
                            <th scope="col">DESCRIPTION</th>
                            <th scope="col">GST PERCENT</th>
                            <th scope="col">ACTION</th>
                        </tr>
                    </thead>
                    {loading ?
                        <tbody>
                            {list.map((item, i) => (
                                <tr key={i} className='text-center border'>
                                    <th scope="row">{i + 1}</th>
                                    <td>{item.name}</td>
                                    <td><img width={40} src={process.env.REACT_APP_BASE_URL + item.imagepath} alt="" /></td>
                                    <td>{categories.find(cat => cat.id === item.categoryid)?.name || 'N/A'}</td>
                                    <td>{units.find(unit => unit.id === item.unitid)?.name || 'N/A'}</td>
                                    <td>{item.description}</td>
                                    <td>{item.gstpercent}%</td>
                                    <td>
                                        <button style={{fontSize:"12px"}} className='myBtn-Edit' onClick={() => editProduct(item)}>Edit</button>
                                        <button style={{fontSize:"12px"}} className='myBtn-dang-Delete ms-1' onClick={() => handleDelete(item.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        :
                        <div style={{ marginLeft: "50%", marginTop: "15%", width: '5rem', height: '5rem' }} className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    }
                </table>
                :
                <div className="alert alert-danger">
                    <strong>{error} ! </strong><a href="" className="alert-link">Error Link</a>
                </div>
            }
        </div>
    )
};

export default AdminProducts;
