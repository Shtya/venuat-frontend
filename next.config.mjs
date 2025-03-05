import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
	reactStrictMode: false,
	// reactStrictMode: true,
	// output: 'export',
	images: {
		domains: ['localhost' , 'api.venuat.com' , 'picsum.photos'],
	  },
};



export default withNextIntl(nextConfig);
