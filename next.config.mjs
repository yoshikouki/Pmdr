import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  customWorkerSrc: "src/worker",
  dest: "public",
});

/** @type {import('next').NextConfig} */
const nextConfig = {};

export default withPWA(nextConfig);
