import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-400">
      <div className="flex justify-between items-center w-10/12 mx-auto h-14">
        <Link to="/">
          <h1 className="text-2xl font-bold">Auth App</h1>
        </Link>
        <ul className="flex text-xl gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/log-in">
            <li>Login</li>
          </Link>
          <Link to="/sign-up">
            <li>Signup</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
