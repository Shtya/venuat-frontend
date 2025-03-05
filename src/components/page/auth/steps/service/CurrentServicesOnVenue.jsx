import AxiosInstance from '@/config/Axios'
import { Notification } from '@/config/Notification'
import { GlobalProvider, useGlobalContext } from '@/context/GlobalContext'
import { useLocale, useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function CurrentServicesOnVenue({isOpenPopup}) {
	const locale = useLocale()
	const t  = useTranslations()
	const { changeListen , checkEndpoint } = useGlobalContext()

	//! get Serviecs on this venue 
	const [currServs , setcurrServs] = useState(null)
	const [loading , setloading] = useState(false)


	const [venueId, setvenueId] = useState(null);
	useEffect(() => {
		setvenueId(JSON.parse(localStorage.getItem('venueId')));
	}, []);


	const getServices = async()=>{
		AxiosInstance.get(`/venues/${venueId}/services`)
				.then(res => {
					setcurrServs(res.data)
				})
				.catch(err=> {})
				.finally(() => {setloading(false)})
	}

	useEffect(()=> {
		if(venueId){
			getServices()
		}
	},[venueId , changeListen ])





	const [loadingRemove , setloadingRemove] = useState(false) 
	const [currID , setcurrID ]  = useState(null)
	const remove = async (id)=>{
		setloadingRemove(true)
		setcurrID(id)
			await AxiosInstance.delete(`venues/${venueId}/remove-service/${id}`).then(res => {
				const filter = currServs.filter(e => e.VenueServiceID !== id)
				setcurrServs(filter)
				Notification( t("RemoveService")  , "success")
				checkEndpoint()
			})
			.catch((err)=> {})
			.finally(()=> {setloadingRemove(false)})
	}


  return (
	<div>
		

		<div className='flex flex-col gap-[10px] ' >
				{
				loading
                    ? Array.from({ length: 1 }).map((_, i) => <SkeletonRow key={i} />) // Show skeleton when loading
                    : currServs?.map((e,i)=> 
					<div key={i} className={` relative grid max-sm:grid-cols-1 grid-cols-[60px,1fr,1fr,1fr]  items-center gap-x-[10px] gap-y-[20px]`} > 
						<div onClick={()=> remove(e.VenueServiceID)} className={` ${i == 0 && "mt-[20px]"} ${loadingRemove && currID === e?.VenueServiceID  ? "pointer-events-none" : ""} cursor-pointer hover:bg-opacity-40 duration-200 w-[40px] h-[40px] rounded-[50%] bg-red1 bg-opacity-20 flex items-center justify-center `} > 
							{
								loadingRemove && currID === e?.VenueServiceID 
								? <div className={` w-5 h-5 border-2 border-white  border-t-transparent rounded-full animate-spin`}></div>
								: <Image src={"/assets/remove.svg"} alt='' width={20} height={20} /> 
							}
							
						</div>
						<Field index={i} label={t("nameServices")} name={e?.name?.[locale]}  />
						<Field index={i} label={t("countService")} name={e?.count}  />
						<Field index={i} label={t("price2")}       name={e?.price}  />
                    </div>)
				}
			</div>


	</div>
  )
}




function Field({ name , label , index }) {
  return (
	<div className={` pointer-events-none duration-500 relative select flex  flex-col gap-[5px]  w-full `}>
            {index == 0 && <label className={`h5`}> {label} </label>}
			<div className=' bg-neutral-200 h5  text-secondry2 h-[40px] flex items-center px-[10px] rounded-[8px] w-full border border-neutral-200 ' > {name} </div>
	</div>
  )
}



function SkeletonRow() {
    return (
        <div className='grid max-sm:grid-cols-1 grid-cols-[60px,1fr,1fr,1fr] items-center gap-x-[10px] gap-y-[20px]'>
            <div className='w-[40px] h-[40px] rounded-full bg-gray-300 animate-pulse'></div>
            <SkeletonField />
            <SkeletonField />
            <SkeletonField />
        </div>
    );
}

function SkeletonField() {
    return <div className='h-[40px] w-full bg-gray-300 animate-pulse rounded-[8px]'></div>;
}