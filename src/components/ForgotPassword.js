import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";

const ForgotPassword = () => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`https://version-control-system-be.onrender.com/forgotPassword`, values);
        if (response) {
          setIsEmailSent(true);
        }
      } catch (error) {
        console.log("Error: ", error);
        alert(error.response.data.message);
      }
    },
  });
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-4">
          <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header">
              <h3 className="text-center font-weight-light my-4">Forgot Password?</h3>
            </div>
            {!isEmailSent ? (
              <div className="card-body">
                <p>
                  To reset your password, enter your email below and submit. An
                  email will be sent to you with a link to reset your password.
                </p>
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
                  <div className="mt-4">
                    <div className="d-grid">
                      <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                  </div>
                </form>
              </div>
            ) : (
              <div className="card-body">
                Check your email and click the verification link inside to reset
                your password.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;