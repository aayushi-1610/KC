import React, { useState } from "react";
import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";

const sarees = [
  {
    name: "Banarasi Silk",
    description:
      "Featuring a rich magenta hue adorned with intricate golden Zari embroidery. The luxurious craftsmanship showcases traditional motifs and a grand border design, making it a perfect choice for weddings, festive occasions, and grand celebrations.",
    image: "https://5.imimg.com/data5/SELLER/Default/2024/4/409039334/VW/WV/RC/38218068/5-1000x1000.jpeg"
  },
  {
    name: "Regal Silk",
    description:
      "Designed for grand celebrations, this saree showcases traditional motifs, a luxurious broad border, and an opulent pallu that exudes royalty. A perfect choice for weddings, festive occasions, and cultural events.",
    image: "https://i.pinimg.com/736x/2d/11/af/2d11af5121fe4859fc2bc600cd6d7efc.jpg"
  },
  {
    name: "Gorgette Saree",
    description:
      "Designed for the modern woman who appreciates tradition with a contemporary twist, golden thread embroidery with delicate floral and paisley patterns, giving it a refined and sophisticated look. The lightweight georgette fabric ensures effortless draping and a graceful fall.",
    image: "https://i.pinimg.com/736x/31/2c/08/312c08be7de1003a08d6e601cec3e3df.jpg"
  },
  {
    name: "Royal Chiffon Saree",
    description:
      "Elevate your elegance with this royal chiffon saree, perfect for grand celebrations and special occasions. Crafted from lightweight chiffon, this saree drapes beautifully, giving you a graceful and flowy silhouette. The richly embellished border adds a touch of luxury, making this saree a statement of timeless sophistication.",
    image: "https://i.ibb.co/Bq4Q0M8/img4.jpg"
  },
  {
    name: "Chic Teal Organza Saree",
    description:
      "Embrace elegance with this chic teal blue georgette saree, designed to make you stand out at any occasion. The beautifully crafted golden border enhances its charm, adding a touch of glamour to this traditional ensemble.",
    image: "https://i.ibb.co/jTQfmTq/img5.jpg"
  }
];

const SareeCarousel = () => {
  const [items, setItems] = useState(sarees);

  const nextSlide = () => {
    setItems([...items.slice(1), items[0]]);
  };

  const prevSlide = () => {
    setItems([items[items.length - 1], ...items.slice(0, items.length - 1)]);
  };

  return (
    <div className="relative flex flex-col items-center w-full h-screen bg-gray-200 overflow-hidden">
      <div className="relative w-full max-w-4xl h-96 overflow-hidden flex justify-center items-center">
        {items.map((saree, index) => (
          <div
            key={index}
            className={`absolute transition-transform duration-500 ease-in-out rounded-lg shadow-lg bg-cover bg-center w-72 h-96 ${
              index === 0 ? "z-10 w-full h-full" : "opacity-50 left-1/2 transform -translate-x-1/2"
            }`}
            style={{ backgroundImage: url(${saree.image}) }}
          >
            {index === 0 && (
              <div className="absolute bottom-4 left-6 text-white bg-black bg-opacity-50 p-4 rounded-lg">
                <h2 className="text-lg font-bold">{saree.name}</h2>
                <p className="text-sm">{saree.description}</p>
                <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg">See More</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="absolute bottom-10 flex gap-4">
        <button className="p-2 bg-gray-800 text-white rounded-full" onClick={prevSlide}>
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button className="p-2 bg-gray-800 text-white rounded-full" onClick={nextSlide}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};

export default SareeCarousel;