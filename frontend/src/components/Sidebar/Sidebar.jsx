import { usePharmacies } from '../../hooks/usePharmacies';
import { useState } from 'react';
import s from './Sidebar.module.css';
import pharmacyPhoto from "../../assets/pharmacy.png"

function Sidebar({ onSelectPharmacy }) {
    const pharmacies = usePharmacies();
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);

    const handleSelectPharmacy = (pharmacy) => {
        setSelectedPharmacy(pharmacy._id);
        onSelectPharmacy(pharmacy);
    };

    return (
        <div className={s.sidebar}>
            {pharmacies.map((pharmacy) => (
            <div key={pharmacy._id} // Переконайтеся, що використовуєте _id як ключ
                    className={`${s.pharmacyItem} ${selectedPharmacy === pharmacy._id ? s.selected : ''}`} 
                    onClick={() => handleSelectPharmacy(pharmacy)}>
                <img src={pharmacy.imageUrl || pharmacyPhoto} alt={pharmacy.name} className={s.pharmacyItemImage} />
                <div className={s.pharmacyItemDetails}>
                    <h3 className={s.pharmacyItemName}>{pharmacy.name}</h3>
                    <p className={s.pharmacyItemDescription}>{pharmacy.description}</p>
                </div>
            </div>
            ))}
        </div>
    );
}

export default Sidebar;
