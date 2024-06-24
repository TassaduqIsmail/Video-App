import logo from "./logo.svg";
import "./App.css";
import SIgnup from "./pages/SIgnup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Signuppage from "./pages/Signuppage";
import Shareprofile from "./pages/Shareprofile";
import Notsignup from "./pages/Notsignup";
import Searchengine from "./pages/Searchengine";
import Editprofile from "./pages/Editprofile";
import Changename from "./pages/Changename";
import Changeusername from "./pages/Changeusername";
import Setprice from "./pages/Setprice";
import Creatorstool from "./pages/Creatorstool";
import Viewingpicture from "./pages/Viewingpicture";
import Statersetyourrate from "./pages/Statersetyourrate";
import Uploadprofilepicture from "./pages/Uploadprofilepicture";
import Getstart from "./pages/Getstart";
import Starterusername from "./pages/Starterusername";
import Startname from "./pages/Startname";
import Creater from "./pages/Creater";
import CheckoutForm from "./pages/CheckoutForm";
import CheckPayment from "./pages/CheckPayment";
import Showpic from "./pages/Showpic";
import Createrpic from "./pages/Createrpic";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/search" element={<Searchengine />} />
          <Route path="/Creater" element={<Creater />} />
          <Route path="/notsignup" element={<Notsignup />} />
          <Route path="/shareprofile" element={<Shareprofile />} />
          <Route path="/checkoutform" element={<CheckoutForm />} />
          <Route path="/" element={<Signuppage />} />
          <Route path="/login" element={<SIgnup />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editprofile" element={<Editprofile />} />
          <Route path="/changename" element={<Changename />} />
          <Route path="/changeusername" element={<Changeusername />} />
          <Route path="/setprice" element={<Setprice />} />
          <Route path="/creatorstool" element={<Creatorstool />} />
          <Route path="/viewingpicture" element={<Viewingpicture />} />
          <Route path="/checkPayment" element={<CheckPayment />} />
          <Route path="/statersetyourrate" element={<Statersetyourrate />} />
          <Route
            path="/uploadprofilepicture"
            element={<Uploadprofilepicture />}
          />
          <Route path="/getstart" element={<Getstart />} />
          <Route path="/starterusername" element={<Starterusername />} />
          <Route path="/startname" element={<Startname />} />
          <Route path="/Showpic" element={<Showpic />} />
          <Route path="/Createrpic" element={<Createrpic />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
