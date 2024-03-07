import { useState, useEffect } from 'react';
import styles from './CartPage.module.css';
import useCart from "../../hooks/useCart" 

function CartPage() {
  const { cartItems, removeProduct, updateProductQuantity, clearCart } = useCart();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [attemptedSubmit, setAttemptedSubmit] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const isFormValid = () => {
    return name && email && phone && address;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setAttemptedSubmit(true);

    if (!isFormValid()) {
      alert('Please fill in all the fields.');
      return;
    }

    if (cartItems.length === 0) {
      alert('Your cart is empty. Please add some products before submitting.');
      return;
    }

    const order = {
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      customerAddress: address,
      items: cartItems.map(item => ({
        product: item._id,
        quantity: item.quantity,
        pharmacyId: item.pharmacyId
      })),
      totalPrice: totalPrice
    };

    try {
      const response = await fetch('https://asparianpharmacy-a7505c4f976a.herokuapp.com/api/pharmacies/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
      console.log(order);
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(`Error: ${errorResponse.message}`);
      }

      alert('Your order has been placed successfully!');
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      clearCart()
    } catch (error) {
      alert(`Failed to place the order: ${error.message}`);
    }
  };

  const inputClass = (value) => 
  `${styles.input} ${attemptedSubmit && !value ? styles.invalid : ''}`;

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className={styles.cartPage}>
      <div className={styles.cartPageBlock}>
        <div className={styles.cartForm}>
          <h2>Personal Info</h2>
          <form onSubmit={handleSubmit}>
            <input
              className={inputClass(name)}
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className={inputClass(email)}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={inputClass(phone)}
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              className={inputClass(address)}
              type="text"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <div className={styles.cartSummary}>
                <h3>Total price: {totalPrice}$</h3>
                <button type="submit" className={styles.submitButton}>Submit</button>
            </div>
          </form>
        </div>
        <div>
        <h2>Goods in cart</h2>
        <div className={styles.cartItems}>
          {cartItems.map(item => (
            <div key={item._id} className={styles.cartItem}>
              <img src={item.imageUrl} alt={item.name} className={styles.cartItemImage} />
              <h4>{item.name}</h4>
              <p>{item.description.length > 30 ? `${item.description.slice(0, 30)}...` : item.description}</p>
              <p>Store: {item.pharmacyName}</p>
              <p>Price: {item.price}$</p>
              <p>Quantity: {item.quantity}</p>
              <div className={styles.actionButtonsContainer}>
                <button className={styles.actionButton} onClick={() => updateProductQuantity(item._id, 1)}>+</button>
                <button className={styles.actionButton} onClick={() => updateProductQuantity(item._id, -1)}>-</button>
                <button className={styles.actionButton} onClick={() => removeProduct(item._id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default CartPage;
