import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
	// reactStrictMode: true,
	// output: 'export',
};



export default withNextIntl(nextConfig);
