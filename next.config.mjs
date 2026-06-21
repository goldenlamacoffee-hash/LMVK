/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // Media uploads run through a Server Action. The default request body
    // limit is 1 MB, which silently rejects larger images and left the
    // uploader stuck on "Uploading…". Raise it above MAX_UPLOAD_BYTES (8 MB).
    serverActions: {
      bodySizeLimit: '12mb',
    },
  },
}

export default nextConfig
