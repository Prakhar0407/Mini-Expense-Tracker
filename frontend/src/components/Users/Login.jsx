import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { loginAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";
import { loginAction } from "../../redux/slice/authSlice";

// Validation Schema
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string()
    .min(5, "Password must be at least 5 characters long")
    .required("Password is required"),
});

const LoginForm = () => {
  // Navigation and Dispatch
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: loginAPI,
    mutationKey: ["login"],
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          dispatch(loginAction(data));
          localStorage.setItem("userInfo", JSON.stringify(data));
        })
        .catch((e) => console.log(e));
    },
  });

  // Redirect on success
  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate("/profile");
      }, 3000);
    }
  }, [isSuccess, navigate]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto my-10 p-8 bg-gray-800 rounded-xl shadow-xl space-y-6 border border-gray-300"
    >
      <h2 className="text-3xl font-semibold text-center text-white mb-4">
        Login
      </h2>

      {/* Display messages */}
      {isPending && <AlertMessage type="loading" message="Logging you in..." />}
      {isError && <AlertMessage type="error" message={error?.response?.data?.message || "Something went wrong. Please try again."} />}
      {isSuccess && <AlertMessage type="success" message="Login successful! Redirecting..." />}

      {/* Input Field - Email */}
      <div className="relative">
        <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
        <input
          id="email"
          type="email"
          {...formik.getFieldProps("email")}
          placeholder="Email"
          className="pl-10 pr-4 py-3 w-full rounded-md border border-gray-300 focus:border-teal-500 focus:ring-teal-500 transition duration-300"
        />
        {formik.touched.email && formik.errors.email && (
          <span className="text-xs text-red-500">{formik.errors.email}</span>
        )}
      </div>

      {/* Input Field - Password */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="password"
          type="password"
          {...formik.getFieldProps("password")}
          placeholder="Password"
          className="pl-10 pr-4 py-3 w-full rounded-md border border-gray-300 focus:border-teal-500 focus:ring-teal-500 transition duration-300"
        />
        {formik.touched.password && formik.errors.password && (
          <span className="text-xs text-red-500">{formik.errors.password}</span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
      >
        {isPending ? "Logging In..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
