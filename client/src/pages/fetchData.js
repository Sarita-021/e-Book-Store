import { useEffect, useState } from 'react';
import axios from 'axios';

const Data = () => {
    const [da, setDa] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get('/all-books');
                setDa(response);
            } catch (error) {
                console.error(error.message);
            }
        }

        fetchData();
    }, []);

    return da;
};

export default Data;