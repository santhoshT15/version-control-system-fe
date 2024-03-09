import axios from "axios";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const Login = () => {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`https://version-control-system-be.onrender.com/signin`, values, { withCredentials: true });
        if (response) {
          setUser(response.data.user);
          navigate("/home");
        }
      } catch (error) {
        console.log("Error: ", error);
        alert(error.response.data.message);
        formik.resetForm();
      }
    },
  });

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">Log in to your account</h3>
            </div>
            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    required
                    placeholder="Email"
                    className="form-control"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    className="form-control"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="d-flex justify-content-end">
                  <a href="/forgot-password">Forgot Password?</a>
                </div>
                <div className="mt-4">
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>
                </div>
              </form>
              <hr />
              <div className="text-center">
                Don't have an account? <Link to="register">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;