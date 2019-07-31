-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 31, 2019 at 02:49 PM
-- Server version: 10.3.15-MariaDB
-- PHP Version: 7.1.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `feedback360`
--

-- --------------------------------------------------------

--
-- Table structure for table `employeecredentials`
--

CREATE TABLE `employeecredentials` (
  `employee_Id` varchar(10) NOT NULL,
  `password` varchar(30) NOT NULL,
  `forgot_Password_Code` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employeecredentials`
--

INSERT INTO `employeecredentials` (`employee_Id`, `password`, `forgot_Password_Code`) VALUES
('RYTH0101', 'password', ''),
('RYTH0102', 'password', ''),
('RYTH0103', 'password', ''),
('RYTH0245', 'password', ''),
('RYTH0407', '123', 'nng6jd3s'),
('RYTH0408', 'password', ''),
('RYTH0413', 'password', ''),
('RYTH0417', 'qwerty', '42troytm'),
('RYTH0418', 'qwerty', 'fwap411'),
('RYTH0419', 'password', ''),
('RYTH0509', 'password', ''),
('RYTH0909', 'password', '');

-- --------------------------------------------------------

--
-- Table structure for table `employees`
--

CREATE TABLE `employees` (
  `employee_Id` varchar(11) NOT NULL,
  `employee_Name` varchar(50) NOT NULL,
  `employee_Designation` varchar(50) NOT NULL,
  `employee_Project` varchar(200) NOT NULL,
  `employee_Repoting_Id` varchar(20) NOT NULL,
  `employee_Mail_Id` varchar(50) NOT NULL,
  `employee_Phone_Number` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employees`
--

INSERT INTO `employees` (`employee_Id`, `employee_Name`, `employee_Designation`, `employee_Project`, `employee_Repoting_Id`, `employee_Mail_Id`, `employee_Phone_Number`) VALUES
('RYTH0101', 'Phani', 'Team Member', 'Unity', 'RYTH0001', 'phani123@gmail.com', '919897678653'),
('RYTH0102', 'Satwik', 'Team Lead', 'Starbucks', 'RYTH0002', 'satwikkaushal@gmail.com', '919989766875'),
('RYTH0103', 'Pavan', 'Team Member', 'RCX', 'RYTH0003', 'pavan765@gmail.com', '919898765456'),
('RYTH0245', 'Sarath', 'Manager', 'One Connect', 'RYTH0004', 'sarathboddapati@gmail.com', '918877675493'),
('RYTH0407', 'Bharath', 'Team Lead', 'Unity', 'RYTH0005', 'bharathchinthakula51@gmail.com', '919515795973'),
('RYTH0408', 'Jyothsna', 'Team Lead', 'Unity', 'RYTH0006', 'jyothsna3421@gmail.com', '919989567678'),
('RYTH0413', 'Mayuri', 'Delivery Manager', 'One Connect,Unity', 'RYTH0007', 'mayuriyedlu@gmail.com', '917306291626'),
('RYTH0417', 'Siddhartha', 'Data Scientist', 'Data Project', 'RYTH0008', 'siddhurc@gmail.com', '918897956221'),
('RYTH0418', 'Pavani', 'Team Lead', 'One Connect', 'RYTH0009', 'gurupavani98@gmail.com', '918384238433'),
('RYTH0419', 'Bhavana', 'Junior Associate Consultant', 'Learning and Development', '', 'p.bhavana1998@gmail.com', '7702727575'),
('RYTH0509', 'Diiya', 'Data Scientist', 'Data', 'RYTH0010', 'diiyadasari@gmail.com', '919393931313'),
('RYTH0909', 'Akhil', 'Junior Associate Consultant', '', '', 'akhil@gmaIl.com', '');

-- --------------------------------------------------------

--
-- Table structure for table `feedbacks`
--

CREATE TABLE `feedbacks` (
  `feedbackId` int(5) NOT NULL,
  `requestedBy` varchar(25) NOT NULL,
  `feedbackFrom` varchar(25) NOT NULL,
  `feedbackOf` varchar(25) NOT NULL,
  `question1` varchar(500) NOT NULL,
  `feedbackStatus` varchar(25) NOT NULL,
  `question2` varchar(500) NOT NULL,
  `question3` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employeecredentials`
--
ALTER TABLE `employeecredentials`
  ADD PRIMARY KEY (`employee_Id`);

--
-- Indexes for table `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`employee_Id`);

--
-- Indexes for table `feedbacks`
--
ALTER TABLE `feedbacks`
  ADD PRIMARY KEY (`feedbackId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedbacks`
--
ALTER TABLE `feedbacks`
  MODIFY `feedbackId` int(5) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `employeecredentials`
--
ALTER TABLE `employeecredentials`
  ADD CONSTRAINT `EmployeeForeignConstraint` FOREIGN KEY (`employee_Id`) REFERENCES `employees` (`employee_Id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
