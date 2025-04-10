import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
	reactStrictMode: false,
	// reactStrictMode: true,
	// output: 'export',
	images: {
		domains: ['localhost' , 'api.venuat.com' , "lh3.googleusercontent.com" , 'picsum.photos'],
	  },
};



export default withNextIntl(nextConfig);
