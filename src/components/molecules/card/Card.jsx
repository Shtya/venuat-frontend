"use client"
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import Button from '../../atoms/button/Button'
import Starts from "../../atoms/start/Starts"
import Address_vesitor from '@/components/atoms/card/Address_vesitor'
import Rate_price from '@/components/atoms/card/Rate_price'


export default function Card({data , indextab , id}) {
	const  t = useTranslations()
	const [storeData , setstoreData ] = useState(data)
	const [effect , seteffect] = useState("fade-up")


	useEffect(()=> {

		if(indextab){
			setstoreData([])
			seteffect("zoom-in-down")
			setTimeout(() => {
				setstoreData(data)
			}, 0);
		}

	} ,[indextab])



  return (
	<div id={id} className='grid max-md:grid-cols-[repeat(auto-fill,minmax(300px,1fr))] grid-cols-[repeat(auto-fill,minmax(350px,1fr))] gap-[20px] ' >
		{
			storeData?.map((e,i)=> 
				<div key={i} data-aos={effect}   className=' h-full  pb-[80px] max-sm:pb-[50px] relative rounded-[30px] overflow-hidden w-full  shadow-custom border-gray1 border-[1px] ' > 
					<Image className='w-full bg-primary1 max-sm:max-h-[220px] max-h-[250px] object-cover ' src={e.img} alt='' width={250} height={250} />
					<div className='p-[20px]  ' >

					<Address_vesitor
                        titleAddress={t(e.head)}
						location={t(e.address)}
						titleVistor={t(e.countTitle)}
						countOfVistor={t(e.countNumber.name , {count : e.countNumber.value})}
                        />

                    <Rate_price
                        empty={3}
                        fill={2}
                        rateTitle={t(e.rate.name)}
                        countOfRate={e.rate.value}
                        priceTitle={t(e.price)}
                        priceValue={t(e.priceValue.name , {count:e.priceValue.value})}
                    />

						{ e?.list && <ul className="list flex flex-col gap-[10px]  ">
							<div className="h3 font-[600] "> {t(e.list.head)} </div>
							{
								e.list.lis.map((e,i) => <li className='flex items-center gap-[5px] '  key={i} > 
									<Image className='w-[25px] h-[25px] '  src={e.value} alt={t(e.name)} width={25} height={25} />
									<div className="h4 text-secondry3 "> {t(e.name)}   </div>
								</li>)
							}
						</ul>}

						<Button href="/details-halls" outline={e.btnOutline}  classname={" absolute bottom-[15px] left-[50%] translate-x-[-50%] w-[95%] "} name={t(e.btn)} />
					</div>
				</div> )
		}

		
	</div>
  )
}





