import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePharmacies = () => {
    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        const fetchPharmacies = async () => {
            const response = await axios.get('/api/pharmacies');
            console.log(response.data);
            setPharmacies(response.data);
        };
    
        fetchPharmacies();
    }, []);

    return pharmacies;
};
