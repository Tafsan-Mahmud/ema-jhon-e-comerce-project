import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { userContex } from '../../App';
import logo from '../../images/logo.png'
import './Header.css'
const Header = () => {
    const [logedInUser, setLogedInUser] = useContext(userContex);
    return (
        <div className="header">
           <img src={logo} alt=""/>
           <nav>        
               <Link to="/shop">Shop</Link>
               <Link to="/Order"> Order Review</Link>
               <Link to="/inventory">Manage Inventory here</Link>
               <button onClick={()=>setLogedInUser({})}>Sign Out</button>
            </nav>
        </div>
    );
};

export default Header;