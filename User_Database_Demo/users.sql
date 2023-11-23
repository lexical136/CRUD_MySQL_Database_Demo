-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 05, 2021 at 01:59 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `users`
--

-- --------------------------------------------------------

--
-- Table structure for table `userhome`
--

CREATE TABLE `userhome` (
  `First Name` varchar(50) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `address1` varchar(50) NOT NULL,
  `address2` varchar(50) NOT NULL,
  `town` varchar(50) NOT NULL,
  `county` varchar(50) NOT NULL,
  `eircode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `userp`
--

CREATE TABLE `userp` (
  `Title` varchar(50) NOT NULL,
  `First Name` varchar(50) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `Mobile` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `usership`
--

CREATE TABLE `usership` (
  `First Name` varchar(50) NOT NULL,
  `Surname` varchar(50) NOT NULL,
  `address1` varchar(50) NOT NULL,
  `address2` varchar(50) NOT NULL,
  `town` varchar(50) NOT NULL,
  `county` varchar(50) NOT NULL,
  `eircode` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `userhome`
--
ALTER TABLE `userhome`
  ADD PRIMARY KEY (`First Name`,`Surname`);

--
-- Indexes for table `userp`
--
ALTER TABLE `userp`
  ADD PRIMARY KEY (`First Name`,`Surname`);

--
-- Indexes for table `usership`
--
ALTER TABLE `usership`
  ADD PRIMARY KEY (`First Name`,`Surname`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
