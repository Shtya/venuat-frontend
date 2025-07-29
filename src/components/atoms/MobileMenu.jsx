'use client';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import DropdownLang from './DropdownLang.jsx';
import { ImgUserPrimary } from '@/constants/imgs.js';

const menuVariants = {
  hidden: {
    x: '-100%',
    opacity: 0,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      when: 'afterChildren',
      staggerChildren: 0.05
    }
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 30,
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200
    }
  }
};

export default function MobileMenu({ path, show, handleToggle, place, links, user, t, MyAccount, SignIn }) {
  const bgColor = place ? 'bg-black/50 backdrop-blur-[100px] ' : 'bg-white/95';
  const textColor = place ? 'text-white' : 'text-secondary1';
  const logo = place ? 'logo-white' : 'logo';
  const menuIcon = show != "hidden" ? 'close' : place ? 'menu-white' : 'menu';

  return (
    <>
      {/* Mobile Header Bar */}
      <div className={`lg:hidden fixed z-[1000] w-full top-0 flex items-center justify-between px-5 py-4 ${place ? 'bg-black' : 'bg-white shadow-md'}`}>
        <div className="flex items-center gap-3">
          <motion.button whileTap={{ scale: 0.9 }} onClick={handleToggle} aria-label="Toggle menu" className="p-1">
            <Image src={`/assets/${menuIcon}.svg`} alt="menu" width={25} height={25} className="hover:opacity-80 transition-opacity" />
          </motion.button>
          <DropdownLang color={textColor} />
        </div>

        <Link href="/">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Image src={`/assets/${logo}.svg`} alt="logo" width={130} height={60} />
          </motion.div>
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {show != "hidden" && (
          <motion.div initial="hidden" animate="visible" exit="hidden" variants={menuVariants} className={`fixed inset-0 z-[999] h-screen w-full ${bgColor} backdrop-blur-sm pt-20 px-8`}>
            <div className="flex flex-col h-full pt-12 overflow-y-auto">
              {/* Navigation Links */}
              <motion.ul className="flex flex-col gap-8 mb-12">
                {links?.map((e, i) => (
                  <motion.li key={i} variants={itemVariants} className="overflow-hidden">
                    <Link
                      href={e.value}
                      onClick={handleToggle}
                      className={`
                        text-2xl font-medium relative block py-2
                        ${e?.cn}
                        ${textColor} hover:text-primary1
                        ${path === e.value ? `font-bold text-primary1` : ''}
                      `}
                    >
                      {e.name}
                      {path === e.value && <motion.span className="absolute left-0 bottom-0 w-full h-0.5 bg-primary1" layoutId="mobileUnderline" />}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>

              {/* User Section */}
              <motion.div className="flex flex-col gap-8 pb-12" variants={itemVariants}>
                {user ? (
                  <Link href={MyAccount} className="flex items-center gap-4" onClick={handleToggle}>
                    <motion.div whileHover={{ scale: 1.05 }} className="w-12 h-12 flex items-center justify-center rounded-full bg-primary3 border border-gray-200 overflow-hidden">
                      <Image className="w-full h-full object-cover" src={user?.avatar || ImgUserPrimary} alt="user avatar" width={48} height={48} />
                    </motion.div>
                    <div className="flex flex-col">
                      <div className={`text-sm ${textColor} font-medium opacity-80`}>{t('hello')}</div>
                      <div className={`text-lg ${textColor} font-semibold capitalize`}>{user?.full_name?.split(' ')[0]}</div>
                    </div>
                  </Link>
                ) : (
                  <Link
                    href={SignIn}
                    onClick={handleToggle}
                    className={`
                      text-xl ${textColor} font-medium px-4 py-3 rounded-lg
                      ${place ? 'hover:bg-white/10' : 'hover:bg-gray-100'}
                    `}
                  >
                    {t('login')}
                  </Link>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
