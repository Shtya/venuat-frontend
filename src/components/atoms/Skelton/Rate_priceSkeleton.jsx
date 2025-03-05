export default function Rate_priceSkeleton({ cn }) {
	return (
	  <div className={`grid ${cn} items-start gap-[10px] max-sm:my-[10px] my-[20px] animate-pulse`}>
		{/* Rating Placeholder */}
		<div className="flex-col flex gap-[10px] max-sm:flex-row max-sm:gap-[10px]">
		  <div className="h-[20px] bg-gray-300 rounded w-1/2"></div>
		  <div className="flex items-center gap-[10px]">
			<div className="h-[20px] bg-gray-300 rounded w-[100px]"></div>
		  </div>
		</div>
  
		{/* Price Placeholder */}
		<div className="flex gap-[15px] max-sm:flex-row max-sm:gap-[10px]">
		  <div className="h-[20px] bg-gray-300 rounded w-1/2"></div>
		  <div className="h-[20px] bg-gray-300 rounded w-[100px]"></div>
		</div>
	  </div>
	);
  }