import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setMyLocation } from "../MapPage/MapSlice";
import { getFakeLocation } from "./FAKE_LOCATIONS";
import { connectionWithSocketIOServer } from "../socketConnection/socketConnection";
import { proceedWithLogin } from "../store/actions/LoginPageActions";
import { connectWithPeerServer } from "../realtimeCommunication/webRTCHandler";

const isUserNameValid = (username) => {
  return username.length > 0 && username.length < 10 && !username.includes(" ");
};
const locationOptions = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [locationError, setLocationError] = useState(false);

  const myLocation = useSelector((state) => state.map.myLocation);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChangeValue = (e) => {
    setUsername(e.target.value);
  };
  const handleLogin = () => {
    proceedWithLogin({
      username,
      coords: {
        lat: myLocation.lat,
        lng: myLocation.lng,
      },
    });
    navigate("/map");
  };

  const onSuccess = (position) => {
    dispatch(
      setMyLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      })
    );
  };
  const onError = (error) => {
    console.log(error);
    setLocationError(true);
  };
  useEffect(() => {
    // navigator.geolocation.getCurrentPosition(
    //   onSuccess,
    //   onError,
    //   locationOptions
    // );
    onSuccess(getFakeLocation());
  }, []);

  useEffect(() => {
    if (myLocation) {
      connectionWithSocketIOServer();
      connectWithPeerServer();
    }
  }, [myLocation]);
  return (
    <div className="flex items-center justify-center min-h-screen bg-rose-50">
      <div className="relative flex flex-col m-6 space-y-10 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 md:m-0">
        <div className="p-6 md:p-20">
          <h2 className="font-mono mb-5 text-4xl font-bold">Log In</h2>
          <p className="max-w-sm mb-12 font-sans font-light text-gray-600">
            Log in to your account to chat with your friends!.
          </p>
          <input
            type="text"
            className="w-full p-6 border border-gray-300 rounded-md placeholder:font-sans placeholder:font-light"
            placeholder="Enter your username"
            value={username}
            onChange={handleChangeValue}
          />
          <div className="flex flex-col items-center justify-end mt-6 space-y-6 md:flex-row md:space-y-0">
            <button
              className="w-full md:w-auto flex justify-center items-center p-6 space-x-4 font-sans
             font-bold text-white rounded-md shadow-lg px-9 bg-cyan-700 shadow-cyan-100
              hover:bg-opacity-90 shadow-sm hover:shadow-lg border transition
               hover:-translate-y-0.5 duration-150 disabled:bg-gray-200 disabled:shadow-gray-100"
              onClick={handleLogin}
              disabled={!isUserNameValid(username) || locationError}
            >
              <span>Next</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-7"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <line x1="5" y1="12" x2="19" y2="12" />
                <line x1="13" y1="18" x2="19" y2="12" />
                <line x1="13" y1="6" x2="19" y2="12" />
              </svg>
            </button>
          </div>
        </div>
        <img
          src="/images/login-image.jpg"
          alt=""
          className="w-[430px] hidden md:block rounded-3xl"
        />
      </div>
    </div>
  );
};

export default LoginPage;
