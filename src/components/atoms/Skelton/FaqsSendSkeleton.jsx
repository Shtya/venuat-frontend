export const FaqsSendSkeleton = () => {
    return (
        <div className='w-full'>
            {/* Skeleton for Tabs */}
            <div data-aos='fade-up' className='flex gap-4 flex-wrap justify-center items-center mt-[20px]'>
                {[...Array(3)].map((_, i) => (
                    <div key={i} className='min-w-[150px] min-h-[60px] bg-gray-200 rounded-full animate-pulse'></div>
                ))}
            </div>

            {/* Skeleton for Cards */}
            <div className='mt-6 space-y-4'>
                {[...Array(3)].map((_, i) => (
                    <div data-aos="fade-up" key={i} className='p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300'>
                        {/* Skeleton for Question */}
                        <div className='h-6 w-3/4 bg-gray-200 animate-pulse rounded-lg'></div>

                        {/* Skeleton for Status */}
                        <div className='mt-3 flex items-center'>
                            <div className='h-4 w-16 bg-gray-200 animate-pulse rounded-lg'></div>
                            <div className='ml-2 h-4 w-20 bg-gray-200 animate-pulse rounded-lg'></div>
                        </div>

                        {/* Skeleton for Answer */}
                        <div className='mt-3'>
                            <div className='h-4 w-16 bg-gray-200 animate-pulse rounded-lg'></div>
                            <div className='mt-1 h-4 w-full bg-gray-200 animate-pulse rounded-lg'></div>
                        </div>

                        {/* Skeleton for Asked On */}
                        <div className='mt-4 h-3 w-24 bg-gray-200 animate-pulse rounded-lg'></div>
                    </div>
                ))}
            </div>
        </div>
    );
};
