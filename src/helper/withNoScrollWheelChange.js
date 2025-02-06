

"use client";
import React, { useEffect } from "react";

function PreventNumberInputScroll() {
    useEffect(() => {
        const preventNumberInputScroll = (event) => {
            const target = event.target ;
            if (target.type === "number" && document.activeElement === target) {
                event.preventDefault();
            }
        };
        window.addEventListener("wheel", preventNumberInputScroll, { passive: false });
        return () => { window.removeEventListener("wheel", preventNumberInputScroll); }
    }, []);

    return null; 
}

export default PreventNumberInputScroll;
