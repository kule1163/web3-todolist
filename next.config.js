/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
    SEPOLIA_URL: process.env.SEPOLIA_URL,
    PRIVATE_KEY: process.env.PRIVATE_KEY,
  },
};

module.exports = nextConfig;
