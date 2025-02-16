import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const sarees = [
  {
    name: "Banarasi Silk",
    description: "Featuring a rich magenta hue adorned with intricate golden Zari embroidery. The luxurious craftsmanship showcases traditional motifs.",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/4/409039334/VW/WV/RC/38218068/5-1000x1000.jpeg",
  },
  {
    name: "Regal Silk",
    description: "Designed for grand celebrations, this saree showcases traditional motifs, a luxurious broad border, and an opulent pallu that exudes royalty.",
    image: "https://i.pinimg.com/736x/2d/11/af/2d11af5121fe4859fc2bc600cd6d7efc.jpg",
  },
  {
    name: "Gorgette Saree",
    description: "Golden thread embroidery with delicate floral and paisley patterns, giving it a refined and sophisticated look.",
    image: "https://i.pinimg.com/736x/31/2c/08/312c08be7de1003a08d6e601cec3e3df.jpg",
  },
  {
    name: "Royal Chiffon Saree",
    description: "Crafted from lightweight chiffon, this saree drapes beautifully, giving you a graceful and flowy silhouette.",
    image: "https://i.ibb.co/Bq4Q0M8/img4.jpg",
  },
  {
    name: "Chic Teal Organza Saree",
    description: "Embrace elegance with this chic teal blue georgette saree, designed to make you stand out at any occasion.",
    image: "https://i.ibb.co/jTQfmTq/img5.jpg",
  },
];

const SareeCarousel = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % sarees.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + sarees.length) % sarees.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex flex-col items-center w-full h-screen bg-gray-100 overflow-hidden">
      <div className="relative w-full max-w-3xl h-96 flex justify-center items-center overflow-hidden">
        <AnimatePresence>
          {sarees.map((saree, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: i === index ? 1 : 0.5, scale: i === index ? 1 : 0.8 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className={`absolute rounded-lg shadow-lg bg-white overflow-hidden transition-all ease-in-out duration-500 ${
                i === index ? "z-10" : "opacity-50"
              }`}
              style={{ width: "320px", height: "420px" }}
            >
              <img src={saree.image} alt={saree.name} className="w-full h-3/4 object-cover rounded-t-lg" />
              <div className="p-4 text-center">
                <h2 className="text-lg font-bold">{saree.name}</h2>
                <p className="text-sm text-gray-600">{saree.description}</p>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">See More</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div className="absolute bottom-10 flex gap-4">
        <button className="p-3 bg-gray-800 text-white rounded-full" onClick={prevSlide}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button className="p-3 bg-gray-800 text-white rounded-full" onClick={nextSlide}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default SareeCarousel;
