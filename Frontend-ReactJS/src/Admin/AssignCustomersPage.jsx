import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import getHeaders from '../globalScripst'

const AssignCustomersPage = () => {
    let navigate = useNavigate();
    // const { routeId } = useParams();
    const location = useLocation();
    const [route, setRoute] = useState(location.state?.route || null);
    let [data, setData] = useState({ id: 0, name: "" });
    let [customerList, setCustomerList] = useState([]);

    let { routeid } = useParams();
    console.log(routeid);


    useEffect(() => {
        axios.get(process.env.REACT_APP_BASE_URL + "routes/" + routeid, getHeaders()).then((result) => {
            setData(result.data.data);
        }).catch((ex) => {
            console.log(ex);
        })
        axios.get(process.env.REACT_APP_BASE_URL + "routes/customers/" + routeid, getHeaders()).then((result) => {
            console.log(result.data);
            setCustomerList(result.data.data.map((customer) => {
                console.log(result.data.data);
                if (customer.rcid == 0)
                    customer.added = false;
                else
                    customer.added = true;
                return customer;
            }));
        })
        .catch((ex) => {
            console.log(ex);
        })
    }, []);


    function handleCheckbox(e, customerid) {
        //e.preventDefault();
        let data = { customerid: customerid, routeid: routeid }
        let customers = customerList.map((customer) => {
            if (customer.id == customerid) {
                customer.added = e.target.checked;
            }
            return customer;
        })
        setCustomerList(customers);
        if (e.target.checked) {
            axios.post(process.env.REACT_APP_BASE_URL + "routes/addcustomer", data, getHeaders()).then((result) => {
                alert("Added");
            }).catch((ex) => {
                console.log(ex);
            })
            //Add customer
        }
        else {
            //Remove customer
            axios.post(process.env.REACT_APP_BASE_URL + "routes/removecustomer", data, getHeaders()).then((result) => {
                alert("Removed");
            }).catch((ex) => {
                console.log(ex);
            })
        }
    }


    return (
        <div className='container mt-5'>
            <h4 className='c-dashboardInfo'>Assign Customers to: <b>{route.name}</b> Route </h4>
            <div className=''>
                <table className="table table-bordered table-striped border-primary table-hover">
                    <thead>
                        <tr className='bg-primary text-center border'>
                            <th scope="col">Select</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Address</th>
                            <th scope="col">Town</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customerList.map((item, i) => {
                                return (
                                    <tr key={item.id} className='text-center border'>
                                        <td>
                                            <input type="checkbox" checked={item.added} onChange={(e) => { handleCheckbox(e, item.id) }} />
                                        </td>
                                        <td>{i + 1}</td>
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.mobileno}</td>
                                        <td>{item.address}</td>
                                        <td>{item.town}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <button style={{fontSize:"12px"}} className='btn btn-success'>Assign Customers</button>
                <button style={{fontSize:"12px"}} className='btn btn-danger ms-1' onClick={() => navigate(-1)}>Cancel</button>
            </div>
        </div>
    );
};

export default AssignCustomersPage;
