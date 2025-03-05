import React, { useState, useEffect } from 'react';

const Pagination = ({ limit, countRecored, page, onPageChange }) => {
    const totalPages = Math.ceil(countRecored / limit) || 1;
    const [currentPage, setCurrentPage] = useState(page);

    useEffect(() => {
        setCurrentPage(page);
    }, [page]);

    const handlePageClick = (newPage) => {
        if (newPage !== currentPage && newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            onPageChange(newPage);
        }
    };

    const getPages = () => {
        if (totalPages <= 1) return []; // Hide pagination if only one page
        
        const pages = [];
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1); // First Page

            if (currentPage > 4) pages.push('...'); // Left Ellipsis

            const start = Math.max(2, currentPage - 2);
            const end = Math.min(totalPages - 1, currentPage + 2);
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 3) pages.push('...'); // Right Ellipsis

            pages.push(totalPages); // Last Page
        }
        return pages;
    };

    return (
        totalPages >= 2 && <div className='flex items-center gap-2 justify-center mt-6'>
            <button 
                className=' cursor-pointer text-primary1 px-3 py-1 rounded-full hover:bg-primary3 disabled:opacity-50' 
                onClick={() => handlePageClick(1)} 
                disabled={currentPage === 1}
            >
                «
            </button>

            {getPages().map((page, index) => (
                <button  key={index}  className={`rounded-full w-10 h-10 flex items-center justify-center 
                        ${currentPage === page ? 'bg-primary1 text-white' : 'border border-gray-300 hover:bg-gray-200'} 
                        ${page === '...' ? 'cursor-default' : 'cursor-pointer'}`}
                    onClick={() => page !== '...' && handlePageClick(page)}
                    disabled={page === '...'}
                >
                    {page}
                </button>
            ))}

            <button 
                className='cursor-pointer text-primary1 px-3 py-1 rounded-full hover:bg-primary3 disabled:opacity-50' 
                onClick={() => handlePageClick(totalPages)} 
                disabled={currentPage === totalPages}
            >
                »
            </button>
        </div>
    );
};

export default Pagination;
