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
    return (
        <GlobalContext.Provider value={{ changeListen, checkEndpoint , setpath , path }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom Hook to use the context
export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
