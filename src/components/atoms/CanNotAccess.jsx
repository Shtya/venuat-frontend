import { usePathname, useRouter } from '@/navigation';
import React, { useEffect, useState } from 'react';
import Button from './button/Button';
import { useTranslations } from 'next-intl';
import { useGlobalContext } from '@/context/GlobalContext';

export default function CanNotAccess({ children }) {
    const t = useTranslations();
    const router = useRouter();
	const pathname = usePathname()
    const {path} = useGlobalContext()
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    useEffect(() => {
		if(pathname?.startsWith("/reservation") || pathname.startsWith("/my-account") , pathname.startsWith(path) ){
			const user = localStorage.getItem('user');
			setIsAuthenticated(!!user);
		}
		else {
			setIsAuthenticated(true)
		}
    }, [pathname , path]);

    const handleLogin = () => {
        router.push('/sign-in');
    };

    if (!isAuthenticated) {
        return (
            <div className="fixed z-[100] inset-0 top-0 flex items-center justify-center min-h-screen bg-gray-900 bg-opacity-40 backdrop-blur-[10px] p-4">
                <div className="  shadow-[0_10px_25px_rgba(0,0,0,0.25),0_6px_20px_rgba(0,0,0,0.15),0_4px_15px_rgba(0,0,0,0.1)] bg-white p-8 py-[80px] rounded-2xl  text-center max-w-[600px] w-full">
                    <h2 className="text-2xl font-bold text-primary1 uppercase mb-4">{t("auth1")}</h2>
                    <p className="text-gray-600 max-w-[400px] w-full mx-auto mb-6">{t("auth2")}</p>
                    <Button
                        onClick={handleLogin}
                        name={t("auth3")}
                        classname="mx-auto capitalize !max-w-[200px] w-full text-white px-4 py-2"
                    />
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
