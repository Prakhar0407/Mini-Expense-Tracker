import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { FaWallet } from "react-icons/fa";
import { SiDatabricks } from "react-icons/si";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { addCategoryAPI } from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  name: Yup.string().required("Category name is required"),
  type: Yup.string()
    .required("Category type is required")
    .oneOf(["income", "expense"]),
});

const AddCategory = () => {
  // Navigate
  const navigate = useNavigate();

  // Mutation
  const { mutateAsync, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: addCategoryAPI,
    mutationKey: ["addCategory"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      name: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then(() => {
          navigate("/categories");
        })
        .catch((e) => console.log(e));
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center px-4 py-8">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 space-y-6"
      >
        <div className="text-center">
          <h2 className="text-3xl font-semibold text-gray-800">Add New Category</h2>
        </div>

        {/* Display alert message */}
        {isError && (
          <AlertMessage
            type="error"
            message={error?.response?.data?.message || "Something happened. Please try again later."}
          />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Category added successfully. Redirecting..." />
        )}

        {/* Category Type Field */}
        <div className="space-y-4">
          <label
            htmlFor="type"
            className="flex gap-2 items-center text-gray-700 font-medium"
          >
            <FaWallet className="text-teal-500" />
            <span>Transaction Type</span>
          </label>
          <select
            {...formik.getFieldProps("type")}
            id="type"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 transition duration-200"
          >
            <option value="">Select transaction type</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
          {formik.touched.type && formik.errors.type && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.type}</p>
          )}
        </div>

        {/* Category Name Field */}
        <div className="space-y-4">
          <label htmlFor="name" className="text-gray-700 font-medium">
            <SiDatabricks className="inline mr-2 text-teal-500" />
            Category Name
          </label>
          <input
            type="text"
            {...formik.getFieldProps("name")}
            placeholder="Category Name"
            id="name"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 transition duration-200"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.name}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-md focus:outline-none focus:ring-4 focus:ring-teal-500 transition duration-200"
        >
          {isPending ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
