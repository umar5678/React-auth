import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const hndlChng = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const hdlSbmt = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setErr(false);
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      setErr(false);
      console.log(data);
      if (data.success === false) {
        setErr(true);
        return;
      }
      navigate("/");
    } catch (err) {
      setLoading(false);
      setErr(true);
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
        {err && "Something went wrong!"}
      </p>
    </div>
  );
};

export default Login;
