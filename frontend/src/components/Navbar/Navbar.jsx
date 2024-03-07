
import { Link } from 'react-router-dom';
import s from './Navbar.module.css';
import CartIcon from "../../assets/cart.svg"
import StoreIcon from "../../assets/store.svg"

function Navbar() {
  return (
    <nav className={s.navbar}>
      <Link to="/"><img className={s.storeIcon} src={StoreIcon} alt="store page"></img></Link>
      <Link to="/cart"><img src={CartIcon} className={s.cartIcon} alt="cart page"></img></Link>
    </nav>
  );
}

export default Navbar;
