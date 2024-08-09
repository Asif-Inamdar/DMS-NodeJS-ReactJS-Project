import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import getHeaders from '../globalScripst'

export default function RouteCustomers() {

  let navigate = useNavigate();

  let [data, setData] = useState({ id: 0, name: "" });
  let [customerList, setCustomerList] = useState([]);

  let { routeid } = useParams();

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL + "routes/" + routeid, getHeaders()).then((result) => {
      setData(result.data.data);
    }).catch((ex) => {
      console.log(ex);
    })
    axios.get(process.env.REACT_APP_BASE_URL + "routes/customers/" + routeid, getHeaders()).then((result) => {
      setCustomerList(result.data.data.map((customer) => {
        if (customer.rcid == 0)
          customer.added = false;
        else
          customer.added = true;
        return customer;
      }));
    }).catch((ex) => {
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
        // alert("Added");
        toast.success('Assigned To Customer Route',
          { position: "top-right", autoClose: 2000 });
      }).catch((ex) => {
        console.log(ex);
      })
      //Add customer
    }
    else {
      //Remove customer
      axios.post(process.env.REACT_APP_BASE_URL + "routes/removecustomer", data, getHeaders()).then((result) => {
        // alert("Removed");
        toast.error('Removed To Customer Route', { position: "top-right", autoClose: 2000 });
      }).catch((ex) => {
        console.log(ex);
      })
    }
  }

  return (
    <div className="content-wrapper mt-5">
      <ToastContainer />
      <p data-toggle="tooltip" data-placement="bottom" title="Admin/Dashboard" className="bread">
        <span><Link to={"/admin"}>Admin</Link></span> / <span>Route-Assign-Customers</span>
      </p><br />
      <div className="row">
        <div className="col-sm-5 mb-4 mb-xl-0">
          <h4 className="font-weight-bold text-dark">Route <b>{data.name}</b>  Customers</h4>
        </div>
        <div className="col-lg-4"></div>
        <div className="col-lg-3">
          <button style={{ fontSize: "12px" }} className='myBtn-dang me-2 mb-5' onClick={() => navigate(-1)}><i class="fa-solid fa-arrow-left"></i> Go Back</button>
          <button style={{ fontSize: "12px" }} className='myBtn mb-5' onClick={() => window.location.reload()}>Refresh <i class="fa-solid fa-arrow-rotate-right"></i></button>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-12">
          <table className="table table-stripped">
            <thead>
              <tr className='bg-primary text-center border'>
                <th scope="col">Select</th>
                <th scope="col">No</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Customer Address</th>
              </tr>
            </thead>
            <tbody>
              {
                customerList.map((item, i) => {
                  return (
                    <tr className='text-center border' key={item.id}>
                      <td scope="row">
                        <input type="checkbox" checked={item.added} onChange={(e) => { handleCheckbox(e, item.id) }} />
                      </td>
                      <td scope="row">{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.address}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
