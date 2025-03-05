export default function Address_vesitorSkeleton({ cn }) {
	return (
	  <div className={`grid ${cn} items-center gap-[10px] animate-pulse`}>
		{/* Address Placeholder */}
		<div className="row max-sm:flex gap-[10px] items-center">
		  <div className="h-[20px] bg-gray-300 rounded w-3/4"></div>
		  <div className="h-[20px] mt-[10px] bg-gray-300 rounded w-1/2"></div>
		</div>
  
		{/* Visitor Count Placeholder */}
		<div className="row max-sm:flex gap-[10px] items-center">
		  <div className="h-[20px] bg-gray-300 rounded w-3/4"></div>
		  <div className="h-[20px] mt-[10px] bg-gray-300 rounded w-1/2"></div>
		</div>
	  </div>
	);
  }