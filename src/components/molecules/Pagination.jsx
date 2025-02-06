import React, { useState } from 'react';

const Pagination = ({ totalPages, onPageChange }) => {
    const [currentPage, setCurrentPage] = useState(10);

    const handlePageClick = page => {
        setCurrentPage(page);
        onPageChange(page);
    };

    const getPages = () => {
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Add first page
            pages.push(1);

            // Add ellipsis if needed
            if (currentPage > 7) {
                pages.push('...');
            }

            // Add middle pages
            const start = Math.max(2, currentPage - 2);
            const end = Math.min(totalPages - 1, currentPage + 2);
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            // Add ellipsis if needed
            if (currentPage < totalPages - 3) {
                pages.push('...');
            }

            // Add last page
            pages.push(totalPages);
        }
        return pages;
    };

    return (
        <div className='flex items-center gap-[5px] justify-center mt-[40px] '>
            
			<button className='text-primary1 px-2 py-1 rounded-full hover:bg-primary3' onClick={() => handlePageClick(1)} disabled={currentPage === 1}>
                «
            </button>

            {getPages().map((page, index) => (
                <button 
					key={index} 
					className={`${currentPage === page ? 'bg-primary1 text-white' : 'border border-gray-300 hover:bg-gray-200'} rounded-full w-[35px] h-[35px] flex items-center justify-center ${page === '...' ? 'cursor-default' : 'cursor-pointer'}`} 
					onClick={() => page !== '...' && handlePageClick(page)} disabled={page === '...'}>
                    {page}
                </button>
            ))}

            <button className='text-primary1 px-2 py-1 rounded-full hover:bg-primary3' onClick={() => handlePageClick(totalPages)} disabled={currentPage === totalPages}>
                »
            </button>
        </div>
    );
};

export default Pagination;
