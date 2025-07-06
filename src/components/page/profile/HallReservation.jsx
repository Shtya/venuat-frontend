import SAR from '@/components/atoms/SAR';
import { SkeletonTable } from '@/components/atoms/Skelton/SkeltonTable';
import { hookBooking } from '@/hooks/hookBooking';
import { useLocale, useTranslations } from 'next-intl';
import React, { useState } from 'react';
import BookingDetails from '@/components/popupComponent/DetailsReservationPopup';
import Popup from '@/components/molecules/Popup';
import { Calendar, Info, Send, X } from 'lucide-react';
import { Link } from '@/navigation';
import CancelReservationPopup from '@/components/popupComponent/CancelReservationPopup';
import AxiosInstance from '@/config/Axios';
import { Notification } from '@/config/Notification';

export function formatHour(hour) {
  const h = parseInt(hour, 10);
  if (isNaN(h) || h < 0 || h > 24) return 'Invalid hour';

  const period = h >= 12 ? 'PM' : 'AM';
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const paddedHour = hour12 < 10 ? `0${hour12}` : `${hour12}`;

  return (
    <div className="rtl:flex-row-reverse flex justify-center gap-[5px] ">
      <span> {paddedHour} </span> <span> {period} </span>{' '}
    </div>
  );
}

export default function HallReservation() {
  const t = useTranslations();
  const locale = useLocale();
  const [isOpenPopup, setisOpenPopup] = useState(false);
  const [dataReservation, setdataReservation] = useState();
  const { booking, loading, setBooking } = hookBooking();

  const handleShowDetails = e => {
    setdataReservation(e);
    setisOpenPopup(true);
  };

  // Add these state variables
  const [cancelReservationId, setCancelReservationId] = useState(null);
  const [showCancelPopup, setShowCancelPopup] = useState(false);

  // Update your cancel handler
  const handleCancelClick = reservationId => {
    setCancelReservationId(reservationId);
    setShowCancelPopup(true);
  };

  // Add the confirmation handler
  const handleConfirmCancel = async () => {
    try {
      await AxiosInstance.patch(`/reservations/status-and-payment`, { reservationId: cancelReservationId, status: 'cancelled' });
      Notification(t('reservationCancelled'), 'success');
      setBooking(booking.map(reservation => (reservation.id === cancelReservationId ? { ...reservation, status: 'cancelled' } : reservation)));
    } catch (error) {
      Notification(error.response?.data?.message || t('errorOccurred'), 'error');
    } finally {
      setShowCancelPopup(false);
      setCancelReservationId(null);
    }
  };

  if (loading) {
    return <SkeletonTable />;
  }

  return (
    <div className="w-full overflow-auto main-shadow ">
      <div className="w-full max-h-[80vh] overflow-auto rounded-lg shadow-sm">
        {/* Table */}
        <table className="min-w-[1000px] w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-primary1 to-blue-600">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">{'ID'}</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">{t('Status')}</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">{t('reservations')}</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">{t('from')}</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">{t('to')}</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">{t('hallName')}</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">{t('totalPrice')}</th>
              <th className="px-6 py-4 text-center text-xs font-medium text-white uppercase tracking-wider">{t('actions')}</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {booking?.length > 0 ? (
              booking
                ?.sort((a, b) => b.id - a.id)
                .map((e, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary1">#{e?.id}</td>

                    {/* Status Indicator */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      {e?.status === 'pending' ? (
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-yellow-400 mr-2 animate-pulse"></div>
                          <span className="px-2 py-1 text-xs font-medium   text-yellow-800">
                            <span className="capitalize"> {t('pendingApproval')} </span>
                            <div className="text-xs text-yellow-600 mt-1">{t('waitingOwnerApproval')}</div>
                          </span>
                        </div>
                      ) : e?.status === 'cancelled' ? (
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                          <span className="px-2 py-1 text-xs font-medium   text-red-800">
                            <span className="capitalize"> {t('cancelled')} </span>
                            <div className="text-xs text-red-600 mt-1">{t('reservationCancelled')}</div>
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <div className="h-3 w-3 rounded-full bg-green-500 mr-2"></div>
                          <span className="px-2 py-1 text-xs font-medium  text-green-800">
                            <span className="capitalize"> {t('approved')} </span>
                            <div className="text-xs text-green-600 mt-1">{t('reservationConfirmed')}</div>
                          </span>
                        </div>
                      )}
                    </td>

                    {/* Reservation Details */}
                    {e?.status === 'approved' ? (
                      <>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="space-y-1">
                            {Object.keys(e?.periods).map((ele, idx) => (
                              <div key={idx} className="border-b border-gray-100 last:border-0 pb-1 last:pb-0">
                                {ele}
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="space-y-1">
                            {Object.entries(e?.periods || {}).map(([date, periodId], i) => {
                              const detail = e?.period_details?.find(p => p.id === periodId);
                              return (
                                <div key={i} className="border-b border-gray-100 last:border-0 pb-1 last:pb-0">
                                  {formatHour(detail?.from)}
                                </div>
                              );
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <div className="space-y-1">
                            {Object.entries(e?.periods || {}).map(([date, periodId], i) => {
                              const detail = e?.period_details?.find(p => p.id === periodId);
                              return (
                                <div key={i} className="border-b border-gray-100 last:border-0 pb-1 last:pb-0">
                                  {formatHour(detail?.to)}
                                </div>
                              );
                            })}
                          </div>
                        </td>
                      </>
                    ) : (
                      <td colSpan={3} className="px-6 py-4 text-sm text-gray-500 italic">
                        {e?.status === 'cancelled' ? t('reservationWasCancelled') : t('reservationNotConfirmed')}
                      </td>
                    )}

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary1">{e?.venue?.name?.[locale]}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary1">
                      <SAR price={e?.total_price} />
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end space-x-2">
                      <button onClick={() => handleShowDetails(e)} className="text-primary1 hover:text-blue-700 transition-colors p-2 rounded-full hover:bg-blue-50" title={t('viewDetails')}>
                        <Info size={18} />
                      </button>
                      <Link href={`/send-msg/${e.id}`} className="text-green-600 hover:text-green-800 transition-colors p-2 rounded-full hover:bg-green-50" title={t('sendMessageToVenue')}>
                        <Send size={18} />
                      </Link>

                      {e.status === 'pending' && (
                        <button onClick={() => handleCancelClick(e.id)} className="text-red-600 hover:text-red-800 transition-colors p-2 rounded-full hover:bg-red-50" title={t('cancelReservation')}>
                          <X size={18} />
                        </button>
                      )}
                    </td>
                  </tr>
                ))
            ) : (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center text-gray-400">
                    <Calendar size={48} className="mb-4" />
                    <p className="text-lg">{t('noReservation')}</p>
                    <p className="text-sm mt-2">{t('noReservationSubtext')}</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Popup title={t('cancelReservationTitle')} isOpen={showCancelPopup} onClose={() => setShowCancelPopup(false)} content={<CancelReservationPopup onConfirm={handleConfirmCancel} onClose={() => setShowCancelPopup(false)} />} />
      <Popup title={t('reservationDetails')} cn={'!max-w-[800px]'} isOpen={isOpenPopup} onClose={() => setisOpenPopup(false)} content={<BookingDetails data={dataReservation} loading={loading} open={!isOpenPopup} onClose={() => setisOpenPopup(false)} />} />
    </div>
  );
}
