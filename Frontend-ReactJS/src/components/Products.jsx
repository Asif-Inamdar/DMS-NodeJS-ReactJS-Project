import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import getHeaders from '../globalScripst';

const Products = () => {


    let navigate = useNavigate();
    let [data, setData] = useState({ id: 0, name: "", categoryid: 0, unitid: 0, description: "", gstpercent: 0, image: null });
    let [list, setList] = useState([]);
    let [categories, setCategories] = useState([]);
    let [units, setUnits] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    function bind() {
        setData({ id: 0, name: "", categoryid: 0, unitid: 0, description: "", gstpercent: 0, image: null });
        axios.get(process.env.REACT_APP_BASE_URL + "products", getHeaders())
            .then((result) => {
                if(result.data.success == "success"){
                    setList(result.data.data);
                }else{
                    alert(result.data.data)
                }
            })
            .catch((ex) => {
                console.log(ex);
            });
    };

    useEffect(() => {
        bind();
        axios.get(process.env.REACT_APP_BASE_URL + "categories", getHeaders())
            .then((result) => {
                setCategories(result.data.data);
            })
            .catch((ex) => {
                console.log(ex);
            });
    }, []);

    useEffect(() => {
        bind();
        axios.get(process.env.REACT_APP_BASE_URL + "units", getHeaders())
            .then((result) => {
                setUnits(result.data.data);
            })
            .catch((ex) => {
                console.log(ex);
            });
    }, []);

    const filteredProducts = list.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
        <>
            <header id="header" class="header d-flex align-items-center fixed-top">
                <div class="container-fluid container-xl position-relative d-flex align-items-center">

                    <a href="index.html" class="logo d-flex align-items-center me-auto">
                        <img src={require("../assets/img/logo.png")} alt="" />
                        <h1 class="sitename">FlexStart</h1>
                    </a>

                    <nav id="navmenu" class="navmenu">
                        <ul><Link to={"/"}>
                            <li><a href="" class="active">Home<br /></a></li>
                        </Link>
                            <li><a href="#about">About</a></li>
                            <Link to={"/products"}>
                                <li><a href="#about">Product</a></li>
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
            <div class="wrapper">
                <div class="search">
                    <input type="text" placeholder="Search..." value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} />
                    <div class="icon">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </div>
                </div>
            </div>
            <div class="main">
                <h3 style={{ marginLeft: "45%", marginTop: "5%" }}>All Products</h3>
                <ul class="cards mt-4">
                    {filteredProducts.map((item, i) => (
                        <li class="cards_item">
                            <div class="card">
                                <div class="card_image"><img width={40} src={process.env.REACT_APP_BASE_URL + item.imagepath} alt="" /></div>
                                <div class="card_content">
                                    <h2 class="card_title">{item.name}-{item.categoryid}-{item.unitid} &#x2022; $9</h2>

                                    <div class="card_text mt-">
                                        <b><p style={{fontSize:"15px"}}>&#x2022;{item.gstpercent}% {item.description}</p></b>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}

export default Products