import Button from '@/components/atoms/button/Button'
import { halls } from '@/Dummy/dummy'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React from 'react'

export default function HallReservation() {
  const t = useTranslations()

  const style = {
    table : " border-[1px] border-[#D5DBF6]  grid grid-cols-[130px,130px,300px,130px,220px,130px] max-md:grid-cols-[80px,100px,150px,90px,190px,130px]  items-center ",
    head : " !py-[20px] h-full flex items-center flex-col justify-center gap-[10px] border-l-[1px] border-l-[#D5DBF6] text-center h4",
    body : "h-full flex items-center flex-col justify-center gap-[5px] p-[10px] border-l-[1px] border-l-[#D5DBF6] text-center h4 text-primary1 font-bold ",
  }

  return (
    <div className=' w-full  overflow-auto pb-[10px] ' >
      <div className=' w-fit main-shadow border-[1px] border-[#D5DBF6] rounded-[20px] overflow-hidden ' >
          <div className={`${style.table} border-t-transparent  `}>
            <span data-aos="zoom-in" className={style.head} > {t("orderNumber")} </span>
            <span data-aos="zoom-in" className={style.head} > {t("bookingDate")} </span>
            <span data-aos="zoom-in" className={style.head} > {t("hallImageAndName")} </span>
            <span data-aos="zoom-in" className={style.head} > {t("totalPrice")} </span>
            <span data-aos="zoom-in" className={style.head} > {t("address")} </span>
            <span data-aos="zoom-in" className={`${style.head} border-l-transparent `} > {t("procedures")} </span>
          </div>

          <div >
            {
              halls.slice(0,4)?.map((e,i)=> 
                <div key={i} className={`${style.table}  border-t-transparent `}>  
                  <div data-aos="zoom-in" className={style.body} > {e.id} </div>
                  <div data-aos="zoom-in" className={style.body} > {e.date} </div>
                  <div data-aos="zoom-in" className={style.body} > 
                      <div className=""> {e.name} </div>
                      <Image className='mx-auto w-[100px] h-[80px] object-cover rounded-[20px] ' src={`/assets/test-img/${e.img}.png`} alt='' width={120} height={120} />
                  </div>
                  <div data-aos="zoom-in" className={style.body}> {t("price" , {count : e.price})} </div>
                  <div data-aos="zoom-in" className={style.body}> {e.address} </div>
                  <Button 
                        dataAos="zoom-in"
                        disabled={e?.action == "canceled" ? false : true}
                        name={ e?.action == "canceled" ? t("cancelOrder") : t("orderStatus") } 
                        classname={` mx-[10px] ${e?.action == "canceled" ? "bg-red1 border-red1 hover:bg-red1 hover:bg-opacity-80 " : "bg-green1 border-green1 hover:bg-green1 hover:bg-opacity-80 "} h-[50px] `} /> 
                </div>)
            }
          </div>
      </div>
    </div>
  )
}
