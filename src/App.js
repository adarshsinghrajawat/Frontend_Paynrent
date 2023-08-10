import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashBoard from "./Components/Adm/Administrator/Dashboard";
import Login from "./Components/Adm/Administrator/Login";
import Home from "./Components/UserInterface/Home";
import VehicleDetails from "./Components/UserInterface/VehicleDetails";
import OtpInterface from "./Components/UserInterface/MyComponents/OtpInterface";
import VehicleDetailComponent from "./Components/UserInterface/VehicleDetailComponent";
import PaymentGateway from "./Components/UserInterface/PaymentGateway";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Home />} path='/home' />
        <Route element={<Login />} path='/login' />
        <Route element={<VehicleDetails />} path='/vehicle_details' />
        <Route element={<DashBoard />} path='/dashboard/*' />
        <Route element={<OtpInterface />} path='/otp' />
        <Route element={<VehicleDetailComponent />} path="/vehicle_details_component" />
        <Route element={<PaymentGateway />} path="/payment_gateway" />
      </Routes>
    </Router>
  );
}



export default App;
