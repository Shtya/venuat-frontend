'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import React from 'react';
import { BarChartBig, FileSearch, RefreshCw } from 'lucide-react';
 
export default function NotFound({ title, description, onRetry }) {
  const t = useTranslations();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col my-8 items-center justify-center col-span-5 w-full rounded-2xl bg-neutral-50 border border-dashed border-gray-200 px-6 py-16 text-center shadow-sm"
    >
      {/* Illustration */}
      <div className="text-5xl mb-4 opacity-70 "> <FileSearch size={35}  /> </div>

      {/* Title */}
      <h1 className="text-gray-700 text-2xl font-semibold">
        {title || t('no_data_available')}
      </h1>

      {/* Description */}
      <p className="text-gray-500 mt-2 max-w-md">
        {description || t('no_results_found')}
      </p>
 
    </motion.div>
  );
}
