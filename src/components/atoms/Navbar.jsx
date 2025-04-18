'use client';
import { useLocale, useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { Link, usePathname } from '../../navigation.js';
import Image from 'next/image';
import Button from './button/Button.jsx';
import DropdownLang from './DropdownLang.jsx';
import { MyAccount, SignIn } from '@/constants/links.js';
import { ImgUserPrimary } from '@/constants/imgs.js';
import { hookUser } from '@/hooks/hookUser.js';

export default function Navbar() {
    const t = useTranslations();
    const path = usePathname();

    const links = [
        { name: t('home'), value: '/' },
        { name: t('available_halls'), value: '/available-halls' },
        { name: t('contact_us'), value: '/contact-us' },
        { cn: 'hidden dashboard-btn !text-white rounded-full px-[20px] py-[5px] font-[600] bg-primary1  ', name: t('dashboard'), value: 'https://venuat-dashboard.vercel.app/en' },
    ];

    const style = { item: 'flex items-center gap-[20px] max-lg:flex-col max-lg:items-start  ' };
    const [show, setshow] = useState('hidden');

    const handleToggle = () => {
        setshow(show == 'fixed' ? 'hidden' : 'fixed');
        document.body.style.overflow = show === 'hidden' ? 'hidden' : 'visible';
    };

    const handleResize = () => {
        if (window.innerWidth >= 1024) {
            setshow('hidden');
            document.body.style.overflow = 'visible'; // Ensure body overflow resets.
        }
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [place, setplace] = useState(path == '/' ? true : false);

    useEffect(() => {
        setplace(path == '/' ? true : false);

        if (show == 'fixed') handleToggle();
    }, [path]);

    // Scroll event handling
    const [isScrolled, setIsScrolled] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 0) {
            // You can adjust the scroll threshold as needed
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const { user } = hookUser();

    useEffect(() => {
        if (user) {
            const ele = document.querySelector('.dashboard-btn');
            if (user?.role?.name == 'vendor') ele.classList.add('!flex');
            else ele.classList.remove('!flex');
        }
    }, [user, path]);

    return (
        <nav className={` navbar z-[1000] sticky top-0 ${place ? (isScrolled ? 'bg-black ' : 'h-0') : 'bg-white'}  `}>
            <div className={`lg:hidden fixed z-[1000] w-full top-0 flex items-center justify-between px-[20px]  ${place ? (isScrolled ? 'bg-[#000]' : 'h-[80px') : 'bg-white '} `}>
                <div className='flex items-center gap-[10px] '>
                    <Image onClick={handleToggle} className=' cursor-pointer hover:text-primary1' src={`/assets/${show == 'fixed' ? 'close' : `${place ? 'menu-white' : 'menu'}`}.svg`} alt='' width={25} height={25} />
                    <DropdownLang color={place ? 'text-white' : 'text-secondry1'} />
                </div>
                <Link href='/'>
                    <Image src={`/assets/${place ? 'logo-white' : 'logo'}.svg`} alt='' width={130} height={60} />
                </Link>
            </div>

            <div className={` max-lg:${show}  duratino-300  ${place ? 'max-lg:bg-secondry1' : 'max-lg:bg-primary3'}  max-lg:z-[100] max-lg:inset-0 max-lg:h-[100vh] max-lg:top-0 max-lg:flex-col max-lg:justify-center max-lg:items-start max-lg:gap-[20px] border-b-[1px]   border-b-primary3 container ${isScrolled ? 'min-h-[80px]' : 'min-h-[130px]'} duration-300 w-full flex items-center justify-between`}>
                <div className={style.item + 'max-lg:mt-[-180px]'}>
                    <Link className='max-lg:hidden' href='/'>
                        <Image src={`/assets/${place ? 'logo-white' : 'logo'}.svg`} alt='' width={100} height={40} />
                    </Link>
                    <ul className={style.item}>
                        {links?.map((e, i) => (
                            <Link className={` ${e?.cn} ${place ? 'hover:text-primary3 text-white ' : 'hover:text-primary1 text-secondry1 '}  ${path == e.value ? `font-semibold after:w-[60%] ${place ? 'text-primary3' : 'text-primary1'} ` : ' after:w-0 '} after:duration-300  relative after:absolute after:left-[50%] after:translate-x-[-50%]  after:rounded-[10px] after:h-[3px]  ${place ? 'after:bg-primary3' : 'after:bg-primary1'} after:bottom-[-8px] `} href={e.value} key={i}>
                                {e.name}
                            </Link>
                        ))}
                    </ul>
                </div>

                <div className={style.item}>
                    <DropdownLang color={place ? 'text-white' : 'text-secondry1'} classname='max-lg:hidden' />
                    {user ? (
                        <Link href={MyAccount} className=' items-center cursor-pointer grid grid-cols-[35px,1fr] gap-[5px] '>
                            <div className='w-[35px] h-[35px] flex items-center justify-center rounded-[50%] bg-primary3 border-[1px] border-gray-200 '>
                                <Image className='rounded-full overflow-hidden  w-full h-full p-[2px] ' src={user?.avatar || ImgUserPrimary} alt='' width={20} height={20} />
                            </div>
                            <div className=' max-lg:flex gap-[5px] '>
                                <div className={`h4 max-lg:h3 lg:text-[12px] ${place ? 'text-white' : 'text-secondry1'} font-[500]`}> {t('hello')} </div>
                                <div className={`h4 max-lg:h3 ${place ? 'text-white' : 'text-secondry1'} capitalize `}> {user?.full_name?.split(' ')[0]} </div>
                            </div>
                        </Link>
                    ) : (
                        <Link href={SignIn} className={`${place ? 'text-white' : 'text-secondry1'}`}>
                            {t('login')}
                        </Link>
                    )}

                    <Button href={'/sign-up/provider?step=1'} showIcon={true} name={t('add_your_hall_now')} />
                </div>
            </div>

            <hr className=' lg:hidden mb-[90px] ' />
        </nav>
    );
}
