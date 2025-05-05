import React, { useState, useEffect } from "react";
import "./Filter.css";
import { API_BASE_URL } from "../../utils/config";

const Filter = ({ theme, promoSelecte, setPromoSelecte ,onPromoClick}) => {
  const [promos, setPromos] = useState([]);
 

  useEffect(() => {
    const fetchPromos = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/modules/get`);
        const data = await response.json();
        
        if (data.success) {
          const uniquePromos = [...new Set(data.modules.map(module => module.anne))];
          setPromos(uniquePromos);
        }
      } catch (error) {
        console.error("Error fetching promos:", error);
      } 
    };

    fetchPromos();
  }, []);

  const handlePromoClick = (promo) =>{
    setPromoSelecte(promo);
    onPromoClick(promo); //hadi nest3melha bach scrolli
  }

  

  return (
    <div className={`filter ${theme}`}>
      
      <div className="filter-container">
      <h1 className={`h1 ${theme}`}>Filter by Year</h1>
      <div className="filter-list">
        <h2 className={` ${promoSelecte === "" ? "active" : ""} ${theme}`}
            onClick={() => handlePromoClick("")}
          >
            All
          </h2>
        {promos.map((promo, index) => (
          <div 
            onClick={() => {
              setPromoSelecte(prev => prev === promo ? "" : promo);
              handlePromoClick(promo)
            
            }}
            key={index} 
            className="filter-items"
          >
            <h2 className={`${promoSelecte === promo ? "active" : ""} ${theme}`}>
              {promo}
            </h2>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
};

export default Filter;