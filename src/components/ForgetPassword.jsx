import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { closeIcon, signup } from "../assets";

const ForgetPassword = () => {
  const location = useLocation();
  const { emailId, password } = location.state || {};
  const [oldPassword, setOldPassword] = useState(password || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await axios.get("https://copartners.in:5130/api/Users?userType=RA&page=1&pageSize=10");
        const users = response.data.data;
        const user = users.find((user) => user.email.toLowerCase() === emailId.toLowerCase());

        if (user) {
          setUserId(user.userId);
        } else {
          setError("Email not found.");
        }
      } catch (error) {
        setError("Failed to fetch user data.");
      }
    };

    if (emailId) {
      fetchUserId();
    }
  }, [emailId]);

  const handleClose = () => {
    navigate("/signup");
  };

  const handleContinue = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!userId) {
      setError("Mention your Email and Password in Sign Up.");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.");
      setLoading(false);
      return;
    }

    const passwordValidation = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    if (!passwordValidation.test(newPassword)) {
      setError("Password must be at least 8 characters long, include one uppercase letter, one special character, and one number.");
      setLoading(false);
      return;
    }

    const postData = {
      id: userId,
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    try {
      const response = await axios.post(
        "https://copartners.in:5130/api/Users/ResetPassword",
        postData
      );

      if (response.status !== 200) {
        toast.error("Something wrong happened!", {
          position: "top-right",
        });
      } else {
        toast.success("Password reset successful!", {
          position: "top-right",
        });
        navigate("/signup");
      }
    } catch (error) {
      toast.error("Failed to submit data. Please try again.", {
        position: "top-right",
      });
      setError("Failed to submit data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className="h-screen w-screen md:ml-[-7rem]"
        style={{
          backgroundImage: `url(${signup})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50 w-screen h-screen">
        <div className="bg-[#18181B] border-[1px] border-[#ffffff2a] m-4 p-6 rounded-lg w-96 relative text-center">
          <div className="absolute top-3 right-0 text-right">
            <button
              onClick={handleClose}
              className="text-gray-400 w-8 text-[20px] cursor-pointer hover:text-white"
            >
              <img src={closeIcon} alt="close" />
            </button>
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white">Reset Your Password</h2>
          </div>
          <p className="text-gray-300 text-center mb-4">
            Enter your new password below.
          </p>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="w-full flex gap-2 flex-col justify-between">
            <div className="w-full mx-auto h-[50px]">
              <input
                type="password"
                placeholder="New Password"
                className="bg-[#06030E] rounded-[10px] border border-[#18181B] w-full h-full text-white font-[400] text-[14px] p-2"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="w-full mx-auto h-[50px]">
              <input
                type="password"
                placeholder="Confirm New Password"
                className="bg-[#06030E] rounded-[10px] border border-[#18181B] w-full h-full text-white font-[400] text-[14px] p-2"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            <button
              onClick={handleContinue}
              className="w-full h-[50px] bg-white font-[500] text-[16px] leading-[20px] text-center rounded-[10px]"
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
