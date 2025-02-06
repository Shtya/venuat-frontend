
export default function ProgressBar({ currentStep, setCurrentStep, totalSteps }) {

    return (
        <div className='w-full my-[20px] '>
            <div className='relative flex gap-[40px] max-sm:gap-[15px] items-center'>

                <div className='flex items-center gap-[3px] w-full h-[4px] '>
                    {Array.from({ length: totalSteps }).map((e, i) => (
                        <div data-aos="fade-up" className={`w-full h-full bg-primary3 relative after:absolute after:right-0 after:top-0 ${currentStep > i ? 'after:w-full' : ''} after:w-0 after:h-full after:bg-primary1 rounded-[4px] overflow-hidden after:duration-300 duration-300  `} key={i}></div>
                    ))}
                </div>

            </div>
        </div>
    );
}
