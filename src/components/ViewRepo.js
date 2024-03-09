import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";

const ViewRepo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [repo, setRepo] = useState({});
  const [isloading, setIsLoading] = useState(true);

  const getOneRepo = async () => {
    try {
      const response = await axios.get(`https://version-control-system-be.onrender.com/repo/${params.repoId}`, { withCredentials: true });
      if (response) {
        setRepo({ ...response.data.repo });
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getOneRepo();
  }, []);

  const deleteRepo = async (repo) => {
    try {
      const response = await axios.delete(`https://version-control-system-be.onrender.com/repo/${repo._id}`, { withCredentials: true });
      if (response) {
        navigate(-1);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return isloading ? (
    <div className="d-flex justify-content-center spinner">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="text-center my-5">
      <h3>{repo.repoName} repository</h3>
      <div className="container mt-4">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6">
            {repo.version && (
              <div className="card shadow text-center">
                <div className="card-header text-muted">Last updated at: {moment(repo.version[repo.version.length - 1].updatedAt).format("DD-MMM-YYYY hh:mm:ss A")}</div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <Link to={`/edit-repo/${repo._id}`} className="btn btn-success btn-sm">Commit changes</Link>
                    <h6 className="card-title">Number of commit(s): {repo.version.length}</h6>
                    <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteRepo(repo)}>Delete this repository</button>
                  </div>
                  <div className="d-flex flex-column-reverse">
                    {repo.version.map((val, index) => {
                      return (
                        <div className="card shadow-sm text-center mb-3" key={index}>
                          <div className="card-header">
                            <h6>{val.comment}</h6>
                          </div>
                          <div className="card-body">
                            <p className="card-text">{val.content}</p>
                          </div>
                          <div className="card-footer text-muted">Updated at: {moment(val.updatedAt).format("DD-MMM-YYYY hh:mm:ss A")}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="card-footer text-muted">Created at: {moment(repo.createdAt).format("DD-MMM-YYYY hh:mm:ss A")}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewRepo;