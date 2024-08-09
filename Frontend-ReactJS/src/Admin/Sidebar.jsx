import React, { useEffect, useState } from 'react'
import '../assets/vendor/bootstrap/css/bootstrap.min.css'
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css'
import '../assets/vendor/boxicons/css/boxicons.min.css'
import '../assets/vendor/quill/quill.snow.css'
import '../assets/vendor/quill/quill.bubble.css'
import '../assets/vendor/remixicon/remixicon.css'
import '../assets/vendor/simple-datatables/style.css'
import '../assets/css/style.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import AdminNav from './AdminNav'


const Sidebar = () => {
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
    <>
      <div className="row">
        <AdminNav />
        <div className="col-lg-3">
          <aside id="sidebar" class="sidebar">

            <ul class="sidebar-nav" id="sidebar-nav">

              <li class="nav-item">
                <Link to={"/admin"}>
                  <a class="nav-link " href="index.html">
                    <i class="bi bi-grid"></i>
                    <span>Dashboard</span>
                  </a>
                </Link>
              </li>
              
              {/* <!-- End Dashboard Nav --> */}

              <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
                  <i class="bi bi-menu-button-wide"></i><span>Components</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="components-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                  <li>
                    <Link to={"users"}>
                      <a class="collapse-item" style={{ marginTop: "-5%" }} href=""><i style={{ fontSize: "12px" }} class="fa-solid fa-users me-2"></i> User</a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"categories"}>
                      <a class="collapse-item" style={{ marginTop: "-10%" }} href=""><i style={{ fontSize: "12px" }} class="fa-solid fa-table-list me-2"></i>Categories</a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"units"}>
                      <a class="collapse-item" style={{ marginTop: "-10%" }} href=""><i style={{ fontSize: "12px" }} class="fa-brands fa-unity me-2"></i>Units</a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"products"}>
                      <a class="collapse-item" style={{ marginTop: "-10%" }} href=""><i style={{ fontSize: "12px" }} class="fa-brands fa-product-hunt me-2"></i>Products</a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"customers"}>
                      <a class="collapse-item" style={{ marginTop: "-10%" }} href=""><i style={{ fontSize: "12px" }} class="fa-solid fa-person-military-pointing me-2"></i>Customers</a>
                    </Link>
                  </li>
                  <li>
                    <Link to={"assign-route-customers"}>
                      <a class="collapse-item" style={{ marginTop: "-10%" }} href=""><i style={{ fontSize: "12px" }} class="fa-solid fa-person-military-pointing me-2"></i>Assign Customers</a>
                    </Link>
                  </li>
                  <Link to={"routes"}>
                    <a class="collapse-item collapsed" style={{ marginTop: "-10%" }} data-toggle="collapse" data-target="#collapseTwo" aria-expanded="true"
                      aria-controls="collapseTwo" href=""> <i style={{ fontSize: "12px" }} class="fa-solid fa-route me-2"></i>Route</a></Link>

                  <li class="nav-heading">Pages</li>
                  <Link to={"routes-vise-customers"}>
                  <a class="collapse-item" href=""><i style={{ fontSize: "12px" }} class="fa-solid fa-users me-2"></i> Routes Customers</a></Link> 
                </ul>
              </li>

              {/* <!-- End Components Nav --> */}


              <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" href="#">
                  <i class="bi bi-journal-text"></i><span>Order</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="forms-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                  <li>
                    <a href="forms-elements.html">
                      <i style={{ fontSize: "12px" }} class="fa-solid fa-location-dot"></i><span>Place Order</span>
                    </a>
                  </li>

                </ul>
              </li>
              {/* <!-- End Forms Nav --> */}

              <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#tables-nav" data-bs-toggle="collapse" href="#">
                  <i class="bi bi-layout-text-window-reverse"></i><span>Tables</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="tables-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                  <li>
                    <a href="tables-general.html">
                      <i class="bi bi-circle"></i><span>General Tables</span>
                    </a>
                  </li>
                  <li>
                    <a href="tables-data.html">
                      <i class="bi bi-circle"></i><span>Data Tables</span>
                    </a>
                  </li>
                </ul>
              </li>
              {/* <!-- End Tables Nav --> */}

              <li class="nav-heading">Pages</li>


              <li class="nav-item">
                <a class="nav-link collapsed" data-bs-target="#charts-nav" data-bs-toggle="collapse" href="#">
                  <i class="bi bi-bar-chart"></i><span>Report</span><i class="bi bi-chevron-down ms-auto"></i>
                </a>
                <ul id="charts-nav" class="nav-content collapse " data-bs-parent="#sidebar-nav">
                  <li>
                    <a class="collapse-item" href=""><i style={{ fontSize: "12px" }} class="fa-brands fa-first-order-alt me-2"></i>Customer
                      Order</a>
                  </li>
                  <li>
                    <a class="collapse-item" href=""><i style={{ fontSize: "12px" }} class="fa-solid fa-route me-2"></i>Route Order</a>
                  </li>
                  <li>
                    <a class="collapse-item" href=""><i style={{ fontSize: "12px" }} class="fa-brands fa-first-order me-2"></i>Product wise
                      Order</a>
                  </li>

                </ul>
              </li>
              {/* <!-- End Profile Page Nav --> */}

            </ul>
          </aside>
        </div>
        <div style={{ marginTop: "4%" }} className="col-lg-9">
          <Outlet></Outlet>
        </div>
      </div>
      {/* // <!-- End Sidebar--> */}
    </>
  )
}

export default Sidebar