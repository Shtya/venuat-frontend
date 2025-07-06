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
        <nav className={`navbar z-[1000] sticky top-0 ${place ? (isScrolled ? 'bg-black' : 'h-0') : 'bg-white shadow-sm'}`}>
    {/* Mobile Header */}
    <div className={` lg:hidden fixed z-[1000] w-full top-0 flex items-center justify-between px-5 py-4 ${place ? (isScrolled ? 'bg-black' : 'h-20') : 'bg-white shadow-md'}`}>
        <div className='flex items-center gap-3'>
            <Image 
                onClick={handleToggle} 
                className='cursor-pointer hover:opacity-80 transition-opacity' 
                src={`/assets/${show === 'fixed' ? 'close' : `${place ? 'menu-white' : 'menu'}`}.svg`} 
                alt='menu' 
                width={25} 
                height={25} 
            />
            <DropdownLang color={place ? 'text-white' : 'text-secondary1'} />
        </div>
        <Link href='/'>
            <Image 
                src={`/assets/${place ? 'logo-white' : 'logo'}.svg`} 
                alt='logo' 
                width={130} 
                height={60}
                className='transition-transform hover:scale-105'
            />
        </Link>
    </div>

    {/* Main Navbar Content */}
    <div className={`
        max-lg:backdrop-blur-md max-lg:!bg-black/80 
        max-lg:${show} 
        transition-all duration-300 ease-in-out
        ${place ? 'max-lg:bg-secondary1' : 'max-lg:bg-primary3'}  
        max-lg:z-[100] max-lg:inset-0 max-lg:h-screen max-lg:top-0 
        max-lg:flex-col max-lg:justify-center max-lg:items-start max-lg:gap-5 
        max-lg:px-8 max-lg:py-12
        border-b border-opacity-10 ${place ? 'border-white' : 'border-primary3'}
        container 
        ${isScrolled ? 'min-h-20' : 'min-h-32'} 
        w-full flex items-center justify-between
    `}>
        <div className='flex items-center gap-10 max-lg:flex-col max-lg:items-start max-lg:gap-8 max-lg:mt-[-180px]'>
            <Link className='max-lg:hidden hover:opacity-90 transition-opacity' href='/'>
                <Image 
                    src={`/assets/${place ? 'logo-white' : 'logo'}.svg`} 
                    alt='logo' 
                    width={100} 
                    height={40}
                />
            </Link>
            
            <ul className='flex items-center gap-8 max-lg:flex-col max-lg:items-start max-lg:gap-6'>
                {links?.map((e, i) => (
                    <Link 
                        className={`
                            relative transition-all duration-200
                            ${e?.cn} 
                            ${place ? 'text-white hover:text-primary3' : 'text-secondary1 hover:text-primary1'}
                            ${path === e.value ? `font-semibold after:w-[60%] ${place ? 'text-primary3' : 'text-primary1'}` : 'after:w-0'}
                            after:content-[''] after:absolute after:left-1/2 after:-translate-x-1/2
                            after:rounded-full after:h-0.5
                            after:transition-all after:duration-300
                            ${place ? 'after:bg-primary3' : 'after:bg-primary1'}
                            after:bottom-[-4px]
                            hover:after:w-[60%]
                        `} 
                        href={e.value} 
                        key={i}
                    >
                        {e.name}
                    </Link>
                ))}
            </ul>
        </div>

        <div className='flex items-center gap-6 max-lg:flex-col max-lg:items-start max-lg:gap-5'>
            <DropdownLang 
                color={place ? 'text-white' : 'text-secondary1'} 
                classname='max-lg:hidden' 
            />
            
            {user ? (
                <Link 
                    href={MyAccount} 
                    className='flex items-center gap-2 cursor-pointer group'
                >
                    <div className='w-9 h-9 flex items-center justify-center rounded-full bg-primary3 border border-gray-200 overflow-hidden group-hover:ring-2 group-hover:ring-primary1 transition-all'>
                        <Image 
                            className='w-full h-full object-cover'
                            src={user?.avatar || ImgUserPrimary} 
                            alt='user avatar' 
                            width={36} 
                            height={36} 
                        />
                    </div>
                    <div className='flex flex-col max-lg:gap-1'>
                        <div className={`text-xs ${place ? 'text-white' : 'text-secondary1'} font-medium opacity-80`}>
                            {t('hello')}
                        </div>
                        <div className={`text-sm ${place ? 'text-white' : 'text-secondary1'} font-semibold capitalize  transition-colors`}>
                            {user?.full_name?.split(' ')[0]}
                        </div>
                    </div>
                </Link>
            ) : (
                <Link 
                    href={SignIn} 
                    className={`${place ? 'text-white' : 'text-secondary1'} hover:text-primary1 transition-colors px-3 py-1 rounded-lg ${place ? 'hover:bg-white hover:bg-opacity-10' : 'hover:bg-gray-100'}`}
                >
                    {t('login')}
                </Link>
            )}

            <Button 
                href={'/sign-up/provider?step=1'} 
                showIcon={true} 
                name={t('add_your_hall_now')} 
                className='hover:shadow-lg transition-shadow'
            />
        </div>
    </div>

    <hr className='lg:hidden mb-24 border-none' />
</nav>
    );
}
