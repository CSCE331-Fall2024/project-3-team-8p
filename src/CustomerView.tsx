import React, {useEffect} from 'react';
import logo from './Images/logo.svg';
import banner from './Images/POS.png'
import './CustomerView.css';
import ListingCard from "./ListingCard";
import './index'
import AccessibilityButton from "./AccessibilityButton";
import CheckoutButton from "./CheckoutButton";
import ButtonContainer from './ButtonContainer';

function CustomerView() {

    useEffect(() => {
        document.title = 'PandaExpress Customer View'; // Set your desired title here
    }, []);

  return (
      <div className="CustomerView">
          <div className="button-container">
              <AccessibilityButton/>
              <img src={banner} alt="Centered Top Image" className="BannerImage"/>
              <CheckoutButton/>
          </div>
          <ButtonContainer />
      </div>
          );
}

export default CustomerView;
