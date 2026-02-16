import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api/api";
import { toast } from "sonner";
import AppLayout from "../layouts/AppLayout";
import Loader from "../components/Loader";
import { PencilSquareIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

const UserView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setUser(response.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to fetch user");
        navigate("/users");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  if (loading) return <Loader />;

  return (
    <AppLayout title="User Details">
      <div className="flex items-start justify-center px-4 ">
        <div className="w-full max-w-xl bg-white border border-gray-200 rounded-2xl shadow-lg p-8">

          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {user?.full_name}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                User information overview
              </p>
            </div>
          </div>

          <div className="space-y-6">

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                Full Name
              </p>
              <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
                {user?.full_name}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
                Email Address
              </p>
              <div className="px-4 py-3 bg-gray-50 rounded-lg border border-gray-200 text-gray-700">
                {user?.email}
              </div>
            </div>

          </div>

          <div className="flex justify-end gap-3 mt-10">

            <button
              onClick={() => navigate("/users")}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Back
            </button>

            <Link
              to={`/users/${id}/edit`}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
            >
              <PencilSquareIcon className="h-5 w-5" />
              Edit User
            </Link>

          </div>

        </div>
      </div>
    </AppLayout>
  );
};

export default UserView;
