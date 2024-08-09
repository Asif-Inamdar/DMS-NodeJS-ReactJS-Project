import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import getHeaders from '../globalScripst';

const DProducts = () => {
    let navigate = useNavigate();
    let [data, setData] = useState({ id: 0, name: "", categoryid: 0, unitid: 0, description: "", gstpercent: 0, image: null });
    let [list, setList] = useState([]);
    let [categories, setCategories] = useState([]);
    let [units, setUnits] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined)

    function bind() {
        setData({ id: 0, name: "", categoryid: 0, unitid: 0, description: "", gstpercent: 0, image: null });
        axios.get(process.env.REACT_APP_BASE_URL + "products", getHeaders())
            .then((result) => {
                if(result.data.success === "success"){
                    setList(result.data.data);
                }else{
                    alert(result.data.data)
                }
                setLoading(true)
            })
            .catch((ex) => {
                setError("Uneble to Fetch Product Data", ex);
                setLoading(true)
            });
    };

    useEffect(() => {
        bind();
        axios.get(process.env.REACT_APP_BASE_URL + "categories", getHeaders())
            .then((result) => {
                if(result.data.success === "success"){
                    setCategories(result.data.data);
                }else{
                    alert(result.data.data)
                }
            })
            .catch((ex) => {
                console.log(ex);
            });
    }, []);

    useEffect(() => {
        bind();
        axios.get(process.env.REACT_APP_BASE_URL + "units", getHeaders())
            .then((result) => {
                if(result.data.success){
                    setUnits(result.data.data);
                }else{
                    alert(result.data.data)
                }
            })
            .catch((ex) => {
                console.log(ex);
            });
    }, []);

    const filteredProducts = list.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className=' mt-5'>
            <p data-toggle="tooltip" data-placement="bottom" title="Admin/Dashboard" className="bread">
                <span><Link to={"/admin"}>Admin</Link></span> / <span>Products</span>
            </p>
            <br />
            <div className="row">
                <div className="col-lg-5">
                    <h4 className='c-dashboardInfo'>Products</h4>
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
            {
                !error
                    ?
                    <table className="table table-bordered table-striped border-primary table-hover mt-5">
                        <thead>
                            <tr className='bg-primary text-center border'>
                                <th scope="col">Sr No</th>
                                <th scope="col">Name</th>
                                <th scope="col">Image</th>
                                <th scope="col">Category</th>
                                <th scope="col">Unit</th>
                                <th scope="col">Description</th>
                                <th scope="col">GST Percent</th>
                            </tr>
                        </thead>
                        {
                            loading
                                ?
                                <tbody>
                                    {filteredProducts.map((item, i) => (
                                        <tr key={i} className='text-center border'>
                                            <th scope="row">{i + 1}</th>
                                            <td>{item.name}</td>
                                            <td><img width={40} src={process.env.REACT_APP_BASE_URL + item.imagepath} alt="" /></td>
                                            <td>{categories.find(cat => cat.id === item.categoryid)?.name || 'N/A'}</td>
                                            <td>{units.find(cat => cat.id === item.unitid)?.name || 'N/A'}</td>
                                            <td>{item.description}</td>
                                            <td>{item.gstpercent}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                                :
                                <div style={{ marginLeft: "300%", marginTop: "80%", width: '5rem', height: '5rem' }} className="spinner-border text-primary" role="status">
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
    );
}

export default DProducts;
