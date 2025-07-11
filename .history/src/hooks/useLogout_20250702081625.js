import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/user/userSlice.ts";
import query from "../../util/query";

const useLogout = (userInfo) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutUser = async () => {
    setLoading(true);
    const response = await query({
      method: "POST",
      url: `/auth/logout`,
      token: userInfo?.user?.user?.token,
    });
    setLoading(false);
    
    if (response.success) {
      dispatch(setUser({ 
        user: { token: "" },
        userDetails: {} 
      }));
      navigate("/");
    }
  };

  return { logOutUser, loading };
};

export default useLogout;
