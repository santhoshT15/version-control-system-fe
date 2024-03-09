import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditRepo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [repo, setRepo] = useState({});
  const [isloading, setIsLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      content: "",
      comment: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.put(`https://version-control-system-be.onrender.com/repo/update/${params.repoId}`, values, { withCredentials: true });
        if (response) {
          alert(response.data.message);
          navigate(-1);
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    },
  });

  const getLatestCommit = async () => {
    try {
      const response = await axios.get(`https://version-control-system-be.onrender.com/repo/${params.repoId}`, { withCredentials: true });
      if (response) {
        const repoData = response.data.repo;
        setRepo({ ...repoData });
        const len = repoData.version.length;
        formik.setValues({
          content: repoData.version[len - 1].content,
          comment: "",
        });
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLatestCommit();
  }, []);

  return isloading ? (
    <div className="d-flex justify-content-center spinner">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="text-center my-5">
      <h3>Commit changes in {repo.repoName} repository</h3>
      <div className="container my-4">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <form onSubmit={formik.handleSubmit}>
              <div className="row shadow rounded-3 p-3 pt-4">
                <div className="col-lg-12">
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
                  <button type="submit" className="btn btn-success btn-sm">Commit changes</button>
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

export default EditRepo;