import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import getHeaders from '../globalScripst'

const DCustomers = () => {

    let navigate = useNavigate();

    let [data, setData] = useState({ id: 0, name: "", email: "", monileno: "", address: "", town: "" });
    let [customers, setCustomer] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined)


    function bind() {
        setData({ id: 0, name: "", email: "", mobileno: "", address: "", town: "" });
        axios.get(process.env.REACT_APP_BASE_URL + "customers", getHeaders())
            .then((result) => {
                if(result.data.status == "success"){
                    setCustomer(result.data.data);
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

    useEffect(() => {
        bind()
    }, []);

    const filteredCustomers = customers.filter(customers =>
        customers.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='mt-5'>
            <p ddata-toggle="tooltip" data-placement="bottom" title="Admin/Dashboard" className="bread"><span><Link to={"/admin"}>Admin</Link></span> / <span>Customers</span></p><br />
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
                                <th scope="col">Address</th>
                                <th scope="col">Town</th>
                            </tr>
                        </thead>
                        {
                            loading
                                ?
                                <tbody>
                                    {
                                        filteredCustomers.map((item, index) => (
                                            <tr className='text-center border' >
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.name}</td>
                                                <td>{item.email}</td>
                                                <td>{item.mobileno}</td>
                                                <td>{item.address}</td>
                                                <td>{item.town}</td>
                                            </tr>
                                        ))
                                    }

                                </tbody>
                                :
                                <div style={{ marginLeft: "230%", marginTop: "45%", width: '5rem', height: '5rem' }} className="spinner-border text-primary" role="status">
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

export default DCustomers