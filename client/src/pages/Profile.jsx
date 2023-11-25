import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
} from "../redux/user/userSlice";

const Profile = () => {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imgUploadPerc, setImgUploadPerc] = useState(0);
  const [imgUploadErr, setImgUploadErr] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currUser, loading, err } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      handleFileUpload(image);
    }
  }, [image]);

  const handleFileUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;

    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImgUploadPerc(Math.round(progress));
      },
      () => {
        setImgUploadErr(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({
            ...formData,
            profilePhoto: downloadURL,
          })
        );
      }
    );
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmitAndUpdate = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (err) {
      dispatch(updateUserFailure(err));
    }
  };

  const handleDelAcc = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (err) {
      dispatch(deleteUserFailure(err));
    }
  };

  return (
    <div className="max-w-lg mx-auto p-2">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form onSubmit={handleSubmitAndUpdate} className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.profilePhoto || currUser.profilePhoto}
          alt="Profile Photo"
          className="rounded-full w-32 h-32 mx-auto my-2 cursor-pointer object-cover mt-2"
        />
        <p className="self-center">
          {imgUploadErr ? (
            <span className="text-red-600">
              Error Uploading image (file size must be less then 2 MB)
            </span>
          ) : imgUploadPerc > 0 && imgUploadPerc < 100 ? (
            <span className="text-slate-800">{`Uploading image... ${imgUploadPerc} %`}</span>
          ) : imgUploadPerc === 100 ? (
            <span className="text-green-600">Image uploaded successfully</span>
          ) : (
            ""
          )}
        </p>
        <input
          onChange={handleChange}
          defaultValue={currUser.username}
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          onChange={handleChange}
          defaultValue={currUser.email}
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          onChange={handleChange}
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80">
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between pt-2 text-lg">
        <span onClick={handleDelAcc} className="text-red-700 cursor-pointer">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-600 mt-2">{err && "Something went wrong"}</p>
      <p className="text-green-600 mt-2">
        {updateSuccess && "User is updated successfully"}
      </p>
    </div>
  );
};

export default Profile;
