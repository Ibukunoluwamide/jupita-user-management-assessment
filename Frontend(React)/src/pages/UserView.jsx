import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'sonner';
import AppLayout from '../layouts/AppLayout';
import Loader from '../components/Loader';

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
                toast.error(err.response?.data?.message || 'Failed to fetch user');
                navigate('/users');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, [id, navigate]);

    if (loading) {
        return <Loader />;
    }

    return (
        <AppLayout title="View User">
            <div className="container mx-auto px-4 py-8 max-w-lg">
                <div className="bg-white shadow-md rounded px-8 pt-6 pb-8">

                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-bold mb-2">
                            Full Name
                        </label>
                        <p className="border rounded px-3 py-2 bg-gray-50">
                            {user?.full_name}
                        </p>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-600 text-sm font-bold mb-2">
                            Email Address
                        </label>
                        <p className="border rounded px-3 py-2 bg-gray-50">
                            {user?.email}
                        </p>
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <Link
                            to={`/users/${id}/edit`}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                        >
                            Edit
                        </Link>

                        <button
                            onClick={() => navigate('/users')}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200"
                        >
                            Back
                        </button>
                    </div>

                </div>
            </div>
        </AppLayout>
    );
};

export default UserView;
