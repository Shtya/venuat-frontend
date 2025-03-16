import React, { useEffect, useState } from 'react';
import Amount from './Amount';
import { useLocale, useTranslations } from 'next-intl';
import AxiosInstance from '@/config/Axios';
import { Notification } from '@/config/Notification';

export default function AmountEquipments({ setValue, venue, data, style, disabled }) {
    const t = useTranslations();
    const locale = useLocale();
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (id, count) => {
        setLoading(true);

        try {
            const updatedData = { equipments: [{ equipmentId: id, count }] };
            await AxiosInstance.put(`/venue-equipment/${venue?.id}/equipments`, updatedData);

            // Notification(t("updated_Successfully"), 'success');
            setValue('quantity', count); // Update the form value if needed
        } catch (err) {
            console.error(err);
            Notification(t("update_failed"), 'error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {data?.map((e, i) => (
                <Amount
                    key={i}
                    style={style}
                    disabled={disabled || loading} // Disable buttons while loading
                    name={e?.equipment?.name?.[locale]}
                    price={e.price}
                    quantity={e.count}
                    id={e.id}
                    onUpdate={handleUpdate}
                />
            ))}
        </div>
    );
}