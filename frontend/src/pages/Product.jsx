import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/relatedProducts";
import { toast } from "react-toastify";

const ImageZoom = ({ imgUrl }) => {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const lensRef = useRef(null);
  const resultRef = useRef(null);
  const [isZoomVisible, setIsZoomVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const img = imgRef.current;
    const lens = lensRef.current;
    const result = resultRef.current;
    if (!container || !img || !lens || !result) return;

    // Get the cursor's x and y positions relative to the image:
    const getCursorPos = (e) => {
      const rect = img.getBoundingClientRect();
      let x = e.pageX - rect.left - window.pageXOffset;
      let y = e.pageY - rect.top - window.pageYOffset;
      return { x, y };
    };

    // When the mouse moves, update lens position and background of zoom window
    const moveLens = (e) => {
      e.preventDefault();
      const pos = getCursorPos(e);
      let x = pos.x - lens.offsetWidth / 2;
      let y = pos.y - lens.offsetHeight / 2;

      // Constrain the lens inside the image
      if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
      if (x < 0) x = 0;
      if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
      if (y < 0) y = 0;

      lens.style.left = `${x}px`;
      lens.style.top = `${y}px`;

      // Calculate the ratio between result div and lens:
      const cx = result.offsetWidth / lens.offsetWidth;
      const cy = result.offsetHeight / lens.offsetHeight;

      result.style.backgroundImage = `url('${imgUrl}')`;
      result.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;
      // Smooth the zoom movement with a transition on background-position
      result.style.transition = "background-position 0.2s ease";
      result.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
    };

    // Attach event listeners to the container
    container.addEventListener("mousemove", moveLens);
    container.addEventListener("mouseenter", () => setIsZoomVisible(true));
    container.addEventListener("mouseleave", () => setIsZoomVisible(false));

    // Cleanup event listeners on unmount
    return () => {
      container.removeEventListener("mousemove", moveLens);
      container.removeEventListener("mouseenter", () => setIsZoomVisible(true));
      container.removeEventListener("mouseleave", () => setIsZoomVisible(false));
    };
  }, [imgUrl]);

  return (
    <div className="relative" ref={containerRef}>
      <div className="relative">
        {/* Lens that follows the cursor */}
        <div
          ref={lensRef}
          className="absolute border border-gray-300 w-20 h-20 bg-white/40 pointer-events-none"
          style={{ display: isZoomVisible ? "block" : "none" }}
        ></div>
        <img
          ref={imgRef}
          src={imgUrl}
          alt="Product"
          className="w-full cursor-crosshair"
        />
      </div>
      {/* Zoom window centered in the container */}
      <div
        ref={resultRef}
        className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-gray-300 w-[300px] h-[300px] bg-white shadow-lg z-50 bg-center bg-no-repeat"
        style={{ display: isZoomVisible ? "block" : "none" }}
      ></div>
    </div>
  );
};

const Product = () => {
  const { productId } = useParams();
  const { products, addToCart, token, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    if (products.length > 0) {
      const foundProduct = products.find((item) => item._id === productId);
      if (foundProduct) {
        setProductData(foundProduct);
        setImage(foundProduct.images?.[0] || "https://via.placeholder.com/400");
      }
    }
  }, [productId, products]);

  const handleAddToCart = () => {
    if (!token) {
      toast.error("Please login to add items to the cart");
      navigate("/login");
      return;
    }
    addToCart(productData._id);
  };

  if (!productData) {
    return <p>Loading product...</p>;
  }

  return (
    <div className="border-t-2 pt-10">
      <div className="flex flex-col sm:flex-row gap-12">
        <div className="flex-1 flex flex-col-reverse sm:flex-row gap-3">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full">
            {productData.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt=""
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                onClick={() => setImage(img)}
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <ImageZoom imgUrl={image} />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <div className="flex gap-4">
              {productData.sizes?.map((item, index) => (
                <button
                  key={index}
                  className={`border py-2 px-4 bg-gray-100 ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  onClick={() => setSize(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700"
          >
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
        </div>
      </div>
      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  );
};

export default Product;
