import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const AdminNav = () => {

  let navigate = useNavigate();

  let [user, setUser] = useState({});
  console.log(user);

  useEffect(() => {
    if (localStorage.getItem("user") != null) {
      setUser(JSON.parse(localStorage.getItem("user")));
    } else {
      navigate("/login")
    }
  }, [])

  function logout() {
    localStorage.clear();
    navigate("/login");
  }

  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  };

  const on = (type, el, listener, all = false) => {
    if (all) {
      select(el, all).forEach(e => e.addEventListener(type, listener))
    } else {
      select(el, all).addEventListener(type, listener)
    }
  };

  function toggle() {
    if (select('.toggle-sidebar-btn')) {
      on('click', '.toggle-sidebar-btn', function (e) {
        select('body').classList.toggle('toggle-sidebar')
      })
    }

  }

  return (
    <div>
      {/* // <!-- ======= Header ======= --> */}
      <header id="header" class="header fixed-top d-flex align-items-center">

        <div class="d-flex align-items-center justify-content-between">
          <a href="index.html" class="logo d-flex align-items-center ps-4">
            <img src="assets/img/logo.png" alt="" />
            <span class="d-none d-lg-block">NiceAdmin</span>
          </a>
          {/* <button className='bbi bi-list toggle-sidebar-btn'> */}
          <i onClick={toggle} class="bi bi-list toggle-sidebar-btn ms-3"></i>

          {/* </button> */}
        </div>
        {/* <!-- End Logo --> */}

        <div class="search-bar">
          <form class="search-form d-flex align-items-center" method="POST" action="#">
            <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
            <button type="submit" title="Search"><i class="bi bi-search"></i></button>
          </form>
        </div>
        {/* <!-- End Search Bar --> */}

        <nav class="header-nav ms-auto">
          <ul class="d-flex align-items-center">

            <li class="nav-item d-block d-lg-none">
              <a class="nav-link nav-icon search-bar-toggle " href="#">
                <i class="bi bi-search"></i>
              </a>
            </li>
            {/* <!-- End Search Icon--> */}

            <li class="nav-item  pe-5">

              <a class="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
                <img src={require("../assets/img/profile-img.png")} alt="Profile" class="rounded-circle" />
                <span class="d-none d-md-block  ps-2">{user.name}</span>
              </a>
              {/* <!-- End Profile Iamge Icon --> */}

              <ul class="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li class="dropdown-header">
                  <h6>{user.name}</h6>
                  {/* <span>Web Designer</span> */}
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                  <Link to={"myprofile"}>
                <li className='data-bs-toggle="dropdown"' >
                  <a class="dropdown-item d-flex align-items-center" href="">
                    <i class="bi bi-person"></i>
                    <span >My Profile</span>
                  </a>
                </li>
                </Link>

                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <a class="dropdown-item d-flex align-items-center" href="users-profile.html">
                    <i class="bi bi-gear"></i>
                    <span>Account Settings</span>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <a class="dropdown-item d-flex align-items-center" href="pages-faq.html">
                    <i class="bi bi-question-circle"></i>
                    <span>Need Help?</span>
                  </a>
                </li>
                <li>
                  <hr class="dropdown-divider" />
                </li>

                <li>
                  <a onClick={logout} class="dropdown-item d-flex align-items-center" href="#">
                    <i class="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                  </a>
                </li>

              </ul>

            </li>

          </ul>
        </nav>



      </header>

      {/* //   <!-- End Header --> */}
    </div>
  )
}

export default AdminNav