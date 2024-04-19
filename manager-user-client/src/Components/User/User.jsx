import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {
  let navigate = useNavigate();
  useEffect(() => {
    let session = sessionStorage.getItem("account");
    if (!session) {
      navigate("/login");
    }
  });
  return <div>Login successfully!</div>;
};

export default User;
