import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  FaDollarSign,
  FaCalendarAlt,
  FaRegCommentDots,
  FaWallet,
} from "react-icons/fa";
import { listCategoriesAPI } from "../../services/category/categoryService";
import { addTransactionAPI } from "../../services/transactions/transactionService";
import AlertMessage from "../Alert/AlertMessage";

const validationSchema = Yup.object({
  type: Yup.string()
    .required("Transaction type is required")
    .oneOf(["income", "expense"]),
  amount: Yup.number()
    .required("Amount is required")
    .positive("Amount must be positive"),
  category: Yup.string().required("Category is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string(),
});

const TransactionForm = () => {
  // Navigate
  const navigate = useNavigate();

  // Mutation
  const {
    mutateAsync,
    isPending,
    isError: isAddTranErr,
    error: transErr,
    isSuccess,
  } = useMutation({
    mutationFn: addTransactionAPI,
    mutationKey: ["add-transaction"],
  });

  // Fetching Categories
  const { data, isError, isLoading, isFetched, error, refetch } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  const formik = useFormik({
    initialValues: {
      type: "",
      amount: "",
      category: "",
      date: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutateAsync(values)
        .then(() => {
          console.log("Transaction added successfully");
          // Optionally navigate somewhere after success
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
          <h2 className="text-3xl font-semibold text-gray-800">Transaction Details</h2>
        </div>

        {/* Display alert message */}
        {isError && (
          <AlertMessage
            type="error"
            message={error?.response?.data?.message || "Something went wrong, please try again later."}
          />
        )}
        {isSuccess && (
          <AlertMessage type="success" message="Transaction added successfully!" />
        )}

        {/* Transaction Type Field */}
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
            <p className="text-red-500 text-xs">{formik.errors.type}</p>
          )}
        </div>

        {/* Amount Field */}
        <div className="space-y-4">
          <label htmlFor="amount" className="text-gray-700 font-medium">
            <FaDollarSign className="inline mr-2 text-teal-500" />
            Amount
          </label>
          <input
            type="number"
            {...formik.getFieldProps("amount")}
            id="amount"
            placeholder="Amount"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 transition duration-200"
          />
          {formik.touched.amount && formik.errors.amount && (
            <p className="text-red-500 text-xs">{formik.errors.amount}</p>
          )}
        </div>

        {/* Category Field */}
        <div className="space-y-4">
          <label htmlFor="category" className="text-gray-700 font-medium">
            <FaRegCommentDots className="inline mr-2 text-teal-500" />
            Category
          </label>
          <select
            {...formik.getFieldProps("category")}
            id="category"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 transition duration-200"
          >
            <option value="">Select a category</option>
            {data?.map((category) => {
              return (
                <option key={category?._id} value={category?.name}>
                  {category?.name}
                </option>
              );
            })}
          </select>
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-xs">{formik.errors.category}</p>
          )}
        </div>

        {/* Date Field */}
        <div className="space-y-4">
          <label htmlFor="date" className="text-gray-700 font-medium">
            <FaCalendarAlt className="inline mr-2 text-teal-500" />
            Date
          </label>
          <input
            type="date"
            {...formik.getFieldProps("date")}
            id="date"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 transition duration-200"
          />
          {formik.touched.date && formik.errors.date && (
            <p className="text-red-500 text-xs">{formik.errors.date}</p>
          )}
        </div>

        {/* Description Field */}
        <div className="space-y-4">
          <label htmlFor="description" className="text-gray-700 font-medium">
            <FaRegCommentDots className="inline mr-2 text-teal-500" />
            Description (Optional)
          </label>
          <textarea
            {...formik.getFieldProps("description")}
            id="description"
            placeholder="Description"
            rows="4"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-teal-500 transition duration-200"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-xs">{formik.errors.description}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-4 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-md focus:outline-none focus:ring-4 focus:ring-teal-500 transition-colors duration-200"
        >
          {isPending ? "Submitting..." : "Submit Transaction"}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
