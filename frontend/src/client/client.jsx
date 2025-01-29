import { Outlet } from "react-router-dom";
import Navbar from "./utility component/navbar/navbar";
import Footer from "./utility component/footer/footer";
import Box from "@mui/material/Box"; // Assuming Box is from Material-UI
// import { Component } from "lucide-react";

export default function Client() {
  return (
    <>
      <Navbar />
      <Box sx={{ minHeight: "80vh" }} component={"div"}>
        <Outlet />
      </Box>
      <Footer />
    </>
  );
}
