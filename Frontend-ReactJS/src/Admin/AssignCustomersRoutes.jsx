import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import getHeaders from '../globalScripst'

const AssignCustomersRoutes = () => {
    let navigate = useNavigate();
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined)
    // let [list, setList] = useState([]);
    // Function to fetch routes data
    const bind = () => {
        axios.get(`${process.env.REACT_APP_BASE_URL}routes`, getHeaders())
            .then((result) => {
                if(result.data.status == "success"){
                    setRoutes(result.data.data);
                     setLoading(true);
                }else{
                    alert(result.data.data)
                }
            })
            .catch((ex) => {
                setError("Uneble to Fetch Product Data", ex);
                setLoading(true)
            });
    };

    useEffect(() => {
        bind();
    }, []);

    return (
        <div className='container mt-5'>
            <p data-toggle="tooltip" data-placement="bottom" title="Admin/Dashboard" className="bread">
                <span><Link to={"/admin"}>Admin</Link></span> / <span>Routes</span>
            </p><br />

            {/* Header and Back Button */}
            <div className="row">
                <div className="col-lg-5">
                    <h4 className='c-dashboardInfo'>Routes</h4>
                </div>
                <div className="col-lg-4"></div>
                <div className="col-lg-3">
                    <button style={{ fontSize: "12px" }} className='myBtn-dang me-2 mb-5' onClick={() => navigate(-1)}><i class="fa-solid fa-arrow-left"></i> Go Back</button>
                    <button style={{ fontSize: "12px" }} className='myBtn mb-5' onClick={() => window.location.reload()}>Refresh <i class="fa-solid fa-arrow-rotate-right"></i></button>
                </div>
            </div>

            {/* Routes Table */}
            <div className=''>
                {
                    !error
                        ?
                        <table className="table table-bordered table-striped border-primary table-hover">
                            <thead>
                                <tr className='bg-primary text-center border'>
                                    <th scope="col">Sr No</th>
                                    <th scope="col">NAME</th>
                                    <th scope="col">ACTION</th>
                                </tr>
                            </thead>
                            {
                                loading
                                    ?
                                    <tbody>
                                        {routes.map((item, index) => (
                                            <tr key={item.id} className='text-center border'>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.name}</td>
                                                <td>
                                                    <Link to={"/admin/route-customers/" + item.id}><button style={{ fontSize: "12px" }} className="myBtn"><i class="fa-solid fa-share"></i> Assign Customers <span style={{ fontSize: "12px" }} class="badge bg-danger rounded-pill">{ item.customercount }</span></button></Link>

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
    );
};

export default AssignCustomersRoutes;
