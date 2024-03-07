import { useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import ProductList from '../../components/Products/ProductList/ProductList';

function ProductListPage() {
    const [selectedPharmacy, setSelectedPharmacy] = useState(null);

    return (
      <div className="app">
        <Sidebar onSelectPharmacy={setSelectedPharmacy} />
        <ProductList pharmacy={selectedPharmacy} />
      </div>
    );
  }

export default ProductListPage;
