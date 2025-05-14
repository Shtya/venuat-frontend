import { CheckCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Button from '../atoms/button/Button';
import Image from 'next/image';

export default function SuccesReservationPopup({ onClose }) {
	const t = useTranslations()
    return (	
        <div className="flex flex-col items-center justify-center  text-center  pb-[50px] pt-[30px]  ">
			<Image src={"/assets/finish.png"} alt='' width={200} height={200} />
            <p className="text-gray-600 text-lg mt-[60px] max-w-[500px] w-full ">{ t("reservationSuccess2") }</p>
			{/* <Button classname={"mt-6 "} name={t("reservationSuccess3")} href={"/my-account?page=2"}  /> */}
        </div>
    );
}
