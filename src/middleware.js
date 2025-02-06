
import createMiddleware from 'next-intl/middleware';
import { locales, localePrefix } from './navigation';

export default createMiddleware({
  locales,
  localePrefix,
  defaultLocale: 'ar'
});

// only applies this middleware to files in the app directory
export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)' , "/(ar|en)/:path*", "/"]
};

