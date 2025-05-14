import React, { useEffect, useState } from 'react';
import Amount from './Amount';
import { useLocale, useTranslations } from 'next-intl';

export default function AmountServices({ setServices, data, style, disabled }) {
    const t = useTranslations();
    const locale = useLocale();

    const handleUpdate = async (id, count) => {
        const updated = data.map(item => {
            if (item.id === id) {
                return { ...item, count };
            }
            return item;
        });

        setServices(updated);
    };

    return <div>{data && data?.map((e, i) => <Amount key={i} style={style} disabled={disabled} name={e?.service?.name?.[locale]} price={e.price} quantity={e.count} id={e.id} onUpdate={handleUpdate} />)}</div>;
}
