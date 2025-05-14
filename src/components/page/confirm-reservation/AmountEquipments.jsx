import React, { useEffect, useState } from 'react';
import Amount from './Amount';
import { useLocale, useTranslations } from 'next-intl';

export default function AmountEquipments({ setEquipments , data, style, disabled }) {
    const locale = useLocale();
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (id, count) => {
        const updated = data.map(item => {
            if (item.id === id) {
                return { ...item, count };
            }
            return item;
        });

        setEquipments(updated);
    };


    return (
        <div>
            {data && data?.map((e, i) => (
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