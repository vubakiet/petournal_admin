/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    env: {
        NEXT_APP_API_URL: "https://petournal.onrender.com/api/v1",
        // NEXT_APP_API_URL: "http://localhost:5001/api/v1",
    },
    images: {
        domains: ["firebasestorage.googleapis.com"],
    },
    async redirects() {
        return [
            {
                source: "/dashboard",
                destination: "/dashboard/users",
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
