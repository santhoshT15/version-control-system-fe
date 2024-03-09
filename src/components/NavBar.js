import axios from "axios";
import { Link, Outlet, useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/signout`, { withCredentials: true });
      if (response) {
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow">
        <div className="container-fluid">
          <Link to={"/home"} className="navbar-brand h1">
            <img src="public\vcs_logo.JPG" alt="Logo" width="30" height="30" className="d-inline-block align-text-top mr-4"/>
            &nbsp;Version Control System
          </Link>
          <button type="button" className="btn btn-danger" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default NavBar;