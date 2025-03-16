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
	const t = useTranslations()
	const locale = useLocale()
	const [loading, setloading] = useState(false)
	// const [editedData, setEditedData] = useState([])
	
	const handleUpdate = async (id, count) => {
        setloading(true);

        try {
            const updatedData = { services: [{ serviceId: id, count }] };
            await AxiosInstance.put(`/venues/${venue?.id}/services`, updatedData);

            setValue('quantity', count); // Update the form value if needed
        } catch (err) {
            Notification(t("update_failed"), 'error');
        } finally {
            setloading(false);
        }
    };

  
	return (
	  <div>
		{data?.map((e, i) => (
		  <Amount key={i} style={style} disabled={disabled} name={e?.service?.name?.[locale]} price={e.price} quantity={e.count} id={e.id} onUpdate={handleUpdate} />
		))}

	  </div>
	)
  }
