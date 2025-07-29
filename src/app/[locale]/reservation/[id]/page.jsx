'use client';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'next/navigation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from '@/navigation';
import { ChevronDown, FileText } from 'lucide-react';

// Components
import Breadcrumbs from '@/components/atoms/Breadcrumbs';
import Button from '@/components/atoms/button/Button';
import Image from 'next/image';
import Address_vesitor from '@/components/atoms/card/Address_vesitor';
import Rate_price from '@/components/atoms/card/Rate_price';
import Calendar from '@/components/atoms/calendar/Calendar';
import DetailsVenue from '@/components/page/confirm-reservation/DetailsVenue';
import SAR from '@/components/atoms/SAR';
import Rate_priceSkeleton from '@/components/atoms/Skelton/Rate_priceSkeleton';
import Address_vesitorSkeleton from '@/components/atoms/Skelton/Address_vesitorSkeleton';
 import SuccesReservationPopup from '@/components/popupComponent/SuccesReservationPopup';
import Popup from '@/components/molecules/Popup';
import RadioDate from '@/components/atoms/radio/RadioDate';

// Utilities and Hooks
import { useGlobalContext } from '@/context/GlobalContext';
import { formatHour } from '@/components/page/profile/HallReservation';
import AxiosInstance from '@/config/Axios';
import { ReservationSchema } from '@/schema/ReservationSchema';
import { hookUser } from '@/hooks/hookUser';
import { Notification } from '@/config/Notification';

// Constants
import { ImgPay, ImgVisa } from '@/constants/imgs';

/**
 * Custom hook for handling reservation confirmation logic
 */
export const useReservationConfirmation = ({ id }) => {
  const router = useRouter();
  const t = useTranslations();
  const [endDate, setEndDate] = useState();
  const { user } = hookUser();

  // Form handling
  const schema = useMemo(() => ReservationSchema({ endDate }), [endDate]);
  const formMethods = useForm({ resolver: yupResolver(schema) });
  const {
    register,
    trigger,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = formMethods;

  // State management
  const [venueData, setVenueData] = useState();
  const [loading, setLoading] = useState(true);
  const [loadingPricing, setLoadingPricing] = useState(true);
  const [error, setError] = useState(null);
  const [loadingReservation, setLoadingReservation] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isOpenPopup, setIsOpenPopup] = useState(false);
  const [selectedPeriods, setSelectedPeriods] = useState({});
  const [changeListen, setChangeListen] = useState(1);

  const searchParams = useSearchParams();
  const [packageId, setPackageId] = useState();

  // Context data
  const { Services, Equipments, subtotal, taxValue, totalWithTax, servicesPrice, equipmentsPrice, Days, setPriceVenue, setDays } = useGlobalContext();

  /**
   * Fetch venue data based on package ID
   */
  const fetchVenueData = async ({ query }) => {
    setLoadingPricing(true);
    try {
      const response = await AxiosInstance.get(`/venues/${id}/reservation-venue${query}`);
      setVenueData(response.data);
      setEndDate(response?.data?.package?.end_date);
    } catch (err) {
      setError(err.message || 'Failed to load venues');
    } finally {
      setLoading(false);
      setLoadingPricing(false);
    }
  };

  // Initialize data fetch
  useEffect(() => {
    const packageParam = searchParams.get('package');
    setPackageId(packageParam);
    fetchVenueData({ query: packageParam ? `?packageId=${packageParam}` : '' });
  }, [id, searchParams.get('package')]);

  // Handle quantity changes
  const countChange = watch('quantity');
  useEffect(() => {
    if (countChange) {
      fetchVenueData({ query: `?packageId=${packageId}` });
    }
  }, [countChange]);

  // Scroll to first error on submit
  useEffect(() => {
    if (isSubmit) {
      const firstErrorElement = document.querySelectorAll('.error')[0];
      firstErrorElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [isSubmit, errors]);

  /**
   * Handle form submission
   */
  const handleReservationSubmit = handleSubmit(async data => {
    setIsSubmit(true);

    // Filter periods within check-in/check-out range
    const filteredPeriods = Object.fromEntries(
      Object.entries(data?.periods || {}).filter(([dateStr]) => {
        const [day, month, year] = dateStr.split('/');
        const parsedDate = new Date(`${year}-${month}-${day}`);
        parsedDate.setHours(0, 0, 0, 0);

        const checkInDate = new Date(data?.check_in);
        const checkOutDate = new Date(data?.check_out);
        checkInDate.setHours(0, 0, 0, 0);
        checkOutDate.setHours(0, 0, 0, 0);
        return parsedDate >= checkInDate && parsedDate <= checkOutDate;
      })
    );

    // Prepare reservation data
    const reservationData = {
      user: user?.id,
      venue: +id,
      status: 'pending',
      check_in: data?.check_in,
      check_out: data?.check_out,
      periods: filteredPeriods,
      total_price: totalWithTax,
      reservation_details: {
        equipments: Equipments,
        services: Services,
        servicesPrice,
        equipmentsPrice,
        days: Days,
        subtotal,
        taxValue,
        totalWithTax
      }
    };

    if (packageId) {
      reservationData.package = +packageId;
      reservationData.reservation_details.package = +packageId;
    }

    // Submit reservation
    setLoadingReservation(true);
    try {
      await AxiosInstance.post(`/reservations`, reservationData);
      Notification(t('successReservation'), 'success');
      setIsOpenPopup(true);
      setValue('periods', {});
      setSelectedPeriods({});
      setChangeListen(changeListen + 1);

      setTimeout(() => {
        router.push('/my-account?page=2');
      }, 500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingReservation(false);
    }
  });

  return {
    selectedPeriods,
    packageId,
    changeListen,
    setSelectedPeriods,
    isOpenPopup,
    setIsOpenPopup,
    loadingReservation,
    loadingPricing,
    venue: venueData?.venue,
    package: venueData?.package,
    loading,
    errors,
    trigger,
    setValue,
    submit: handleReservationSubmit,
    watch,
    formMethods
  };
};

/**
 * Component for displaying price calculation for multiple days
 */
const PriceCalculation = ({ totalDays, price }) => {
  const locale = useLocale();
  const t = useTranslations();

  const getDaysLabel = count => {
    if (locale === 'ar') {
      if (count === 0) return 'لا أيام';
      if (count === 1) return 'يوم';
      if (count === 2) return 'يومان';
      if (count <= 10) return 'أيام';
      return 'يومًا';
    }
    return count === 0 ? 'no days' : count > 1 ? 'days' : 'day';
  };

  return (
    <span className="flex items-center gap-1 capitalize">
      {totalDays != 0 && (
        <>
          <span className="text-sm font-semibold">{totalDays}</span>
          <span className="text-sm">{getDaysLabel(totalDays)}</span>
          <Image src="/assets/multiplication.png" alt="" width={25} height={25} />
        </>
      )}
      <SAR price={price} cn="font-[700] text-[18px] text-primary1" />
    </span>
  );
};

/**
 * Main page component for reservation confirmation
 */
const ReservationConfirmationPage = ({ params }) => {
  const t = useTranslations();
  const locale = useLocale();
  const [minimized, setMinimized] = useState(true);
  const [disabled, setDisabled] = useState(true);

  // Breadcrumbs configuration
  const breadcrumbsData = [
    { name: 'availableHalls', value: '/available-halls' },
    { name: 'hallDetails', value: `/details-halls/${params.id}` },
    { name: 'confirmationDetails', value: '' }
  ];

  // Reservation data and handlers
  const { selectedPeriods, packageId, changeListen, setSelectedPeriods, isOpenPopup, setIsOpenPopup, loadingReservation, loadingPricing, package: reservationPackage, venue, loading, errors, trigger, setValue, submit, watch } = useReservationConfirmation({ id: params.id });

  const checkIn = watch('check_in');
  const checkOut = watch('check_out');
  const [periods, setPeriods] = useState({});

  // Calculate total price and days from selected periods
  const { totalPrice, totalDays } = Object.entries(selectedPeriods).reduce(
    (acc, [day, id]) => {
      const selectedItem = periods[day]?.find(p => p.id === id);
      if (selectedItem?.price) {
        acc.totalPrice += packageId ? selectedItem.package_price || 0 : selectedItem.price;
        acc.totalDays += 1;
      }
      return acc;
    },
    { totalPrice: 0, totalDays: 0 }
  );

  // Context data
  const { subtotal, taxValue, totalWithTax, servicesPrice, equipmentsPrice, Days, setPriceVenue, setDays } = useGlobalContext();

  // Fetch available periods for selected dates
  useEffect(() => {
    const fetchAvailablePeriods = async () => {
      if (!checkIn || !checkOut) return;

      const url = packageId ? `/venues/${params?.id}/periods/range?from=${checkIn}&to=${checkOut}&packageId=${packageId}` : `/venues/${params?.id}/periods/range?from=${checkIn}&to=${checkOut}`;

      try {
        const response = await AxiosInstance.get(url);
        setPeriods(response?.data);
      } catch (error) {
        setPeriods({});
      }
    };

    fetchAvailablePeriods();
  }, [checkIn, checkOut, changeListen]);

  // Update context with calculated days and price
  useEffect(() => {
    setDays(totalDays);
    setPriceVenue(totalPrice);
  }, [loading, totalPrice, loadingPricing]);

  // Update form values with selected periods
  useEffect(() => {
    Object.entries(selectedPeriods).forEach(async ([day, value]) => {
      setValue(`periods.${day?.split(':')[1].trim()}`, value);
    });
  }, [selectedPeriods, checkIn, checkOut, changeListen]);

  return (
    <main className="min-h-[100vh] !max-w-[1300px] container">
      <Breadcrumbs data={breadcrumbsData} />

      {loading ? (
        <LoadingSkeleton />
      ) : (
        <div className="max-lg:grid-cols-1 grid grid-cols-2 items-start relative my-[20px] mb-[80px]">
          <ReservationForm  setDisabled={setDisabled} checkIn={checkIn} checkOut={checkOut} errors={errors} setValue={setValue} trigger={trigger} watch={watch} periods={periods} selectedPeriods={selectedPeriods} setSelectedPeriods={setSelectedPeriods} changeListen={changeListen} venue={venue} locale={locale} packageId={packageId} loadingPricing={loadingPricing} />

          <img data-aos="zoom-out" className="max-lg:order-[-1] max-lg:mx-auto max-lg:mb-[20px] rounded-[30px] w-full max-w-[500px] rtl:mr-auto ltr:ml-auto bg-neutral-100 max-sm:max-h-[220px] max-h-[350px] object-contain" src={venue?.venueGalleries?.[0]?.imgs[0]} alt="" width={250} height={250} />
        </div>
      )}

 
      <div className="max-w-full mt-[80px] mx-auto">
        <DetailsSection minimized={minimized} setMinimized={setMinimized} t={t} setValue={setValue} reservationPackage={reservationPackage} venue={venue} loading={loading} />

        <PriceSummary loadingPricing={loadingPricing} Days={Days} totalPrice={totalPrice} servicesPrice={servicesPrice} equipmentsPrice={equipmentsPrice} taxValue={taxValue} subtotal={subtotal} totalWithTax={totalWithTax} t={t} />

        <Button checkAuth={true} isLoading={loadingReservation} disabled={disabled} onClick={submit} name={t('payNow')}classname=" z-[100] relative max-w-[400px] w-full mx-auto mt-[60px]" />

        <PaymentProviders t={t} />
      </div>

      <Popup title={t('reservationSuccess1')} cn={'!max-w-[800px]'} isOpen={isOpenPopup} onClose={() => setIsOpenPopup(false)} content={<SuccesReservationPopup onClose={() => setIsOpenPopup(false)} />} />
    </main>
  );
};

/**
 * Loading skeleton component
 */
const LoadingSkeleton = () => (
  <div className="max-lg:grid-cols-1 grid grid-cols-2 items-center relative my-[20px] mb-[80px] animate-pulse">
    <div className="p-[20px] max-lg:max-w-[500px] w-full max-lg:mx-auto">
      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-[20px]">
        <div className="h-[55px] bg-gray-300 rounded-[4px]"></div>
        <div className="h-[55px] bg-gray-300 rounded-[4px]"></div>
      </div>

      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-[20px] mt-[20px] mb-[40px]">
        <div className="h-[55px] bg-gray-300 rounded-[4px]"></div>
        <div className="h-[55px] bg-gray-300 rounded-[4px]"></div>
      </div>

      <Address_vesitorSkeleton />
      <Rate_priceSkeleton />
    </div>

    <div className="h-full max-lg:order-[-1] max-lg:mx-auto max-lg:mb-[20px] rounded-[30px] w-full max-w-[500px] rtl:mr-auto ltr:ml-auto bg-gray-300 max-sm:max-h-[220px] max-h-[350px]"></div>
  </div>
);

/**
 * Reservation form component
 */
const ReservationForm = ({ setDisabled , checkIn, checkOut, errors, setValue, trigger, watch, periods, selectedPeriods, setSelectedPeriods, changeListen, venue, locale, packageId, loadingPricing }) => {
  const t = useTranslations();

  return (
    <div className="sm:p-[20px] max-lg:max-w-[600px] w-full max-lg:mx-auto">
      <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-[20px] mb-[20px]">
        <Calendar KEY="check_in" label={t('CheckInDate')} error={errors?.check_in} setValue={setValue} watch={watch} trigger={trigger} place={t('from')} classname={'w-full'} cnInput="px-[20px] !border-secondry3 !border-[1px] !h-[45px] rounded-[4px]" />
        <Calendar KEY="check_out" label={t('CheckOutDate')} error={errors?.check_out} setValue={setValue} watch={watch} trigger={trigger} place={t('to')} classname={'w-full'} cnInput="px-[20px] !border-secondry3 !border-[1px] !h-[45px] rounded-[4px]" />
      </div>

      <div className="space-y-6 mt-2 mb-6">
        {Object.keys(periods).map((day, index) => (
          <div key={index} id={`day_${day?.split(':')[1].trim()}`} className="space-y-2 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-[5px] font-medium text-primary1">
                <span className="text-sm font-semibold">{day?.split(':')[0]}</span>
                <span className="text-xs text-black mt-[3px] bg-neutral-200 px-[5px] py-[2px] rounded-[3px]">{day?.split(':')[1]}</span>
              </div>

              {periods?.[day]?.length < 1 && <span className="inline-block px-4 py-2 text-sm font-normal text-gray-800 bg-gray-200 rounded-full border border-gray-300">{t('not-availabel')}</span>}
            </div>

            {periods?.[day]?.length >= 1 && (
              <RadioDate
                changeListen={changeListen}
                
                checkIn={checkIn}
                checkOut={checkOut}
                name={`day_${day}`}
                setDisabled={setDisabled}
                options={periods[day]?.map(item => ({
                  label: (
                    <div className="text-nowrap flex items-center gap-[5px] flex-wrap text-sm">
                      {formatHour(item.from)} - {formatHour(item.to)}
                    </div>
                  ),
                  price: packageId ? item?.package_price : item.price,
                  value: item.id,
                  booked_dates: item.booked_dates,
                  date: day?.split(':')[1].trim()
                }))}
                selected={selectedPeriods[day] || ''}
                onChange={val => setSelectedPeriods(prev => ({ ...prev, [day]: val }))}
              />
            )}
          </div>
        ))}
      </div>

      <Address_vesitor titleAddress={venue?.name?.[locale]} titleVistor={t('visitors_count')} e={venue} />
      <Rate_price rateTitle={t('rating')} ratings={venue?.ratings} />
    </div>
  );
};

/**
 * Details section component
 */
const DetailsSection = ({ minimized, setMinimized, t, setValue, reservationPackage, venue, loading }) => (
  <>
    <div className="flex items-center justify-between mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors cursor-pointer" onClick={() => setMinimized(!minimized)}>
      <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
        <FileText className="text-primary1" size={20} />
        {t('confirmationDetails')}
      </h2>
      <ChevronDown className={`text-gray-500 transition-all duration-300 ${!minimized ? 'rotate-180' : ''}`} size={24} />
    </div>

    <DetailsVenue setValue={setValue} Package={reservationPackage} venue={venue} loading={loading} cn={`${minimized ? 'max-h-[3500px] opacity-100' : 'max-h-0 opacity-0'} ease-in-out transition-all duration-500`} />
  </>
);

/**
 * Price summary component
 */
const PriceSummary = ({ loadingPricing, Days, totalPrice, servicesPrice, equipmentsPrice, taxValue, subtotal, totalWithTax, t }) => (

  <div className="space-y-4 my-6 pt-6">
    <div className="flex items-center justify-between">
      <span className="text-gray-700">{t('hallPricePerDays', { days: Days })}</span>
      {loadingPricing ? <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div> : <SAR price={totalPrice.toFixed(2)} className="font-bold text-lg text-primary1" />}
    </div>

    <div className="flex items-center justify-between">
      <span className="text-gray-700">{t('additionalServices')}</span>
      {loadingPricing ? <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div> : <PriceCalculation totalDays={Days} price={servicesPrice} />}
    </div>

    <div className="flex items-center justify-between">
      <span className="text-gray-700">{t('additionalEquipment')}</span>
      {loadingPricing ? <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div> : <PriceCalculation totalDays={Days} price={equipmentsPrice} />}
    </div>

    <div className="flex items-center justify-between">
      <span className="text-gray-700">{t('vatValue')}</span>
      {loadingPricing ? <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div> : <SAR price={taxValue} className="font-bold text-lg text-primary1" />}
    </div>

    <div className="flex items-center justify-between border-t border-gray-200 pt-4">
      <span className="font-semibold text-gray-800">{t('totalPrice')}</span>
      {loadingPricing ? <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div> : <SAR price={subtotal} className="font-bold text-lg text-primary1" />}
    </div>

    <div className="flex items-center justify-between bg-primary1/5 p-4 rounded-lg">
      <span className="font-bold text-gray-900">{t('totalWithVat')}</span>
      {loadingPricing ? <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div> : <SAR price={totalWithTax} className="font-bold text-xl text-primary1" />}
    </div>
  </div>
);

const PaymentProviders = ({ t }) => (
  <>
    <div className="h3 text-center mt-[50px] mb-[10px]">{t('poweredBy')}</div>
    <div className="flex gap-[20px] justify-center items-center">
      <Image className="max-sm:w-[50px] max-sm:h-[50px] w-[100px] h-[60px] object-contain" src={ImgPay} alt="" width={100} height={50} />
      <Image className="max-sm:w-[50px] max-sm:h-[50px] w-[100px] h-[60px] object-contain" src={ImgVisa} alt="" width={100} height={50} />
    </div>
  </>
);

export default ReservationConfirmationPage;
