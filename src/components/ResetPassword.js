import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ userId: "", token: "", password: "" });
  const search = useLocation().search;
  const userId = new URLSearchParams(search).get("id");
  const token = new URLSearchParams(search).get("token");

  useEffect(() => {
    setUserData({ ...userData, userId: userId, token: token });
  }, []);

  const handleResetPassword = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post(`http://localhost:3001/resetPassword`, userData);
      if (response) {
        alert(response.data.message);
        navigate("/");
      }
    } catch (error) {
      console.log("Error: ", error);
      alert(error.response.data.message);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">
                Reset your password
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleResetPassword}>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    required
                    placeholder="New Password"
                    className="form-control"
                    name="password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                  />
                </div>
                <div className="mt-4">
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Reset Password</button>
                  </div>
                </div>
              </form>
              <br />
              <div className="text-center">
                Link expired? <a href="/forgot-password">Resend verification email</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;