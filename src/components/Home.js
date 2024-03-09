import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const Home = () => {
  const [repos, setRepos] = useState([]);
  const [isloading, setIsLoading] = useState(true);

  const getAllRepo = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/repo/view`, { withCredentials: true });
      if (response) {
        setRepos([...response.data.repos]);
        setIsLoading(false);
      }
    } catch (error) {
      console.log("Error: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllRepo();
  }, []);

  const deleteRepo = async (repo) => {
    try {
      const response = await axios.delete(`http://localhost:3001/repo/${repo._id}`, { withCredentials: true });
      if (response) {
        getAllRepo();
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
      <h3>Dashboard</h3>
      <div className="container mt-4">
        <div className="row d-flex justify-content-center">
          <div className="col-lg-6">
            <div className="card shadow text-center">
              <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                  <h5>Your repositories</h5>
                  <Link to={"/create-repo"} className="btn btn-success btn-sm">Create Repository</Link>
                </div>
              </div>
              <div className="card-body">
                {repos.length !== 0 ? (
                  <div className="d-flex flex-column-reverse">
                    {repos.map((repo, index) => {
                      const len = repo.version.length;
                      return (
                        <div className="card shadow-sm text-center mb-3" key={index}>
                          <div className="card-header">
                            <h5>{repo.repoName}</h5>
                          </div>
                          <div className="card-body">
                            <h6 className="card-title">{repo.version[len - 1].comment}</h6>
                            <p className="card-text">Last updated at: {moment(repo.version[len - 1].updatedAt).format("DD-MMM-YYYY hh:mm:ss A")}</p>
                            <div className="d-flex justify-content-evenly">
                              <Link to={`/view-repo/${repo._id}`} className="btn btn-primary btn-sm">View {len} commit(s)</Link>
                              <Link to={`/edit-repo/${repo._id}`} className="btn btn-success btn-sm">Commit changes</Link>
                              <button type="button" className="btn btn-danger btn-sm" onClick={() => deleteRepo(repo)}>Delete this repository</button>
                            </div>
                          </div>
                          <div className="card-footer text-muted">Created at: {moment(repo.createdAt).format("DD-MMM-YYYY hh:mm:ss A")}</div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <h6>No repository exist. You can create a new one.</h6>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;