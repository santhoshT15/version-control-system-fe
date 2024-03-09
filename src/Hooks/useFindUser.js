import axios from "axios";
import { useEffect, useState } from "react";

const useFindUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUser = async () => {
    try {
      const response = await axios.get(`https://version-control-system-be.onrender.com/user`, { withCredentials: true });
      if (response.data.success) {
        setUser(response.data.user);
        setLoading(false);
      }
    } catch (error) {
      console.log("Error: ", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return [user, setUser, loading];
};

export default useFindUser;