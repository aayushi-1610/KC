import React, { useEffect } from "react";
// Ensure Font Awesome is loaded via your index.html or installed via npm
// For example: import "@fortawesome/fontawesome-free/css/all.min.css";

const CarouselComponent = () => {
  useEffect(() => {
    // Attach event listeners after the component mounts.
    const nextButton = document.querySelector(".next");
    const prevButton = document.querySelector(".prev");
    const slide = document.querySelector(".slide");

    const nextHandler = () => {
      let items = document.querySelectorAll(".item");
      if (slide && items.length) {
        slide.appendChild(items[0]);
      }
    };

    const prevHandler = () => {
      let items = document.querySelectorAll(".item");
      if (slide && items.length) {
        slide.prepend(items[items.length - 1]);
      }
    };

    if (nextButton) nextButton.addEventListener("click", nextHandler);
    if (prevButton) prevButton.addEventListener("click", prevHandler);

    // Cleanup event listeners on unmount
    return () => {
      if (nextButton) nextButton.removeEventListener("click", nextHandler);
      if (prevButton) prevButton.removeEventListener("click", prevHandler);
    };
  }, []);

  return (
    <>
      <div className="container">
        <div className="slide">
          <div
            className="item"
            style={{
              backgroundImage:
                'url(https://5.imimg.com/data5/SELLER/Default/2024/4/409039334/VW/WV/RC/38218068/5-1000x1000.jpeg)',
            }}
          >
            <div className="content">
              <div className="name">Banarasi Silk</div>
              <div className="des">
                featuring a rich magenta hue adorned with intricate golden Zari
                embroidery. The luxurious craftsmanship showcases traditional
                motifs and a grand border design, making it a perfect choice for
                weddings, festive occasions, and grand celebrations
              </div>
              <button>See More</button>
            </div>
          </div>

          <div
            className="item"
            style={{
              backgroundImage:
                'url(https://i.pinimg.com/736x/2d/11/af/2d11af5121fe4859fc2bc600cd6d7efc.jpg)',
            }}
          >
            <div className="content">
              <div className="name">Regal Silk</div>
              <div className="des">
                Designed for grand celebrations, this saree showcases traditional
                motifs, a luxurious broad border, and an opulent pallu that exudes
                royalty. A perfect choice for weddings, festive occasions, and
                cultural events.
              </div>
              <button>See More</button>
            </div>
          </div>

          <div
            className="item"
            style={{
              backgroundImage:
                'url(https://i.pinimg.com/736x/31/2c/08/312c08be7de1003a08d6e601cec3e3df.jpg)',
            }}
          >
            <div className="content">
              <div className="name">Gorgette Saree</div>
              <div className="des">
                Designed for the modern woman who appreciates tradition with a
                contemporary twist, golden thread embroidery with delicate floral
                and paisley patterns, giving it a refined and sophisticated look.
                The lightweight georgette fabric ensures effortless draping and a
                graceful fall.
              </div>
              <button>See More</button>
            </div>
          </div>

          <div
            className="item"
            style={{
              backgroundImage:
                'url(https://i.pinimg.com/736x/a7/70/95/a7709545ab507b387f2cfd6d210b5ced.jpg)',
            }}
          >
            <div className="content">
              <div className="name">Royal Chiffon Saree</div>
              <div className="des">
                Elevate your elegance with this royal chiffon saree, perfect for grand
                celebrations and special occasions. Crafted from lightweight chiffon,
                this saree drapes beautifully, giving you a graceful and flowy silhouette.
                The richly embellished border adds a touch of luxury, making this saree a
                statement of timeless sophistication.
              </div>
              <button>See More</button>
            </div>
          </div>

          <div
            className="item"
            style={{
              backgroundImage:
                'url(https://i.pinimg.com/736x/08/62/13/086213cd4e3cf35d963b1fedd0282ca6.jpg)',
            }}
          >
            <div className="content">
              <div className="name">Chic Teal Organza Saree</div>
              <div className="des">
                Embrace elegance with this chic teal blue georgette saree, designed to
                make you stand out at any occasion. The beautifully crafted golden border
                enhances its charm, adding a touch of glamour to this traditional ensemble.
              </div>
              <button>See More</button>
            </div>
          </div>

          <div
            className="item"
            style={{
              backgroundImage:
                'url(https://i.pinimg.com/736x/d3/d1/1f/d3d11f1387f271e2301fba3dfee02857.jpg)',
            }}
          >
            <div className="content">
              <div className="name">Cotton Sarees</div>
              <div className="des">
                Elevate your elegance with this breathtaking, meticulously crafted to
                showcase traditional grandeur with a modern twist. Adorned with exquisite
                golden zari embroidery, symbolizing timeless beauty and sophistication. The
                richly embellished border with detailed patterns makes it a great choice for
                weddings and festive celebrations.
              </div>
              <button>See More</button>
            </div>
          </div>
        </div>

        <div className="button">
          <button className="prev">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button className="next">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* CSS Styles */}
      <style>{`
       :root {
          /* Define base sizes for easy maintenance */
          --spacing-xs: 0.25rem;   /* 4px */
          --spacing-sm: 0.5rem;    /* 8px */
          --spacing-md: 1rem;      /* 16px */
          --spacing-lg: 1.5rem;    /* 24px */
          --spacing-xl: 2rem;      /* 32px */
        }
        * {
          margin: 0 auto;
          padding: 0;
       
        }
        
        .container {
  width: 100%;
  max-width: 95rem; /* optional max-width */
  height: 90vh;      /* or auto if you want content-based height */
 margin-top: 0.9rem;
          
          margin-bottom: 3rem;
  background: transparent;
  box-shadow: 0 30px 50px #dbdbdb;
  position: relative; /* if you need relative positioning for child elements */
}
        .container .slide .item {
          width: 21%;
          height: 55%;
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
          border-radius: 20px;
          box-shadow: 0 30px 50px #505050;
          background-position: 50% 50%;
          background-size: cover;
          display: inline-block;
          transition: 0.5s;
        }
        .slide .item:nth-child(1),
        .slide .item:nth-child(2) {
          top: 0;
          left: 0;
          transform: translate(0, 0);
          border-radius: 0;
          width: 100%;
          height: 100%;
        }
        .slide .item:nth-child(2)::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent);
          border-radius: inherit;
        }
        .slide .item:nth-child(3) {
          left: 50%;
        }
        .slide .item:nth-child(4) {
          left: calc(50% + 220px);
        }
        .slide .item:nth-child(5) {
          left: calc(50% + 440px);
        }
        .slide .item:nth-child(n+6) {
          left: calc(50% + 660px);
          opacity: 0;
        }
        .item .content {
          position: absolute;
          top: 50%;
          left: 100px;
          width: 300px;
          text-align: left;
          color: #eee;
          transform: translate(0, -50%);
          font-family: system-ui;
          display: none;
        }
        .slide .item:nth-child(2) .content {
          display: block;
        }
        .content .name {
          font-size: 40px;
          text-transform: uppercase;
          font-weight: bold;
          opacity: 0;
          animation: animate 1s ease-in-out 1 forwards;
        }
        .content .des {
          margin-top: 10px;
          margin-bottom: 20px;
          opacity: 0;
          animation: animate 1s ease-in-out 0.3s 1 forwards;
        }
        .content button {
          padding: 10px 20px;
          border: none;
          cursor: pointer;
          opacity: 0;
          animation: animate 1s ease-in-out 0.6s 1 forwards;
        }
        @keyframes animate {
          from {
            opacity: 0;
            transform: translate(0, 100px);
            filter: blur(33px);
          }
          to {
            opacity: 1;
            transform: translate(0);
            filter: blur(0);
          }
        }
        .button {
          width: 100%;
          text-align: center;
          position: absolute;
          bottom: 20px;
        }
        .button button {
          width: 40px;
          height: 35px;
          border-radius: 8px;
          border: 1px solid #000;
          cursor: pointer;
          margin: 0 5px;
          transition: 0.3s;
        }
        .button button:hover {
          background: #ababab;
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default CarouselComponent;