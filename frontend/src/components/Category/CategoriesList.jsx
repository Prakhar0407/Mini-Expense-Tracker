import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteCategoryAPI,
  listCategoriesAPI,
} from "../../services/category/categoryService";
import AlertMessage from "../Alert/AlertMessage";

const CategoriesList = () => {
  // fetching
  const { data, isError, isLoading, error, refetch } = useQuery({
    queryFn: listCategoriesAPI,
    queryKey: ["list-categories"],
  });

  // Deleting
  const navigate = useNavigate();

  // Mutation for deleting category
  const {
    mutateAsync,
    isPending,
    error: categoryErr,
    isSuccess,
  } = useMutation({
    mutationFn: deleteCategoryAPI,
    mutationKey: ["delete-category"],
  });

  // Delete handler
  const handleDelete = (id) => {
    mutateAsync(id)
      .then((data) => {
        // refetch data
        refetch();
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 flex items-center justify-center px-4 py-8">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 space-y-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Categories
        </h2>

        {/* Display message */}
        {isLoading && <AlertMessage type="loading" message="Loading..." />}
        {isError && (
          <AlertMessage type="error" message={error?.response?.data?.message || "An error occurred."} />
        )}

        {/* Categories List */}
        <ul className="space-y-4">
          {data?.map((category) => (
            <li
              key={category?._id}
              className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition duration-200"
            >
              <div>
                <span className="text-lg font-medium text-gray-800">{category?.name}</span>
                <span
                  className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    category.type === "income"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {category?.type?.charAt(0).toUpperCase() + category?.type?.slice(1)}
                </span>
              </div>
              <div className="flex space-x-4">
                <Link to={`/update-category/${category._id}`}>
                  <button className="text-blue-500 hover:text-blue-700 transition duration-200">
                    <FaEdit />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(category?._id)}
                  className="text-red-500 hover:text-red-700 transition duration-200"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default CategoriesList;
