import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { currUser } = useSelector((state) => state.user);
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
          <Link to="/profile">
            {currUser ? (
              <img
                src={currUser.profilePhoto}
                alt="profile"
                className="h-8 w-8 rounded-full object-cover"
              />
            ) : (
              <li>Signup</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
