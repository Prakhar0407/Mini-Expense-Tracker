import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { registerAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";

// Validations
const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirming your password is required"),
});

const RegistrationForm = () => {
  // Navigate
  const navigate = useNavigate();

  // Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: registerAPI,
    mutationKey: ["register"],
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => console.log(e));
    },
  });

  // Redirect after successful registration
  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        navigate("/login");
      }
    }, 3000);
  }, [isSuccess, navigate]);

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="max-w-md mx-auto my-10 p-8 bg-gray-800 rounded-xl shadow-xl space-y-6 border border-gray-300"
    >
      <h2 className="text-3xl font-semibold text-center text-white mb-4">
        Sign Up
      </h2>
      
      {/* Display messages */}
      {isPending && <AlertMessage type="loading" message="Loading...." />}
      {isError && <AlertMessage type="error" message={error?.response?.data?.message || "Something went wrong. Please try again."} />}
      {isSuccess && <AlertMessage type="success" message="Registration success" />}

      <p className="text-sm text-center text-gray-500 mb-4">Join our community now!</p>

      {/* Input Field - Username */}
      <div className="relative">
        <FaUser className="absolute top-3 left-3 text-gray-400" />
        <input
          id="username"
          type="text"
          {...formik.getFieldProps("username")}
          placeholder="Username"
          className="pl-10 pr-4 py-3 w-full rounded-md border border-gray-300 focus:border-teal-500 focus:ring-teal-500 transition duration-300"
        />
        {formik.touched.username && formik.errors.username && (
          <span className="text-xs text-red-500">{formik.errors.username}</span>
        )}
      </div>

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

      {/* Input Field - Confirm Password */}
      <div className="relative">
        <FaLock className="absolute top-3 left-3 text-gray-400" />
        <input
          id="confirmPassword"
          type="password"
          {...formik.getFieldProps("confirmPassword")}
          placeholder="Confirm Password"
          className="pl-10 pr-4 py-3 w-full rounded-md border border-gray-300 focus:border-teal-500 focus:ring-teal-500 transition duration-300"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword && (
          <span className="text-xs text-red-500">
            {formik.errors.confirmPassword}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-semibold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-300"
      >
        Register
      </button>
    </form>
  );
};

export default RegistrationForm;
