"use client";
import Button from "@/components/atoms/button/Button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function Finish() {
    const t = useTranslations();
    const [isFullScreen, setIsFullScreen] = useState(true);

    useEffect(() => {
        setTimeout(() => setIsFullScreen(false));
    }, []);

    return (
        <div className="flex flex-col items-center text-center   ">
            <div className="h2 mt-5 mb-7">{t("congratulations_message")}</div>

            {/* Animated Image */}
            <Image
                className={`transition-all duration-[1000ms] ease-in-out object-contain mx-auto 
                    ${isFullScreen ? " scale-[100] w-screen h-screen opacity-100" : "scale-1 w-full max-w-[340px] h-[300px]"}`}
                alt=""
                src="/assets/finish.png"
                width={340}
                height={300}
            />

            <Button
                href="/"
                width="max-w-[300px] w-full mx-auto"
                classname="mt-12"
                name={t("home_page")}
            />
        </div>
    );
}
