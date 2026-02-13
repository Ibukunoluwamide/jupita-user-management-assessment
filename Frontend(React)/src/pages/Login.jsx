import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { toast } from 'sonner';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
    //    console.log(formData);
        
        try {
            setLoading(true)
            const response = await api.post('/login', formData);

            localStorage.setItem('token', response.data.access_token);
            navigate('/users');
            toast.success('Login successful');
        } catch (err) {
            console.log(err.response);
            toast.error(err.response?.data?.message || 'Login failed');
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder='user@example.com'
                            className="w-full px-3 py-2 border border-blue-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-3 py-2 border border-blue-500   rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
                    >
                      {loading ? 'Logging in..' :'Log In'}  
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
