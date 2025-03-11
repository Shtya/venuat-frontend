'use client';
import { useTranslations } from 'next-intl';
import Search from '@/components/molecules/search/Search';
import Card from '@/components/molecules/card/Card';
import Filter from '@/components/page/available-halls/Filter';
import Button from '@/components/atoms/button/Button';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Pagination from '@/components/molecules/Pagination';
import { hookSearch } from '@/hooks/hookSearch';
const Map = dynamic(() => import('@/components/molecules/Map'), { ssr: false });

const page = () => {
    const t = useTranslations();
    const { venue, loading , clearData , loadingSubmit , handlePagination , register, errors, trigger, setValue, submit, watch  } = hookSearch();

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


    return (
        <main className='min-h-[100vh] container  '>
            <div className='lg:sticky top-[100px] z-[1000] '>
                <Search clearData={clearData} loading={loadingSubmit } register={register}  errors={errors} trigger={trigger } setValue={setValue} submit={submit }watch={watch} dataAos='fade-up' />
            </div>

            <Button dataAos='fade-up' rotate={false} onClick={() => setshowFilter(!showFilter)} name={t('filter')} classname={' flex lg:hidden max-w-[200px] mb-[40px] '} showIcon={true} icon={'/assets/filter.svg'} />

            <div className='filter   relative grid grid-cols-[350px,1fr] max-lg:grid-cols-1 gap-[30px] '>
                <div ref={filterRef} className={`  ${showFilter ? ' max-lg:right-0 ' : 'max-lg:right-[-150%]'} max-w-[450px] w-full duration-500 transition-all ease-in-out max-lg:fixed max-lg:bg-white max-lg:shadow-blur max-lg:top-0 max-lg:z-[100000]  max-lg:right-0 max-lg:h-[100vh] max-lg:overflow-auto max-lg:p-[20px]`}>
                    <div className='h2 font-semibold   flex items-center justify-between '>
                        {/* {t('where_in_jeddah')} */}
                        <div>
                            <X onClick={() => setshowFilter(!showFilter)} className=' lg:hidden cursor-pointer hover:text-primary1 ' />{' '}
                        </div>
                    </div>

                    <Map data={venue?.data} zoom={5} />
                    <Filter loading={loading} venue={venue} trigger={trigger } setValue={setValue} watch={watch} />
                </div>

                <div>
                    <Card grid="max-[1300px]:grid-cols-2" showNoResultData={true} isLoading={loading} slice={1000} animation={false} sckelton={9} data={venue?.data} />
                    <Pagination limit={venue.limit} countRecored={venue.countRecored} page={venue.page} onPageChange={handlePagination} />
                </div>
            </div>
        </main>
    );
};

export default page;
