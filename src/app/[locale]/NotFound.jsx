import Button from '@/components/atoms/button/Button';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';

const NotFound = () => {
  const t = useTranslations()

  return (
    <div className="min-h-[60vh] flex items-center justify-center   ">
      <div className="text-center">
        <h2 data-aos="fade-up" className=" h2 font-semibold text-primary1 "> {t("error_message")} </h2>
        <p data-aos="fade-up" className=" h3 font-[400] text-secondry3 mt-2"> {t("error_fixing")} </p>

        <Image data-aos="fade-up" alt='' src={"/assets/notfound.gif"} width={200} height={100} className='w-full max-sm:w-[200px] max-sm:my-[40px] max-sm:h-fit h-[300px] object-contain ' />
        <div className="mt-6">
          <Button name={t("browse_halls")} href={"/"} dataAos={"fade-up"} width={"max-w-[400px] w-full mx-auto "} outline={true} />
        </div>
        
      </div>
    </div>
  );
};

export default NotFound;
