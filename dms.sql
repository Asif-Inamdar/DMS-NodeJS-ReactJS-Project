-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 08, 2024 at 08:14 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dms`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`) VALUES
(1, 'Chpis'),
(2, 'Kurkure'),
(14, 'Kurkure Sticks');

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobileno` varchar(100) NOT NULL,
  `address` text NOT NULL,
  `town` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `name`, `email`, `mobileno`, `address`, `town`) VALUES
(1, 'Asif Inamdar', 'asif@gmail.com', '7744862705', 'Uchgaon', 'Kolhapur'),
(5, 'Sahil Inamdar', 'sahil@gmail.com', '1234554321', 'Rajarampuri ', 'Kolhapur'),
(7, 'Vinit Kamble', 'vinit@gmail.com', '7057201919', 'Rajarampuri ', 'kolhapur'),
(8, 'Rutik Patil', 'rutik@gmail.com', '9075454590', 'Shahuwadi ', 'Kolhapur'),
(9, 'Vasim Mulla', 'vasim23@gmail.com', '9056691222', 'Temblaiwadi', 'Kolhapur'),
(10, 'Shivam Gajbar', 'shivamgajbaro7@gmail.com', '7180168818', 'Sarnobatwadi', 'Kolhapur'),
(11, 'Pranit Gurav', 'panya85@gmail.com', '9176688119', 'Uchgaon', 'Kolhapur'),
(12, 'Omkar More', 'omkarmore111@gmail.com', '7057272116', 'Uchgaon', 'Kolhapur'),
(14, 'Alfaz Shaikh', 'alfaz@gmail.com', '9122543467', 'Ujalaiwadi', 'Kolhapur'),
(15, 'Zaid Shaikh', 'zaidshaikh@gmail.com', '7744562389', 'Ujalaiwadi', 'Kolhapur'),
(16, 'Sachin Kumbhar', 'sachinkumbhar09@gmail.com', '9174687458', 'Kerle', 'Kolhapur'),
(17, 'Rahul Bhosle', 'rahulbhosle08@gmail.com', '9174634548', 'Bondrenagar', 'Kolhapur'),
(18, 'Adarsh Dongle', 'adarsh12@gmail.com', '7764553627', 'Gandhinagar', 'Kolhapur'),
(19, 'Vishvajeet Patil', 'vishu0707@gmail.com', '9516637584', 'Girgaon', 'Kolhapur'),
(20, 'Vivek Bhat', 'vivekbhat88@gmail.com', '7646744751', 'Kalamba', 'Kolhapur'),
(21, 'Prem Vatkar', 'prem143@gmail.com', '3478659357', 'Rajarampuri ', 'Kolhapur'),
(27, 'Krushna Lad', 'krushna@gmail.com', '7447836572', 'Peerwadi', 'Kolhapur'),
(30, 'Nikhil Patil', 'nikhil@gmail.com', '1234554321', 'Karad', 'Kolhapur'),
(31, 'Bhushan Patil', 'bhushan@gmail.com', '5784678465', 'Haldi', 'Kolhapur'),
(32, 'Dhiraj Nagraj', 'dhiraj@gmail.com', '8436537384', 'satara', 'Kolhapur'),
(33, 'Somnath Kotmire', 'somnath@gmail.com', '123456789', 'Shahupuri', 'Kolhapur');

-- --------------------------------------------------------

--
-- Table structure for table `orderproducts`
--

CREATE TABLE `orderproducts` (
  `id` int(11) NOT NULL,
  `orderid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `rate` double NOT NULL,
  `subtotal` double NOT NULL,
  `gstpercent` double NOT NULL,
  `gstamount` double NOT NULL,
  `billamount` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(11) NOT NULL,
  `odate` date NOT NULL,
  `customerid` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `subtotal` double NOT NULL,
  `gstamount` double NOT NULL,
  `billamount` double NOT NULL,
  `status` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `imagepath` varchar(100) NOT NULL,
  `categoryid` int(11) NOT NULL,
  `unitid` int(11) NOT NULL,
  `description` text NOT NULL,
  `gstpercent` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `imagepath`, `categoryid`, `unitid`, `description`, `gstpercent`) VALUES
(8, 'Puff Corn', 'productpics/1719583940181.jpg', 2, 10, 'Yummy Cheese Puffcorn Namkeen', 2);

-- --------------------------------------------------------

--
-- Table structure for table `routecustomers`
--

CREATE TABLE `routecustomers` (
  `id` int(11) NOT NULL,
  `routeid` int(11) NOT NULL,
  `customerid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `routecustomers`
--

INSERT INTO `routecustomers` (`id`, `routeid`, `customerid`) VALUES
(2, 11, 14),
(3, 11, 15),
(8, 5, 18),
(9, 11, 1),
(11, 8, 27),
(14, 3, 21),
(21, 11, 5),
(23, 14, 19),
(25, 9, 9),
(26, 10, 10),
(29, 10, 32),
(30, 8, 31),
(32, 3, 30);

-- --------------------------------------------------------

--
-- Table structure for table `routes`
--

CREATE TABLE `routes` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `routes`
--

INSERT INTO `routes` (`id`, `name`, `description`) VALUES
(3, 'Karad', ''),
(5, 'Hatkanangale', ''),
(6, 'Sangli', ''),
(8, 'Kagal', ''),
(9, 'Nippani', ''),
(10, 'Panhala', ''),
(11, 'Kolhapur', ''),
(14, 'Mumbai', '');

-- --------------------------------------------------------

--
-- Table structure for table `stock`
--

CREATE TABLE `stock` (
  `id` int(11) NOT NULL,
  `sdate` date NOT NULL,
  `productid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `stockquantity` int(11) NOT NULL,
  `mfgdate` date NOT NULL,
  `expdate` date NOT NULL,
  `rate` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `units`
--

CREATE TABLE `units` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `units`
--

INSERT INTO `units` (`id`, `name`) VALUES
(10, 'Kg');

-- --------------------------------------------------------

--
-- Table structure for table `userprofileimage`
--

CREATE TABLE `userprofileimage` (
  `id` int(11) NOT NULL,
  `imagepath` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `userprofileimage`
--

INSERT INTO `userprofileimage` (`id`, `imagepath`) VALUES
(15, 'userpics/1721471983719.jpg'),
(16, 'userpics/1721472718538.jpg'),
(17, 'userpics/1721473066496.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `mobileno` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `utype` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `mobileno`, `password`, `utype`) VALUES
(53, 'Asif Inamdar', 'asif@gmail.com', '7744862705', 'admin', 'Admin'),
(83, 'Sakib Inamdar', 'sakib@gmail.com', '6534765476', 'ssss', 'Admin'),
(84, 'Sahil Inamdar', 'sahil@gmail.com', '5445874693', 'sahil', 'Admin'),
(85, 'Sajid inamdar', 'sajid75@gmail.com', '7458308675', '7878', 'User');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orderproducts`
--
ALTER TABLE `orderproducts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkorderid` (`orderid`),
  ADD KEY `fk_productid` (`productid`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_customerid` (`customerid`),
  ADD KEY `fk_userid` (`userid`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkunit` (`unitid`),
  ADD KEY `fkcategoryid` (`categoryid`);

--
-- Indexes for table `routecustomers`
--
ALTER TABLE `routecustomers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkrouteid` (`routeid`),
  ADD KEY `fkcustomerid` (`customerid`);

--
-- Indexes for table `routes`
--
ALTER TABLE `routes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fkproductid` (`productid`);

--
-- Indexes for table `units`
--
ALTER TABLE `units`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `userprofileimage`
--
ALTER TABLE `userprofileimage`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uk_email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT for table `orderproducts`
--
ALTER TABLE `orderproducts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `routecustomers`
--
ALTER TABLE `routecustomers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `routes`
--
ALTER TABLE `routes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `stock`
--
ALTER TABLE `stock`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `units`
--
ALTER TABLE `units`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `userprofileimage`
--
ALTER TABLE `userprofileimage`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderproducts`
--
ALTER TABLE `orderproducts`
  ADD CONSTRAINT `fk_productid` FOREIGN KEY (`productid`) REFERENCES `products` (`id`),
  ADD CONSTRAINT `fkorderid` FOREIGN KEY (`orderid`) REFERENCES `orders` (`id`);

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `fk_customerid` FOREIGN KEY (`customerid`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `fk_userid` FOREIGN KEY (`userid`) REFERENCES `users` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `fkcategoryid` FOREIGN KEY (`categoryid`) REFERENCES `categories` (`id`),
  ADD CONSTRAINT `fkunit` FOREIGN KEY (`unitid`) REFERENCES `units` (`id`);

--
-- Constraints for table `routecustomers`
--
ALTER TABLE `routecustomers`
  ADD CONSTRAINT `fkcustomerid` FOREIGN KEY (`customerid`) REFERENCES `customers` (`id`),
  ADD CONSTRAINT `fkrouteid` FOREIGN KEY (`routeid`) REFERENCES `routes` (`id`);

--
-- Constraints for table `stock`
--
ALTER TABLE `stock`
  ADD CONSTRAINT `fkproductid` FOREIGN KEY (`productid`) REFERENCES `products` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
