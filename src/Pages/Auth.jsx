import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import google from "../assets/google.png";
import facebook from "../assets/facebook.avif";

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConformPassword, setShowConformPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (isLogin) {
      if (!storedUser) {
        alert("User not found. Please signup first.");
        return;
      }

      if (storedUser.EmailAddress !== data.EmailAddress) {
        alert("Email is incorrect");
        return;
      }

      if (storedUser.Password !== data.Password) {
        alert("Password is incorrect");
        return;
      }

      alert("Login successful!");
    } else {
      if (data.Password !== data.ConformPassword) {
        alert("Passwords do not match");
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));
      alert("Signup successful! Now you can login.");
      setIsLogin(true);
    }
  };
  const handleForgotPassword = () => {
    const email = prompt("Enter your registered email");

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.EmailAddress === email) {
      const newPassword = prompt("Enter new password");

      storedUser.Password = newPassword;

      localStorage.setItem("user", JSON.stringify(storedUser));

      alert("Password reset successful");
    } else {
      alert("Email not found. Please signup first.");
    }
  };
  return (
    <div className="flex items-center bg-white min-h-screen">
      <div className="container mx-auto px-6 py-6">
        <div className="flex flex-col lg:flex-row rounded-xl shadow-xl overflow-hidden">
          {/* Left side  */}
          <div className="w-full lg:w-1/2 p-12">
            <div className="flex flex-col">
              <h3 className="text-3xl text-gray-700 mb-2 font-bold">
                {isLogin ? "Welcome back " : "Create account"}{" "}
              </h3>
              <p className="text-gray-700">
                {isLogin
                  ? "Login to your forever account"
                  : "Join to your forever account "}
              </p>
              {/* social button */}
              <div className="grid grid-cols-2 gap-6 mt-6">
                <button className="flex items-center justify-center border gap-2 py-2 border-gray-300">
                  <img className="w-7" src={google} alt="img_google" />
                  Google
                </button>

                <button className="flex items-center justify-center border gap-2 py-2 border-gray-300">
                  <img className="w-7" src={facebook} alt="img_facebook" />
                  Facebook
                </button>
              </div>
              {/* Line */}
              <div className="flex items-center gap-4 mt-6">
                <div className="grow border-t border-gray-300"></div>
                <span className="text-gray-700">or</span>
                <div className="grow border-t border-gray-300"></div>
              </div>
              {/* form Authentication */}
              <form onSubmit={handleSubmit(onSubmit)}>
                {/* First name and last name field */}
                {!isLogin && (
                  <div className="grid grid-cols-2 gap-4  mt-6">
                    <div>
                      <label className="block text-gray-700 mb-2 ">
                        First Name{" "}
                      </label>
                      <input
                        {...register("firstName", {
                          required: true,
                          minLength: {
                            value: 3,
                            message: "Password must be at least 3 characters",
                          },
                        })}
                        className={`w-full px-4 py-2 border border-gray-300 rounded outline-none placeholder:text-sm ${errors.firstName ? "border-red-500" : ""}`}
                        placeholder="Enter your First Name "
                        type="text"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2 ">
                        Last Name{" "}
                      </label>
                      <input
                        {...register("LastName", {
                          required: true,
                          minLength: {
                            value: 4,
                            message: "Password must be at least 4 characters",
                          },
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded outline-none placeholder:text-sm "
                        placeholder="Enter your Last Name "
                        type="text"
                      />
                    </div>
                  </div>
                )}
                {/* Email field */}
                <div className="mb-4 mt-6">
                  <label className="block text-gray-700 mb-2">
                    Email address
                  </label>
                  <input
                    {...register("EmailAddress", { required: true })}
                    className="border-gray-300 w-full px-4 py-2 border outline-none placeholder:text-sm"
                    placeholder="Enter your email address"
                    type="text "
                  />
                </div>
                {/* Password */}
                <div className="mb-4 mt-6">
                  <label className="block text-gray-700 mb-2">
                    Password
                    <div className="relative">
                      <input
                        {...register("Password", {
                          required: true,
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                        className={`border-gray-300 w-full px-4 py-2 border outline-none placeholder:text-sm ${
                          errors.Password ? "border-red-500" : ""
                        }`}
                        placeholder="Enter your password"
                        type={showPassword ? "text" : "password"}
                      />
                      {errors.Password && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.Password.message}
                        </p>
                      )}
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-3 right-3 text-gray-600 hover:text-gray-700 cursor-pointer"
                      >
                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                      </button>
                    </div>
                  </label>
                </div>
                {/* conform password field */}
                {!isLogin && (
                  <div className="mb-4 mt-6">
                    <label className="block text-gray-700 mb-2">
                      Conform Password
                      <div className="relative">
                        <input
                          {...register("ConformPassword", {
                            required: true,
                            minLength: 6,
                          })}
                          className={`border-gray-300 w-full px-4 py-2 border outline-none placeholder:text-sm ${errors.ConformPassword ? "border-red-500" : ""}`}
                          placeholder="Enter your conform password"
                          type={showPassword ? "text" : "password"}
                        />
                        {errors.ConformPassword && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.ConformPassword.message}
                          </p>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            setShowConformPassword(!showConformPassword)
                          }
                          className="absolute top-3 right-3 text-gray-600 hover:text-gray-700 cursor-pointer"
                        >
                          {showConformPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                      </div>
                    </label>
                  </div>
                )}

                {/* Remember checkbox */}
                {isLogin && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 ">
                      <input
                        className="w-4 h-4"
                        type="checkbox"
                        name=""
                        id=""
                      />
                      <span className=" text-sm text-gray-700 font-semibold">
                        Remember me{" "}
                      </span>
                    </div>
                    <a
                      onClick={handleForgotPassword}
                      className="text-amber-600 text-sm font-semibold hover:underline"
                    >
                      forget password{" "}
                    </a>
                  </div>
                )}
                {/* Login button */}
                <div className="mt-6 mb-2">
                  <button className=" w-full bg-amber-600 text-white font-bold rounded cursor-pointer py-2 ">
                    {isLogin ? "Login" : "signup"}
                  </button>
                </div>
                <p className="text-sm text-center text-gray-600">
                  {isLogin
                    ? "Dent's have account "
                    : "If yoy have already account "}
                  <span
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-amber-600 hover:underline ml-2 cursor-pointer "
                  >
                    {isLogin ? "sign up" : "Login"}
                  </span>
                </p>
              </form>
            </div>
          </div>

          {/* Right side */}
          <div className=" relative bg-cover bg-center items-center justify-center text-white  w-full lg:w-1/2 bg-[url('/src/assets/imageForm.avif')]">
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white text-xl">
                <h3 className="text-3xl font-bold">
                  Login your account and explore it.
                </h3>
                <p className="max-w-sm mx-auto ">
                  {" "}
                  Login your account and save orders, carts items and enjoy
                  offers{" "}
                </p>
                <button className="mt-6 px-6 py-2 border-2 border-white rounded cursor-pointer font-bold">
                  Create an Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
