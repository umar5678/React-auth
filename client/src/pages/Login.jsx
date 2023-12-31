import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from "../redux/user/userSlice";
import GoogleOAuth from "../components/GoogleOAuth";

const Login = () => {
  const [formData, setFormData] = useState({});

  const { loading, err } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const hndlChng = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const hdlSbmt = async (e) => {
    e.preventDefault();

    try {
      dispatch(loginStart());
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        dispatch(loginFailure(data));
        return;
      }
      dispatch(loginSuccess(data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailure(err));
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Log in</h1>
      <form onSubmit={hdlSbmt} className="flex flex-col justify-center  gap-3">
        <input
          onChange={hndlChng}
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-200 p-3 rounded-lg"
        />
        <input
          onChange={hndlChng}
          type="password"
          placeholder="Password"
          id="password"
          className="bg-slate-200 p-3 rounded-lg"
        />
        <button
          disabled={loading}
          className="bg-slate-800 px-4 py-2 w-fit rounded-xl mx-auto text-white hover:opacity-95 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Login"}
        </button>
        <GoogleOAuth />
      </form>
      <div className="">
        <p className="pt-2">
          Do not have an account?{" "}
          <Link to="/sign-up">
            <span className="text-blue-500 font-semibold">Signup instead</span>
          </Link>
        </p>
      </div>
      <p className="text-red-600 mt-2 font-semibold">
        {err ? err.message || "Something went wrong!" : ""}
      </p>
    </div>
  );
};

export default Login;
