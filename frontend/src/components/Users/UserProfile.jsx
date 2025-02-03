import React from "react";
import { FaUserCircle, FaEnvelope, FaLock } from "react-icons/fa";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import UpdatePassword from "./UpdatePassword";
import { updateProfileAPI } from "../../services/users/userService";
import AlertMessage from "../Alert/AlertMessage";

const UserProfile = () => {
  // Mutation for updating profile
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: updateProfileAPI,
    mutationKey: ["update-profile"],
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
    },

    // Submit handler
    onSubmit: (values) => {
      mutateAsync(values)
        .then((data) => {
          console.log(data);
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 space-y-6">
          <h1 className="text-3xl font-semibold text-gray-800 text-center mb-6">
            Hello, User!
          </h1>
          <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            Update Your Profile
          </h3>

          {/* Display message */}
          {isPending && <AlertMessage type="loading" message="Updating..." />}
          {isError && (
            <AlertMessage type="error" message={error?.response?.data?.message || "An error occurred."} />
          )}
          {isSuccess && (
            <AlertMessage type="success" message="Profile updated successfully" />
          )}

          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* User Name Field */}
            <div className="flex items-center space-x-4">
              <FaUserCircle className="text-3xl text-gray-400" />
              <div className="flex-1">
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  {...formik.getFieldProps("username")}
                  type="text"
                  id="username"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your username"
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <span className="text-xs text-red-500">
                  {formik.errors.username}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="flex items-center space-x-4">
              <FaEnvelope className="text-3xl text-gray-400" />
              <div className="flex-1">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...formik.getFieldProps("email")}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-4 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your email"
                />
              </div>
              {formik.touched.email && formik.errors.email && (
                <span className="text-xs text-red-500">
                  {formik.errors.email}
                </span>
              )}
            </div>

            {/* Save Changes Button */}
            <div className="flex justify-end mt-6">
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition duration-200"
              >
                {isPending ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="mt-10">
        <UpdatePassword />
      </div>
    </>
  );
};

export default UserProfile;
