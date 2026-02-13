import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/api';
import AppLayout from '../layouts/AppLayout';
import Table from '../components/Table';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Loader from '../components/Loader';
import { toast } from 'sonner';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                if (error.response?.status === 401) {
                    navigate('/login');
                }
            }
        };
        fetchUsers();
    }, [users, navigate]);

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/users/${id}`);
                toast.success("User deleted succesful")
            } catch (error) {
                console.error('Error deleting user:', error);
                alert('Failed to delete user.');
            }
        }
    };

    const columns = [
        { header: "Full Name", accessor: "full_name" },
        { header: "Email", accessor: "email" },
        { header: "Date", accessor: "created_at" },
    ];



    const actions = [
        {
            icon: <EyeIcon className="size-6 text-blue-500 hover:text-blue-700 transition" />,
            onClick: (row) => navigate(`/users/${row.id}`),
        },
        {
            icon: <PencilSquareIcon className="size-6 text-amber-500 hover:text-amber-700 transition" />,
            onClick: (row) => navigate(`/users/${row.id}/edit`),
        },
        {
            icon: <TrashIcon className="size-6 text-red-500 hover:text-red-700 transition" />,
            onClick: (row) => handleDelete(row.id),
        },
    ];




    return (
        <AppLayout title='Users'>
            <div className="container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">User Management</h1>

                </div>

                <Table columns={columns} data={users} actions={actions} />
            </div>

        </AppLayout>
    );
};

export default UserList;
