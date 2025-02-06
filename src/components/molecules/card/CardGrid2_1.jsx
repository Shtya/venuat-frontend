import React from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Starts from '@/components/atoms/start/Starts';
import { LocateIcon, LocateOffIcon, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function CardGrid2_1({data}) {
  const t = useTranslations();

  return (
    <div className=' grid grid-cols-2 gap-[20px] max-lg:grid-cols-1  '>
      {data?.map((e, i) => (
        <Link href={"/details-halls"}  data-aos="fade-up" data-aos-delay={i * 100} key={i} className={` ${i == 0 ? " lg:row-span-2 h-full " : "" }   flex max-sm:items-end   w-full relative  min-h-[330px] rounded-[25px] overflow-hidden `} >
          <Image className=' cursor-pointer hover:opacity-80 duration-200 absolute object-cover inset-0 w-full h-full ' src={e.img} alt='' fill />
		  <div className="absolute inset-0 bg-black opacity-10"></div>
		   <div className="h3 absolute top-[-1px] right-[-1px] text-primary1 bg-primary3 px-[30px] rounded-[23px] p-[10px] "> {t(e.name)} </div>

			<div className='h-full max-sm:h-fit  w-full  p-[30px]  grid grid-cols-[1fr,1fr] max-sm:grid-cols-1 items-end  gap-[10px]  text-white relative '>
				
				<div className='row sm:h-full  max-sm:items-center flex flex-col justify-end  '>
					<div className='h2 max-lg:text-[18px] text-white font-medium mb-[10px] '> {t(e.head)} </div>
					<div className='flex items-center gap-[5px]'>
						<MapPin />
						<div className='h4'> {t(e.address)} </div>
					</div>
				</div>

				<div className='flex flex-col max-sm:items-center justify-end items-end  sm:h-full ' >

					<div className='flex items-center gap-[15px]  '>
						<Starts countFill={3} countEmpty={2} color="white" />
						<span className='h4  '> {e.rate.value} </span>
					</div>

					<div className='flex items-center gap-[10px] mt-[10px] ' >
						<div className='h2'> {t(e.price)} </div>
						<div className='h2 mt-[5px text-white '> {t(e.priceValue.name, { count: e.priceValue.value })} </div>
					</div>
				</div>
			</div>

        </Link>
      ))}
    </div>
  );
}
