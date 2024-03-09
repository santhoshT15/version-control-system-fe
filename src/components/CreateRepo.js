import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const CreateRepo = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      repoName: "",
      content: "",
      comment: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(`https://version-control-system-be.onrender.com/repo/add`, values, { withCredentials: true });
        if (response) {
          alert(response.data.message);
          navigate(-1);
        }
      } catch (error) {
        console.log("Error: ", error.message);
        alert(error.message);
      }
    },
  });

  return (
    <div className="text-center my-5">
      <h3>Create a new repository</h3>
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <form onSubmit={formik.handleSubmit}>
              <div className="row shadow rounded-3 p-3 pt-4">
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="Repository name"
                      name="repoName"
                      value={formik.values.repoName}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <input
                      type="text"
                      required
                      className="form-control"
                      placeholder="Comment"
                      name="comment"
                      value={formik.values.comment}
                      onChange={formik.handleChange}
                    />
                  </div>
                </div>
                <div className="col-lg-12 my-3">
                  <textarea
                    rows="15"
                    required
                    className="form-control"
                    placeholder="Enter your content here..."
                    name="content"
                    value={formik.values.content}
                    onChange={formik.handleChange}
                  ></textarea>
                </div>
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-success btn-sm">Create Repository</button>
                  <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => navigate(-1)}>Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRepo;