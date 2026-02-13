import api from './api';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export const useCurrentUser = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get('/user/me'); 
                setUser(response.data);
                // console.log(user);
        
            } catch (error) {
                console.error('Failed to fetch current user', error);
                navigate('/login');
            }
        };
        fetchUser();
    }, [navigate]);

    return user;
};
