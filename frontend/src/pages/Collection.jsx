import React, { useContext, useState, useMemo } from "react";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  // Memoized Filtered and Sorted Products
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    if (showSearch && search) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      filtered = filtered.filter((item) => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter((item) => subCategory.includes(item.subCategory));
    }

    if (sortType === "low-high") {
      return filtered.sort((a, b) => a.price - b.price);
    } else if (sortType === "high-low") {
      return filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [category, subCategory, search, showSearch, products, sortType]);

  const handleCameraClick = () => {
    window.location.href = "https://lens.google/";
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 pt-10 border-t">
        {/* Filter Options */}
        <div className="min-w-[200px]">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            FILTERS
            <img
              className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
              src={assets.dropdown_icon}
              alt="Dropdown"
            />
          </p>

          {/* Category Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">COLOURS</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {["Red", "Yellow", "Violet", "Orange", "Pink", "Blue", "Green"].map(
                (color) => (
                  <p key={color} className="flex gap-2">
                    <input
                      className="w-3"
                      type="checkbox"
                      value={color}
                      onChange={toggleCategory}
                    />
                    {color}
                  </p>
                )
              )}
            </div>
          </div>

          {/* SubCategory Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 my-5 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">TYPE</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              {["Banarasi", "Regal", "Gorgette", "Chiffon", "Organza"].map(
                (type) => (
                  <p key={type} className="flex gap-2">
                    <input
                      className="w-3"
                      type="checkbox"
                      value={type}
                      onChange={toggleSubCategory}
                    />
                    {type}
                  </p>
                )
              )}
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1">
          <div className="flex flex-col">
            

            {/* Camera Icon with URL Redirect */}
            <div className="flex justify-end mb-4">
              <div className="cursor-pointer hover:opacity-80 transition-opacity">
                <img
                  src={assets.camera_icon}
                  alt="Camera"
                  className="w-8 h-8"
                  onClick={handleCameraClick}
                />
              </div>
            </div>
          </div>

          {/* Map Products */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((item, index) => (
              <div key={index} className="transform hover:scale-105 transition-transform">
                <ProductItem
                  name={item.name}
                  id={item._id}
                  price={item.price}
                  image={item.images}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Collection;
