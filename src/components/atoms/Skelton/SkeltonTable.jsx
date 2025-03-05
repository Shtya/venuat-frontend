export const SkeletonTable = () => {
	return (
	  <div className="w-full overflow-auto main-shadow">
		<div className="w-full rounded-[20px] max-h-[80vh] overflow-auto">
		  {/* Skeleton for Table Headers */}
		  <div className="min-w-[1000px] w-full">
			<div className="grid grid-cols-[130px,130px,130px,300px,130px,1fr,1fr] gap-2 border-b-[1px] border-[#D5DBF6] py-[20px] px-[10px]">
			  {[...Array(7)].map((_, i) => (
				<div
				  key={i}
				  className="h-6 bg-gray-200 animate-pulse rounded-[10px]"
				></div>
			  ))}
			</div>
		  </div>
  
		  {/* Skeleton for Table Rows */}
		  <div className="min-w-[1000px] w-full">
			{[...Array(6)].map((_, i) => (
			  <div
				key={i}
				className="grid grid-cols-[130px,130px,130px,300px,130px,1fr,1fr] gap-2 border-b-[1px] border-[#D5DBF6] py-[10px] px-[10px]"
			  >
				{[...Array(7)].map((_, j) => (
				  <div
					key={j}
					className="h-[80px] bg-gray-200 animate-pulse rounded-[10px]"
				  ></div>
				))}
			  </div>
			))}
		  </div>
		</div>
	  </div>
	);
  };