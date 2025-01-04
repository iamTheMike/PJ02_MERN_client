import axios from "axios";

export const getUser = async () => {
    const token = sessionStorage.getItem('token')
    if (token) {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_USER}/getUser`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            return null;
        }
    }
    return null;
};

