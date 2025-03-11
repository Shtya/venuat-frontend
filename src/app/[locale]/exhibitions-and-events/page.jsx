'use client';
import { useTranslations } from 'next-intl';
import Search from '@/components/molecules/search/Search';
import Card from '@/components/molecules/card/Card';
import { FilterPageData } from '@/Dummy/dummy';
import Filter from '@/components/page/available-halls/Filter';
import Button from '@/components/atoms/button/Button';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Pagination from '@/components/molecules/Pagination';
const Map = dynamic(() => import('@/components/molecules/Map'), { ssr: false });

const page = () => {
    const t = useTranslations();

    const [showFilter, setshowFilter] = useState(false);
    const filterRef = useRef(null); // Reference to the filter container

    useEffect(() => {
        const handleClickOutside = event => {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setshowFilter(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);


    const handlePageChange = (page) => {
      console.log("Current Page:", page);
    };

    return (
        <main className='min-h-[100vh] container max-lg:pt-[70px] '>
            <div className='  lg:sticky top-[100px] z-[1000] '>
                <Search dataAos="fade-up" />
            </div>

            <Button dataAos="fade-up" rotate={false} onClick={() => setshowFilter(!showFilter)} name={t('filter')} classname={' flex lg:hidden max-w-[200px] mb-[40px] '} showIcon={true} icon={'/assets/filter.svg'} />

            <div className=' relative grid grid-cols-[350px,1fr] max-lg:grid-cols-1 gap-[30px] '>
                <div  ref={filterRef} className={`  ${showFilter ? ' max-lg:right-0 ' : 'max-lg:right-[-150%]'}  max-w-[450px] w-full duration-500 transition-all ease-in-out max-lg:fixed max-lg:bg-white max-lg:shadow-blur max-lg:top-0 max-lg:z-[100000]  max-lg:right-0 max-lg:h-[100vh] max-lg:overflow-auto max-lg:p-[20px]`}>
                    <div className='h2 font-semibold mb-[20px]  flex items-center justify-between '>
                        {t('where_in_jeddah')}
                        <div>
                            <X onClick={() => setshowFilter(!showFilter)} className=' lg:hidden cursor-pointer hover:text-primary1 ' />{' '}
                        </div>
                    </div>

                    <Map />
                    <Filter />
                </div>
                
                <div>
                    <Card data={FilterPageData} />
                    <Pagination totalPages={15} onPageChange={handlePageChange} />

                </div>
            </div>

        </main>
    );
};

export default page;
