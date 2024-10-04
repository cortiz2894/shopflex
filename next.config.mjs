/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  images: {
    domains: ['127.0.0.1:1337', 'localhost', '127.0.0.1'],
  },
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
    additionalData: `@import "@/styles/core.scss";`,
  },
};

export default nextConfig;
