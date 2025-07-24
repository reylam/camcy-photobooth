import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Webcam from "react-webcam";
import {
  Camera,
  Timer,
  Image,
  Filter,
  Download,
  ChevronRight,
  Upload,
  FlipHorizontal,
  Video,
  Keyboard,
} from "lucide-react";
import { FiGithub } from "react-icons/fi";
import { FaRegLaughSquint } from "react-icons/fa";
import useSound from "use-sound";
import shutter from "../assets/shutter.mp3";
import { HiChevronDoubleRight } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Cheer() {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [capturedImages, setCapturedImages] = useState([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [delay, setDelay] = useState(3);
  const [stripCount, setStripCount] = useState(4);
  const [activeFilter, setActiveFilter] = useState("none");
  const [currentStep, setCurrentStep] = useState(0);
  const [countdown, setCountdown] = useState(null);
  const [flash, setFlash] = useState(false);
  const [playShutter] = useSound(shutter);
  const [devices, setDevices] = useState([]);
  const [deviceId, setDeviceId] = useState("");
  const [mirrored, setMirrored] = useState(true);
  const [showShortcuts, setShowShortcuts] = useState(false);

  const videoConstraints = {
    width: 640,
    height: 480,
    facingMode: "user",
    deviceId: deviceId ? { exact: deviceId } : undefined,
  };

  const filters = [
    { name: "none", label: "Normal" },
    { name: "bw", label: "Black & White" },
    { name: "vintage", label: "Vintage" },
    { name: "old-photo", label: "Old Photo" },
    { name: "amber", label: "Amber" },
    { name: "nocturne", label: "Nocturne" },
    { name: "mossy", label: "Mossy" },
    { name: "dust", label: "Dust" },
    { name: "soft", label: "Soft" },
    { name: "instax", label: "Instax" },
    { name: "dv", label: "DV" },
    { name: "dv-soft", label: "DV Soft" },
    { name: "retro-warm", label: "Retro Warm" },
    { name: "candy-bright", label: "Candy Bright" },
  ];

  // SEO Metadata
  const seoData = {
    title: "Camcy Photo Booth | Free Online Photobooth App",
    description:
      "Create fun photo strips with Camcy's free online photobooth. Capture, customize, and share your moments instantly!",
    keywords:
      "free photobooth, online camera app, photo strip maker, webcam effects, camcy photo booth",
  };

  // Handle device enumeration
  const handleDevices = (mediaDevices) => {
    const videoDevices = mediaDevices.filter(
      ({ kind }) => kind === "videoinput"
    );
    setDevices(videoDevices);
    if (videoDevices.length > 0 && !deviceId) {
      setDeviceId(videoDevices[0].deviceId);
    }
  };

  useEffect(() => {
    navigator.mediaDevices.enumerateDevices().then(handleDevices);
  }, []);

  const capture = () => {
    if (capturedImages.length >= stripCount) return;

    setIsCapturing(true);
    setCountdown(delay);
  };

  useEffect(() => {
    if (countdown === null) return;

    const timer = setTimeout(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        setFlash(true);
        playShutter();

        setTimeout(() => {
          const imageSrc = webcamRef.current.getScreenshot();
          setCapturedImages([
            ...capturedImages,
            { src: imageSrc, filter: activeFilter },
          ]);
          setCountdown(null);
          setIsCapturing(false);
          setFlash(false);
        }, 100);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, capturedImages, activeFilter]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle shortcuts info with 'i' key
      if (e.key === "i") {
        setShowShortcuts(!showShortcuts);
      }
      // Capture with 'c' or volume up key (175)
      if (e.key === "c" || e.keyCode === 175) {
        if (!isCapturing && capturedImages.length < stripCount) {
          capture();
        }
      }
      // Reset with 'r' or volume down key (174)
      if (e.key === "r" || e.keyCode === 174) {
        resetSession();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCapturing, capturedImages, stripCount, showShortcuts]);

  const resetSession = () => {
    setCapturedImages([]);
    setCurrentStep(0);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCapturedImages([
          ...capturedImages,
          { src: event.target.result, filter: activeFilter },
        ]);
      };
      reader.readAsDataURL(file);
    }
  };

  const getFilterClass = (filterName) => {
    const filterClasses = {
      bw: "filter grayscale",
      vintage:
        "filter brightness-95 contrast-90 sepia-[0.3] saturate-70 hue-rotate-[10deg]",
      "old-photo": "filter sepia-60 contrast-110 brightness-90 saturate-80",
      amber: "filter sepia-60 saturate-200 hue-rotate-10 brightness-90",
      nocturne: "filter brightness-80 contrast-120 saturate-80 hue-rotate-10",
      mossy: "filter brightness-90 contrast-110 saturate-120 hue-rotate-70",
      dust: "filter brightness-95 contrast-90 saturate-90",
      soft: "filter brightness-105 contrast-90 saturate-90 blur-1",
      instax: "filter brightness-105 contrast-95 saturate-110 hue-rotate-350",
      dv: "filter brightness-400 contrast-60 saturate-80 sepia",
      "dv-soft":
        "filter brightness-110 contrast-90 saturate-80 sepia blur-[2px]",
      "retro-warm":
        "filter brightness-100 contrast-85 saturate-70 sepia-[0.15] hue-rotate-[6deg]",
      "candy-bright":
        "filter brightness-110 contrast-105 saturate-160 hue-rotate-[330deg]",
    };
    return filterClasses[filterName] || "";
  };

  const handleProceedToFinal = () => {
    navigate("/final", {
      state: {
        images: capturedImages,
        stripCount: stripCount,
      },
    });
  };

  return (
    <>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>{seoData.title}</title>
        <meta name="description" content={seoData.description} />
        <meta name="keywords" content={seoData.keywords} />
        <meta property="og:title" content={seoData.title} />
        <meta property="og:description" content={seoData.description} />
        <meta property="og:url" content="https://camcybooth.vercel.app/cheer" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://camcybooth.vercel.app/cheer" />
      </Helmet>

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Camcy Photo Booth",
          url: "https://camcybooth.vercel.app/cheer",
          description: "Free online photobooth app for creating photo strips",
          applicationCategory: "PhotographyApplication",
          operatingSystem: "Web",
          offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
          },
        })}
      </script>

      <div className="min-h-screen bg-black text-white relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
        >
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-blue-500"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, (Math.random() - 0.5) * 100],
                x: [0, (Math.random() - 0.5) * 100],
                opacity: [0.1, 0.2, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}
        </motion.div>

        {/* Keyboard shortcuts info modal */}
        <AnimatePresence>
          {showShortcuts && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
              onClick={() => setShowShortcuts(false)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-gray-900 rounded-xl p-6 max-w-md w-full border border-gray-700 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Keyboard size={20} /> Keyboard Shortcuts
                  </h3>
                  <button
                    onClick={() => setShowShortcuts(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-300">Take Photo</span>
                    <span className="font-mono bg-gray-800 px-2 py-1 rounded text-sm">
                      C
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-300">Reset Session</span>
                    <span className="font-mono bg-gray-800 px-2 py-1 rounded text-sm">
                      R
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-800">
                    <span className="text-gray-300">Show Shortcuts</span>
                    <span className="font-mono bg-gray-800 px-2 py-1 rounded text-sm">
                      I
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-300">Volume Up/Down</span>
                    <span className="text-sm text-gray-400">
                      Also works as Capture/Reset
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Keyboard shortcut hint button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowShortcuts(true)}
          className="fixed bottom-20 right-4 z-40 bg-gray-900 bg-opacity-70 p-3 rounded-full border border-gray-700 shadow-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <Keyboard size={20} />
        </motion.button>

        <div className="container mx-auto px-4 py-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 10,
            }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Camcy Booth
            </h1>
            <p className="text-gray-400">
              Create your photo sigma strip, in your area!
            </p>
          </motion.div>

          {/* Hidden SEO Text (for search engines) */}
          <div className="hidden" aria-hidden="true">
            <h2>Free Online Photobooth App</h2>
            <p>
              Camcy Photo Booth is a completely free online photobooth that
              works in any browser. Create fun photo strips with your webcam,
              add virtual effects, and share instantly - no downloads required!
            </p>
            <p>
              Features: multiple photo layouts, countdown timer, various
              filters, and instant sharing.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left side - Webcam and Controls */}
            <div className="flex-1">
              {/* Controls above camera */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
              >
                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Timer size={16} /> Timer:
                  </label>
                  <select
                    value={delay}
                    onChange={(e) => setDelay(parseInt(e.target.value))}
                    className="w-full bg-gray-800 border border-gray-700 text-white p-2 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    {[3, 5, 7, 10].map((sec) => (
                      <option key={sec} value={sec}>
                        {sec} seconds
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Image size={16} /> Photos:
                  </label>
                  <select
                    value={stripCount}
                    onChange={(e) => {
                      const newCount = parseInt(e.target.value);
                      setStripCount(newCount);
                      // Trim images if reducing count
                      if (capturedImages.length > newCount) {
                        setCapturedImages(capturedImages.slice(0, newCount));
                      }
                    }}
                    className="w-full bg-gray-800 border border-gray-700 text-white p-2 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    {[2, 3, 4, 5].map((count) => (
                      <option key={count} value={count}>
                        {count} photos
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                    <Filter size={16} /> Filter:
                  </label>
                  <select
                    value={activeFilter}
                    onChange={(e) => setActiveFilter(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 text-white p-2 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    {filters.map((filter) => (
                      <option key={filter.name} value={filter.name}>
                        {filter.label}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>

              {/* Additional camera controls */}
              <div className="flex gap-4 mb-4">
                {devices.length > 1 && (
                  <div className="flex-1 space-y-1">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-300">
                      <Video size={16} /> Camera:
                    </label>
                    <select
                      value={deviceId}
                      onChange={(e) => setDeviceId(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 text-white p-2 rounded-lg text-sm focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    >
                      {devices.map((device, index) => (
                        <option key={device.deviceId} value={device.deviceId}>
                          {device.label || `Camera ${index + 1}`}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="flex items-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setMirrored(!mirrored)}
                    className={`flex items-center gap-2 px-4 py-2 ${
                      mirrored ? "bg-cyan-600" : "bg-gray-800"
                    } rounded-lg text-sm`}
                  >
                    <FlipHorizontal size={16} />
                    Mirror
                  </motion.button>
                </div>
              </div>

              {/* Camera */}
              <div className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 shadow-lg">
                {currentStep === 0 ? (
                  <>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      videoConstraints={videoConstraints}
                      mirrored={mirrored}
                      className={`w-full h-auto transition-all duration-300 ${getFilterClass(
                        activeFilter
                      )} ${flash ? "brightness-150" : ""}`}
                    />
                    {countdown !== null && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-opacity-30"
                      >
                        <motion.div
                          key={countdown}
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 1.5, opacity: 0 }}
                          transition={{ type: "spring", stiffness: 500 }}
                          className="text-9xl font-bold text-white drop-shadow-lg"
                        >
                          {countdown}
                        </motion.div>
                      </motion.div>
                    )}
                  </>
                ) : (
                  <div className="p-8 text-center h-full flex flex-col items-center justify-center min-h-[480px]">
                    <motion.h2
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl mb-6 font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent"
                    >
                      Your photos are ready!
                    </motion.h2>
                    <p className="text-gray-400 mb-6">
                      {capturedImages.length} photos captured
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-center gap-4">
                {currentStep === 0 && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => fileInputRef.current.click()}
                      className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-full font-medium hover:bg-gray-700 transition border border-gray-700"
                    >
                      <Upload size={18} /> Upload Photo
                    </motion.button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileUpload}
                      accept="image/*"
                      className="hidden"
                    />
                  </>
                )}

                {currentStep === 0 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={
                      capturedImages.length >= stripCount
                        ? () => setCurrentStep(1)
                        : capture
                    }
                    disabled={isCapturing}
                    className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${
                      capturedImages.length >= stripCount
                        ? "bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 shadow-lg"
                        : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:opacity-90 shadow-lg"
                    }`}
                  >
                    {capturedImages.length >= stripCount ? (
                      <>
                        Next <ChevronRight size={20} />
                      </>
                    ) : (
                      <>
                        <Camera size={20} /> Take Photo ({capturedImages.length}
                        /{stripCount})
                      </>
                    )}
                  </motion.button>
                ) : (
                  <div className="flex gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={resetSession}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full font-bold hover:opacity-90 transition shadow-lg"
                    >
                      <Camera size={20} /> New Session
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleProceedToFinal}
                      className="flex items-center gap-2 px-8 py-3 bg-gradient-to-l from-cyan-700 to-blue-600 rounded-full font-bold hover:opacity-90 transition shadow-lg"
                    >
                      Customize Strip <HiChevronDoubleRight />
                    </motion.button>
                  </div>
                )}
              </div>
            </div>

            {/* Right side - Preview */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gray-900 p-6 rounded-xl border border-gray-800 shadow-lg"
              >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Image size={20} /> Photo Strip Preview
                </h2>

                {capturedImages.length > 0 ? (
                  <div
                    id="photo-strip"
                    className={`grid gap-4 ${
                      stripCount <= 3 ? "grid-cols-1" : "grid-cols-2"
                    }`}
                  >
                    <AnimatePresence>
                      {capturedImages.map((img, index) => (
                        <motion.div
                          key={index}
                          className="relative overflow-hidden rounded-lg"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                            delay: index * 0.1,
                          }}
                          layout
                        >
                          <img
                            src={img.src}
                            alt={`Capture ${index + 1}`}
                            className={`w-full h-auto ${getFilterClass(
                              img.filter
                            )} transition-all duration-300`}
                          />
                          <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded-full text-xs font-medium">
                            {index + 1}/{stripCount}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-800 rounded-lg h-64 flex flex-col items-center justify-center text-gray-400"
                  >
                    <Image size={48} className="mb-4 opacity-30" />
                    <p className="text-center max-w-xs">
                      Your captured photos will appear here
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="p-2 flex items-center justify-center gap-2"
        >
          <a
            href="https://github.com/reylam"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="flex items-center gap-2 group"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative"
            >
              <FiGithub className="text-gray-400 group-hover:text-cyan-400 text-xl transition-colors" />
              <div className="absolute inset-0 rounded-full bg-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity" />
            </motion.div>
            <span className="text-gray-400 group-hover:text-cyan-400 text-sm font-mono transition-colors">
              reylam
            </span>
          </a>
          <span className="text-gray-600">|</span>
          <motion.div
            whileHover={{ rotate: 15 }}
            className="flex items-center gap-1"
          >
            <FaRegLaughSquint className="text-gray-400 text-xl" />
            <span className="text-gray-500 text-sm">RLS</span>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
