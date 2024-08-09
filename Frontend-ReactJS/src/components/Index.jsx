import { Link } from 'react-router-dom'
import '../assets/css/main.css'
// import React, { useEffect } from 'react'

const Index = () => {


  /**
  * Mobile nav toggle
  */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-active');
  //  mobile-nav-active
  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-toggel');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  };
  //  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function (e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });


  return (
    <div >
      <header id="header" class="header d-flex align-items-center fixed-top">
        <div class="container-fluid container-xl position-relative d-flex align-items-center">

          <a class="logo d-flex align-items-center me-auto">
            <img src={require("../assets/img/favicon.jpg")} alt="" />
            {/* <h1 class="sitename">FlexStart</h1> */}
          </a>

          <nav id="navmenu" class="navmenu">
            <ul>

              <li>
                <Link to={"/"}>
                  <a class="active">Home</a>
                </Link>
              </li>

              <li><a href="#about">About</a></li>
              <Link to={"/products"}>
                <li><a >Product</a></li>
              </Link>
              <li><a href="#services">Services</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
            <i onClick={() => mobileNavToogle()} className="mobile-nav-toggle d-xl-none bi bi-list"></i>

          </nav>
          <Link to={"/login"}>
            <a class="btn-getstarted flex-md-shrink-0" href="index.html#about">Login</a>
          </Link>
        </div>
      </header>
      <main class='main'>
        {/* <!-- Hero Section --> */}
        <section id="hero" class="hero section">

          <div class="container">
            <div class="row gy-4">
              <div class="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                <h1 data-aos="fade-up">To become a Kurkure distributor, you need to fulfill the following eligibility criteria</h1>
                <p data-aos="fade-up" data-aos-delay="100">In India Kurkure is a popular snack brand owned by PepsiCo, known for its spicy and tangy flavors.</p>
                <div class="d-flex flex-column flex-md-row" data-aos="fade-up" data-aos-delay="200">
                  <a href="#about" class="btn-get-started">Get Started <i class="bi bi-arrow-right"></i></a>
                  
                  <a href="https://youtu.be/fmf-C_TdfkY?si=tCZWnC2eH_5TREWB" target='_blank' class="glightbox btn-watch-video d-flex align-items-center justify-content-center ms-0 ms-md-4 mt-4 mt-md-0"><i class="bi bi-play-circle"></i><span>Watch Video</span></a>
                </div>
              </div>
              <div class="col-lg-6 order-1 order-lg-2 hero-img" data-aos="zoom-out">
                <img src={require("../assets/img/Hero-kurkure-1.png")} class="img-fluid animated" alt="" />
                {/* ../assets/img/hero-img.png */}
              </div>
            </div>
          </div>

        </section>
        {/* <!-- /Hero Section --> */}
      </main>
    </div>
  )
}

export default Index