// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import { FaRegLaughSquint } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const marqueeItems = [
  "✨ CAPTURE THE MOMENT ✨",
  "📸 MOMENT RIZZ 🎞️",
  "🌟 SAY TUNG TUNG SAHUR! 📷",
  "⚡ POWERED BY CAMCY ⚡",
  "🎉 EVENT-READY FUN 🥳",
  "😋 SMILE, SNAP & SIGMA 😋",
];

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Camcy Photo Booth | Free Online Photobooth App</title>
        <meta
          name="description"
          content="Free simple photobooth online - Camcy Booth offers fun virtual photo experience with instant sharing. No downloads, no signups!"
        />
        <meta
          name="keywords"
          content="camcy photo booth, photo booth free, simple photobooth, online photobooth, virtual photo booth, webcam fun"
        />
        <meta
          property="og:title"
          content="Camcy Photo Booth | Free Online Photobooth"
        />
        <meta
          property="og:description"
          content="Create fun photos instantly with our free simple photobooth. Works right in your browser!"
        />
        <meta property="og:url" content="https://camcybooth.vercel.app" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://camcybooth.vercel.app/preview.jpg"
        />
        <link rel="canonical" href="https://camcybooth.vercel.app" />
      </Helmet>

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Camcy Photo Booth",
          url: "https://camcybooth.vercel.app",
          description: "Free simple photobooth app that works in your browser",
          applicationCategory: "PhotographyApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        })}
      </script>

      <div className="relative bg-black h-screen w-full overflow-hidden">
        {/* Top Infinite Marquee */}
        <div className="absolute top-10 w-full overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{
              x: ["0%", "-100%"],
              transition: {
                x: { repeat: Infinity, duration: 20, ease: "linear" },
              },
            }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="inline-block mx-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-2xl md:text-4xl font-bold tracking-wider">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Infinite Marquee (reverse) */}
        <div className="absolute bottom-10 w-full overflow-hidden">
          <motion.div
            className="flex whitespace-nowrap"
            animate={{
              x: ["-100%", "0%"],
              transition: {
                x: { repeat: Infinity, duration: 20, ease: "linear" },
              },
            }}
          >
            {[...marqueeItems, ...marqueeItems].map((item, i) => (
              <div key={i} className="inline-block mx-8">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 text-2xl md:text-4xl font-bold tracking-wider">
                  {item}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Main Content */}
        <div className="h-full flex flex-col items-center justify-center p-4 relative z-10">
          {/* Welcome Text */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-gray-400 text-2xl mb-2"
          >
            Step into the Booth
          </motion.div>

          {/* Logo with SEO-friendly H1 */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            <h1 className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
              Camcy Booth
            </h1>
          </motion.div>

          {/* Action Button */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative mt-12"
          >
            <button
              aria-label="Start the free photobooth"
              onClick={() => navigate("/cheers")}
              className="relative overflow-hidden group px-16 py-5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xl md:text-2xl shadow-lg z-20"
            >
              <span className="relative z-10">Start Free Photobooth</span>
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            {/* Spinning Glow Border */}
            <motion.div
              className="absolute -inset-1 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 opacity-70 z-10"
              initial={{ rotate: 0 }}
              whileHover={{
                rotate: 360,
                transition: { duration: 1.5, repeat: Infinity, ease: "linear" },
              }}
              style={{ filter: "blur(8px)" }}
            />
          </motion.div>

          {/* Hidden SEO Text (for search engines) */}
          <div className="hidden" aria-hidden="true">
            <h2>Free Simple Photobooth Online</h2>
            <p>
              Camcy Photo Booth is a completely free online photobooth that
              works in any browser. Create fun photos with your webcam, add
              virtual effects, and share instantly - no downloads required!
            </p>
            <p>
              Perfect for: virtual parties, online events, wedding photo booths,
              and social media content creation.
            </p>
          </div>

          {/* Attribution */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-2 flex items-center gap-2"
          >
            <a
              href="https://github.com/reylam"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <FiGithub className="text-gray-400 group-hover:text-cyan-400 text-xl transition-colors" />
                <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity" />
              </div>
              <span className="text-gray-400 group-hover:text-cyan-400 text-sm font-mono transition-colors">
                reylam
              </span>
            </a>
            <span className="text-gray-600">|</span>
            <FaRegLaughSquint className="text-gray-400 text-xl" />
            <span className="text-gray-500 text-sm">RLS</span>
          </motion.div>
        </div>

        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-500 opacity-10 blur-3xl -z-0" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500 opacity-10 blur-3xl -z-0" />

        {/* Particle Effects */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => {
            const size = Math.random() * 10 + 2;
            const duration = Math.random() * 10 + 10;
            return (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white opacity-5"
                style={{
                  width: size,
                  height: size,
                  top: Math.random() * 100 + "vh",
                  left: Math.random() * 100 + "vw",
                }}
                animate={{
                  y: [0, -50],
                  x: [0, 50],
                  transition: {
                    duration,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  },
                }}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
