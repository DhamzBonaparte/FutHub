import Login from "./Components/Login/Login";
import { Routes, Route } from "react-router-dom";
import Signup from "./Components/Signup/Signup";
import PDashboard from "./Pages/Dashboard/Player/PDashboard";
import ODashboard from "./Pages/Dashboard/Owner/ODashboard";
import Home from "./Pages/Home/Home";
import TOC from "./Pages/TOC/TOC";
import Opponent from "./Pages/Dashboard/Player/opponent/Opponent";
import Service from "./Pages/Service/Service";
import Main from "./Pages/Dashboard/Player/Main/Main";
import Teammate from "./Pages/Dashboard/Player/Teammate/Teammate";
import OMain from "./Pages/Dashboard/Owner/Main/OMain";
import Book from "./Pages/Dashboard/Player/Booking/Book";
import BookFutsal from "./Pages/Dashboard/Owner/Book/BookFutsal";
import Review from "./Pages/Dashboard/Owner/Reviews/Review";
import Futsal from "./Pages/Dashboard/Owner/MyFutsal/Futsal";
import Register from "./Pages/Register/Register";
import Admin from "./Pages/Dashboard/Admin/Admin";
import AdminLogin from "./Pages/Dashboard/Admin/adminLogin/AdminLogin";
import Player from "./Pages/Dashboard/Admin/Players/Player";
import Owner from "./Pages/Dashboard/Admin/Owners/Owner";
import ADashboard from "./Pages/Dashboard/Admin/adminDashboard/ADashboard";
import Futsals from "./Pages/Dashboard/Admin/Futsals/Futsal";
function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/player" element={<PDashboard />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/owner" element={<ODashboard />}>
          <Route index element={<OMain />}></Route>
          <Route path="/owner/book-futsal" element={<BookFutsal />}></Route>
          <Route path="/owner/review" element={<Review />} />
          <Route path="/owner/my-futsal" element={<Futsal />}></Route>
        </Route>
        <Route path="/terms" element={<TOC />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/service" element={<Service />}></Route>
        <Route path="/player" element={<PDashboard />}>
          <Route index element={<Main />}></Route>
          <Route path="/player/find-opponent" element={<Opponent />}></Route>
          <Route path="/player/find-teammates" element={<Teammate />} />
          <Route path="/player/booking" element={<Book />}></Route>
        </Route>
        <Route path="/admin-login" element={<AdminLogin />}></Route>
        <Route path="/admin" element={<Admin />}>
          <Route index element={<ADashboard />}></Route>
          <Route path="/admin/futsals" element={<Futsals />}></Route>
          <Route path="/admin/players" element={<Player />}></Route>
          <Route path="/admin/owners" element={<Owner />}></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
