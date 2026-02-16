import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'sonner';
import AppLayout from '../layouts/AppLayout';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import Loader from '../components/Loader';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = id !== undefined;  // check if this form is in edit mode

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);


// Fetch user data if in edit mode
    useEffect(() => {
        if (!isEditMode) return;

        const fetchUser = async () => {
            try {
                const response = await api.get(`/users/${id}`);
                const { full_name, email } = response.data;
                setFormData({ full_name, email, password: '' });
            } catch (err) {
                toast.error(err.response?.data?.message || 'Failed to fetch user')
            }
        };
        fetchUser();

    }, [id, isEditMode]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true)
            if (isEditMode) {
                const dataToSend = { ...formData };
                if (!dataToSend.password) {
                    delete dataToSend.password;
                }
                await api.put(`/users/${id}`, dataToSend);
                toast.success('User updated successful')
            } else {
                await api.post('/users', formData);
                toast.success('User created successful')
            }
            navigate('/users');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Failed to save user')
        } finally {
            setLoading(false)
        }
    };
  if (loading) return <Loader />;

   return (
    <AppLayout title={isEditMode ? "Edit User" : "Create User"}>
        <div className=" flex items-center justify-center px-4 ">
            <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl border border-gray-100 p-8">

                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isEditMode ? "Edit User" : "Create User"}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">
                        {isEditMode
                            ? "Update user information below"
                            : "Fill in the details to create a new user"}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="John Doe"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="john@example.com"
                            required
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password{" "}
                            {isEditMode && (
                                <span className="text-xs text-gray-500 font-normal">
                                    (Leave blank to keep current)
                                </span>
                            )}
                        </label>

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                required={!isEditMode}
                                minLength={8}
                                className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500 hover:text-gray-700 transition"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-6 py-2.5 rounded-lg font-semibold text-white transition duration-200
                            ${
                                loading
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                            }`}
                        >
                            {loading
                                ? isEditMode
                                    ? "Updating..."
                                    : "Creating..."
                                : isEditMode
                                ? "Update User"
                                : "Create User"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </AppLayout>
);

};

export default UserForm;
