import React, { useEffect, useState } from 'react';
import Amount from './Amount';
import { useLocale, useTranslations } from 'next-intl';
import Button from '@/components/atoms/button/Button';
import { RefreshCcwIcon, Save } from 'lucide-react';
import AxiosInstance from '@/config/Axios';
import { Notification } from '@/config/Notification';

// export default function AmountServices({data , style , disabled}) {
// 	const locale = useLocale()

//     return (
//         <div>
//             {data?.map((e, i) => (
//                 <Amount disabled={disabled} style={style.body} key={i} name={e?.service?.name?.[locale]} price={e.price} quantity={e.count} />
//             ))}
//         </div>
//     );
// }


export default function AmountServices({ setValue , venue , data, style, disabled }) {
	const [tempData , setTempData] = useState()

	useEffect(()=> { setTempData(data) } ,[data])
	const t = useTranslations()
	const locale = useLocale()
	const [editedData, setEditedData] = useState([])
  
	const handleUpdate = (id, count, price) => {
		const updated = editedData.filter(item => item.id !== id);
	
		// إذا كانت القيمة الجديدة تساوي العدد الأصلي، فلا نضيفها إلى المصفوفة
		const original = data.find(item => item.id === id);
		if (original && original.count !== count) {
			updated.push({ serviceId:id, count });
		}
	
		setEditedData(updated);
	};
	
  
	const [loading, setloading] = useState(false)
	const handleSave = () => {
		
		setloading(true);
        AxiosInstance.put(`/venues/${venue?.id}/services`, {services : editedData} )
            .then(res => {
                Notification(t("updated_Successfully"), 'success');
            })
            .catch(err => console.log(err))
			.finally(()=>{
				setloading(false);
				setEditedData([])
				setValue('quantity' , editedData)
			})
	}


	// console.log(tempData)
  
	return (
	  <div>
		{tempData?.map((e, i) => (
		  <Amount key={i} style={style} disabled={disabled} name={e?.service?.name?.[locale]} price={e.price} quantity={e.count} id={e.id} onUpdate={handleUpdate} />
		))}

		<Button isLoading={loading} cnName={"order-[4] "} onClick={handleSave} name={t("Save_changes")}  classname={`!max-w-[170px] w-full text-[15px]`}  width={`${editedData?.length > 0 ? "max-h-[300px] mt-[20px] " : " max-h-0 " } mx-auto overflow-auto ease-in-out translation-all duration-500  `} icon={<Save size={16} /> } typeIcon={"svg"} showIcon={true} />
	  </div>
	)
  }
