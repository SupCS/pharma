import { useState, useEffect } from 'react';
import axios from 'axios';

export const usePharmacies = () => {
    const [pharmacies, setPharmacies] = useState([]);

    useEffect(() => {
        const fetchPharmacies = async () => {
            const response = await axios.get('https://asparianpharmacy-a7505c4f976a.herokuapp.com/api/pharmacies');
            console.log(response.data);
            setPharmacies(response.data);
        };
    
        fetchPharmacies();
    }, []);

    return pharmacies;
};
