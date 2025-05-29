"use client";

import { createContext, useContext, useState } from "react";
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
	const [changeListen , setchangeListen] = useState(false)
	const [path , setpath] = useState(false)
    const checkEndpoint = () => {
        setchangeListen(Math.floor(100000 + Math.random() * 900000).toString());
    };
    

    const taxRate = 0.15; // 15%
    const [Services , setServices] = useState(null)
    const [Equipments , setEquipments] = useState(null)
    const [Days , setDays] = useState(0)
    const [priceVenue , setPriceVenue] = useState(0)


    const equipmentsPrice = Equipments && Equipments?.reduce((acc, curr) => {  const itemPrice = Number(curr.price) * Number(curr.count); return acc + itemPrice; }, 0);
    const servicesPrice = Services && Services?.reduce((acc, curr) => {  const itemPrice = Number(curr.price) * Number(curr.count); return acc + itemPrice; }, 0);
    const subtotal = (equipmentsPrice * Days) + (servicesPrice * Days) + priceVenue;
    const taxValue = subtotal * taxRate;
    const totalWithTax = subtotal + taxValue;
    
    
    return (
        <GlobalContext.Provider value={{ subtotal , taxValue , totalWithTax ,servicesPrice , equipmentsPrice , Days , priceVenue , setDays , setPriceVenue , Services , setServices ,  Equipments , setEquipments , changeListen, checkEndpoint , setpath , path }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom Hook to use the context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
