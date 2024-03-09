import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import useFindUser from "./Hooks/useFindUser";
import AuthContext from "./Context/AuthContext";
import PrivateRoutes from "./components/PrivateRoutes";
import ViewRepo from "./components/ViewRepo";
import EditRepo from "./components/EditRepo";
import CreateRepo from "./components/CreateRepo";
import NavBar from "./components/NavBar";

function App() {
  const [user, setUser, loading] = useFindUser();

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route element={<PrivateRoutes />}>
          <Route element={<NavBar />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create-repo" element={<CreateRepo />} />
            <Route path="/view-repo/:repoId" element={<ViewRepo />} />
            <Route path="/edit-repo/:repoId" element={<EditRepo />} />
          </Route>
        </Route>
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;