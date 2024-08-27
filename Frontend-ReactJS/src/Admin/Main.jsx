import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'

const Main = () => {
    let navigate = useNavigate();
    let [user, setUser] = useState({});

    useEffect(() => {
        if (localStorage.getItem("user") != null) {
            setUser(JSON.parse(localStorage.getItem("user")));
        } else {
            navigate("/login")
        }
    }, [])


    return (
        <div className='container mt-5'>
            <p className="bread"><span><Link to={"/admin"}>Admin</Link></span> / <span>Dashboard</span></p><br />

            <div className='ms-auto float-end d-block mb-3' style={{ fontFamily: "Calibri" }}>
                <Link to={"user2"}>
                    <button className='myBtn'><i style={{ fontSize: "12px" }} class="fa-solid fa-users me-2 MuiSvgIcon-root-19"></i>Users </button>
                </Link>
                <Link to={"customers2"}>
                    <button className='myBtn-worn  text-white ms-1'><i style={{ fontSize: "13px" }} class="fa-solid fa-person-military-pointing me-1 MuiSvgIcon-root-19"></i> Customers</button>
                </Link>
                <Link to={"products2"}>
                    <button className='myBtn-purp text-white ms-1'><i style={{ fontSize: "13px" }} class="fa-brands fa-product-hunt me-1 MuiSvgIcon-root-19"></i> Products</button>
                </Link>
               
            </div>
            <div className='mt-2 ms-5'>
                <img width={900} src={require('../assets/img/Banner1.jpg')} alt="" />
            </div>
            
            <div id="root">
                <div class="container pt-5 mt-2">
                    <div class="row align-items-stretch">
                        <div class="c-dashboardInfo col-lg-3 col-md-6">
                            <div class="wrap">
                                <h1 class="c-dashboardInfo__title">Products<i style={{ fontSize: "20px" }} class="fa-brands fa-product-hunt ms-2 MuiSvgIcon-root-19"></i>
                                </h1><span class="hind-font caption-12 c-dashboardInfo__count">100</span>
                            </div>
                        </div>
                        <div class="c-dashboardInfo col-lg-3 col-md-6">
                            <div class="wrap">
                                <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Users <i style={{ fontSize: "15px" }} class="fa-solid fa-users ms-2 MuiSvgIcon-root-19"></i>
                                </h4><span class="hind-font caption-12 c-dashboardInfo__count">50</span>
                            </div>
                        </div>
                        <div class="c-dashboardInfo col-lg-3 col-md-6">
                            <div class="wrap">
                                <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">Customers<i style={{ fontSize: "15px" }} class="fa-solid fa-person-military-pointing ms-2 MuiSvgIcon-root-19"></i>
                                </h4><span class="hind-font caption-12 c-dashboardInfo__count">500</span>
                            </div>
                        </div>
                        <div class="c-dashboardInfo col-lg-3 col-md-6">
                            <div class="wrap">
                                <h4 class="heading heading5 hind-font medium-font-weight c-dashboardInfo__title">RutesCustomers <i style={{ fontSize: "15px" }} class="fa-solid fa-route me-2"></i>
                                    <i style={{ fontSize: "15px" }} class="fa-solid fa-users ms-2 MuiSvgIcon-root-19"></i>
                                </h4><span class="hind-font caption-12 c-dashboardInfo__count">20</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main