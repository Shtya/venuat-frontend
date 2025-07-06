import React from 'react';
import SAR from '../atoms/SAR';
import { useLocale, useTranslations } from 'next-intl';
import { ImgMunis, ImgPlus } from '@/constants/imgs';
import Image from 'next/image';
import { Percent, Calendar, Clock, Tag, User, Mail, Phone, Wrench, Plug } from 'lucide-react';
import { formatHour } from '../page/profile/HallReservation';

const BookingDetails = ({ data, loading, open }) => {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="space-y-8 pb-6">
      {/* Reservation Periods */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="flex items-center justify-center gap-2 text-xl font-semibold text-primary1 mb-6">
          <Calendar size={20} />
          {t('reservation_days')}
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-primary3/20">
              <tr>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">{t('Date')}</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">{t('from')}</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">{t('to')}</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">{t('Price')}</th>
                <th className="px-4 py-2 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">{t('day')}</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.entries(data?.periods || {}).map(([date, periodId], i) => {
                const e = data?.period_details?.find(p => p.id === periodId);
                return (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 text-center mx-auto py-2 whitespace-nowrap text-sm text-gray-800">{date}</td>
                    <td className="px-4 text-center mx-auto py-2 whitespace-nowrap text-sm text-gray-800">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-primary1" />
                        {formatHour(e?.from)}
                      </div>
                    </td>
                    <td className="px-4 text-center mx-auto py-2 whitespace-nowrap text-sm text-gray-800">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-primary1" />
                        {formatHour(e?.to)}
                      </div>
                    </td>
                    <td className="px-4 text-center mx-auto py-2 whitespace-nowrap text-sm text-gray-800">
                      <SAR price={data?.reservation_details?.package ? e?.package_price : e?.price} className="font-medium" />
                    </td>
                    <td className="px-4 text-center mx-auto py-2 whitespace-nowrap text-sm text-gray-800 capitalize">{e?.day}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pricing Summary */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="flex items-center justify-center gap-2 text-xl font-semibold text-primary1 mb-6">
          <Tag size={20} />
          {t('price_summary')}
        </h3>

        <div className="!space-y-1">
          {data?.reservation_details?.servicesPrice && <PriceRow label={t('details-reservation4')} value={<SAR price={data.reservation_details.servicesPrice} />} />}
          {data?.reservation_details?.equipmentsPrice && <PriceRow label={t('details-reservation5')} value={<SAR price={data.reservation_details.equipmentsPrice} />} />}
          <PriceRow label={t('Price')} value={<SAR price={data?.reservation_details?.subtotal} />} />
          <PriceRow label={t('vat')} value={<SAR price={data?.reservation_details?.taxValue} />} />
          <PriceRow label={t('price_with_vat')} value={<SAR price={data?.reservation_details?.totalWithTax} className="font-semibold text-lg" />} isLast />
        </div>
      </div>

      {/* Venue Contact */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="flex items-center justify-center gap-2 text-xl font-semibold text-primary1 mb-6">
          <User size={20} />
          {t('venue_contact')}
        </h3>

        <div className="space-y-4">
          <ContactRow icon={<User size={16} className="text-primary1" />} label={t('details-reservation10')} value={data?.venue?.name?.[locale]} />
          <ContactRow icon={<User size={16} className="text-primary1" />} label={t('details-reservation11')} value={data?.venue?.contact_person} />
          <ContactRow icon={<Mail size={16} className="text-primary1" />} label={t('details-reservation12')} value={data?.venue?.email} />
          <ContactRow icon={<Phone size={16} className="text-primary1" />} label={t('details-reservation13')} value={data?.venue?.phone} isLast />
        </div>
      </div>

      {/* Additional Services */}
      {data?.reservation_details?.services?.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="flex items-center justify-center gap-2 text-xl font-semibold text-primary1 mb-6">
            <Wrench size={20} />
            {t('details-reservation14')}
          </h3>

          <div className="space-y-4">
            {data.reservation_details.services.map((service, i) => (
              <ServiceItem key={i} name={service?.service?.name?.[locale]} price={service.price} count={service.count} isLast={i === data.reservation_details.services.length - 1} />
            ))}
          </div>
        </div>
      )}

      {/* Additional Equipment */}
      {data?.reservation_details?.equipments?.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h3 className="flex items-center justify-center gap-2 text-xl font-semibold text-primary1 mb-6">
            <Plug size={20} />
            {t('details-reservation15')}
          </h3>

          <div className="space-y-4">
            {data.reservation_details.equipments.map((equipment, i) => (
              <ServiceItem key={i} name={equipment?.equipment?.name?.[locale]} price={equipment.price} count={equipment.count} isLast={i === data.reservation_details.equipments.length - 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Reusable Components
const PriceRow = ({ label, value, isLast = false }) => (
  <div className={`flex justify-between items-center py-2 ${!isLast ? 'border-b border-gray-100' : ''}`}>
    <span className="text-gray-600 font-medium">{label}</span>
    <span className="text-gray-800">{value}</span>
  </div>
);

const ContactRow = ({ icon, label, value, isLast = false }) => (
  <div className={`flex items-center gap-3 ${!isLast ? 'border-b border-gray-100 pb-4' : ''}`}>
    <div className="mt-0.5">{icon}</div>
    <div className="flex-1 flex items-center justify-between ">
      <div className="text-sm font-medium text-gray-500">{label}</div>
      <div className="text-gray-800">{value}</div>
    </div>
  </div>
);

const ServiceItem = ({ name, price, count, isLast = false }) => (
  <div className={`flex items-center justify-between ${!isLast ? 'border-b border-gray-100 pb-4' : ''}`}>
    <div className="flex-1 font-medium text-gray-800 capitalize">{name}</div>

      <div className="flex items-center gap-2">
        <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Image src={ImgMunis} alt="Decrease" width={12} height={12} />
        </button>
        <span className="w-6 text-center">{count}</span>
        <button className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors">
          <Image src={ImgPlus} alt="Increase" width={12} height={12} />
        </button>
      </div>
      <div className="flex-1  w-full flex justify-end ">
        <SAR price={count * price} className="font-medium" />
      </div> 
  </div>
);

export default BookingDetails;
