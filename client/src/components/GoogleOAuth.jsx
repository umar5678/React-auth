import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/user/userSlice";

const GoogleOAuth = () => {
  const dispatch = useDispatch();
  const hndlGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const results = await signInWithPopup(auth, provider);
      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: results.user.displayName,
          email: results.user.email,
          photo: results.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(loginSuccess(data));
    } catch (err) {
      console.log("could not login with google", err);
    }
  };
  return (
    <button
      onClick={hndlGoogleAuth}
      type="button"
      className="bg-red-600 text-white p-3 rounded-xl text-xl  hover:opacity-95 transition-colors"
    >
      Continue with Google
    </button>
  );
};

export default GoogleOAuth;
