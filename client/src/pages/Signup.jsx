import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
      <form className="flex flex-col justify-center  gap-3">
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="bg-slate-200 p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="bg-slate-200 p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Username"
          id="password"
          className="bg-slate-200 p-3 rounded-lg"
        />
        <button className="bg-slate-800 px-4 py-2 w-fit rounded-xl mx-auto text-white hover:opacity-95 disabled:opacity-70">
          Sign Up
        </button>
      </form>
      <div className="">
        <p className="pt-2">
          Already have an account?{" "}
          <Link to="/log-in">
            <span className="text-blue-500 font-semibold">Login instead</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
