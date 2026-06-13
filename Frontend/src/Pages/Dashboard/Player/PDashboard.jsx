import "./PDash.css";
import Sidebar from "../../../../src/Components/Sidebar/Sidebar.jsx";
import { Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";

export default function PDashboard() {
  const fav = useRef("null");

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  function goToFav() {
    fav.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <>
      <Sidebar goToFav={goToFav}></Sidebar>
      <div className="main-content">
        <Outlet context={{ fav }} />
      </div>
    </>
  );
}
