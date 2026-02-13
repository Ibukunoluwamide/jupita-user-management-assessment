import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'sonner';
import AppLayout from '../layouts/AppLayout';

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditMode = id !== undefined;

    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);



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

    return (
        <AppLayout title={isEditMode ? 'Edit User' : 'Create New User'}>
            <div className="container mx-auto px-4 py-8 max-w-lg">
                

                <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="full_name">
                            Full Name
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-blue-500   rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            id="full_name"
                            type="text"
                            placeholder="John Doe"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-blue-500   rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            id="email"
                            type="email"
                            placeholder="john@example.com"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password {isEditMode && <span className="text-gray-500 font-normal text-xs">(Leave blank to keep current)</span>}
                        </label>
                        <input
                            className="w-full px-3 py-2 border border-blue-500   rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            id="password"
                            type="password"
                            placeholder="******************"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required={!isEditMode}
                            minLength={8}
                        />
                    </div>

                    <div className="flex items-center justify-end">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? 'Saving...' : (isEditMode ? 'Update User' : 'Create User')}
                        </button>
                      
                    </div>
                </form>
            </div>
        </AppLayout>
    );
};

export default UserForm;
