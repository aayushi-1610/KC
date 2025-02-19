import React, { useEffect } from "react";

const CarouselComponent = () => {
  useEffect(() => {
    const nextButton = document.querySelector(".carousel-next");
    const prevButton = document.querySelector(".carousel-prev");
    const slide = document.querySelector(".carousel-slide");

    const nextHandler = () => {
      let items = document.querySelectorAll(".carousel-item");
      if (slide && items.length) {
        slide.appendChild(items[0]);
      }
    };

    const prevHandler = () => {
      let items = document.querySelectorAll(".carousel-item");
      if (slide && items.length) {
        slide.prepend(items[items.length - 1]);
      }
    };

    if (nextButton) nextButton.addEventListener("click", nextHandler);
    if (prevButton) prevButton.addEventListener("click", prevHandler);

    return () => {
      if (nextButton) nextButton.removeEventListener("click", nextHandler);
      if (prevButton) prevButton.removeEventListener("click", prevHandler);
    };
  }, []);

  return (
    <>
      <div
        className="carousel-container"
        style={{
          marginLeft: "calc(-50vw + 50%)",
          marginRight: "calc(-50vw + 50%)",
          width: "100vw",
        }}
      >
        <div className="carousel-slide">
          <div
            className="carousel-item"
            style={{
              backgroundImage:
                "url(https://5.imimg.com/data5/SELLER/Default/2024/4/409039334/VW/WV/RC/38218068/5-1000x1000.jpeg)",
            }}
          >
            <div className="carousel-content">
              <div className="carousel-name">Banarasi Silk</div>
              <div className="carousel-des">
                Featuring a rich magenta hue adorned with intricate golden Zari
                embroidery. Perfect for weddings, festive occasions, and grand
                celebrations.
              </div>
              <button>See More</button>
            </div>
          </div>

          <div
            className="carousel-item"
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/736x/2d/11/af/2d11af5121fe4859fc2bc600cd6d7efc.jpg)",
            }}
          >
            <div className="carousel-content">
              <div className="carousel-name">Regal Silk</div>
              <div className="carousel-des">
                Traditional motifs with a luxurious broad border. Perfect for
                weddings and cultural events.
              </div>
              <button>See More</button>
            </div>
          </div>

          <div
            className="carousel-item"
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/736x/31/2c/08/312c08be7de1003a08d6e601cec3e3df.jpg)",
            }}
          >
            <div className="carousel-content">
              <div className="carousel-name">Gorgette Saree</div>
              <div className="carousel-des">
                Golden thread embroidery with delicate floral and paisley
                patterns for a refined look.
              </div>
              <button>See More</button>
            </div>
          </div>

          <div
            className="carousel-item"
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/736x/a7/70/95/a7709545ab507b387f2cfd6d210b5ced.jpg)",
            }}
          >
            <div className="carousel-content">
              <div className="carousel-name">Royal Chiffon Saree</div>
              <div className="carousel-des">
                Lightweight chiffon with a richly embellished border. Perfect
                for grand celebrations.
              </div>
              <button>See More</button>
            </div>
          </div>

          <div
            className="carousel-item"
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/736x/08/62/13/086213cd4e3cf35d963b1fedd0282ca6.jpg)",
            }}
          >
            <div className="carousel-content">
              <div className="carousel-name">Chic Teal Organza Saree</div>
              <div className="carousel-des">
                Embrace elegance with this chic teal blue georgette saree,
                designed to make you stand out at any occasion. The beautifully
                crafted golden border enhances its charm, adding a touch of
                glamour to this traditional ensemble.
              </div>
              <button>See More</button>
            </div>
          </div>

          <div
            className="carousel-item"
            style={{
              backgroundImage:
                "url(https://i.pinimg.com/736x/d3/d1/1f/d3d11f1387f271e2301fba3dfee02857.jpg)",
            }}
          >
            <div className="carousel-content">
              <div className="carousel-name">Cotton Sarees</div>
              <div className="carousel-des">
                Elevate your elegance with this breathtaking saree, meticulously
                crafted to showcase traditional grandeur with a modern twist.
                Adorned with exquisite golden zari embroidery, symbolizing
                timeless beauty and sophistication. The richly embellished
                border with detailed patterns makes it a great choice for
                weddings and festive celebrations.
              </div>
              <button>See More</button>
            </div>
          </div>
        </div>

        <div className="carousel-button">
          <button className="carousel-prev">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button className="carousel-next">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <style>{`
        .carousel-container {
          width: 100%;
          height: 90vh;
          margin-top: 0.9rem;
          margin-bottom: 3rem;
          background: transparent;
          box-shadow: 0 30px 50px #dbdbdb;
          position: relative;
          overflow: hidden;
        }
        
        .carousel-slide {
          position: relative;
          height: 100%;
          overflow: hidden;
          display: flex;
          align-items: center;
        }
        
        .carousel-item {
          width: 18%;
          height: 65%;
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
          border-radius: 20px;
          box-shadow: 0 30px 50px #505050;
          background-position: center;
          background-size: cover;
          transition: 0.7s;
        }
        
        .carousel-item:nth-child(1),
        .carousel-item:nth-child(2) {
          top: 0;
          left: 0;
          transform: translate(0, 0);
          border-radius: 0;
          width: 100%;
          height: 100%;
        }
        
        .carousel-item:nth-child(2)::before {
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background: linear-gradient(to right, rgba(0, 0, 0, 0.7), transparent);
          border-radius: inherit;
        }
        
        .carousel-item:nth-child(3) {
          left: 50%;
        }
        
        .carousel-item:nth-child(4) {
          left: calc(50% + 220px);
        }
        
        .carousel-item:nth-child(n+5) {
          left: calc(50% + 440px);
        }
        
        .carousel-content {
          position: absolute;
          top: 50%;
          left: 5%;
          width: 90%;
          max-width: 300px;
          text-align: left;
          color: #eee;
          transform: translate(0, -50%);
          font-family: system-ui;
          display: none;
          padding: 0 15px;
        }
        
        .carousel-item:nth-child(2) .carousel-content {
          display: block;
        }
        
        .carousel-name {
          font-size: clamp(24px, 5vw, 40px);
          text-transform: uppercase;
          font-weight: bold;
          opacity: 0;
          animation: animate 1s ease-in-out 1 forwards;
        }
        
        .carousel-des {
          margin-top: 10px;
          margin-bottom: 20px;
          font-size: clamp(14px, 2vw, 16px);
          opacity: 0;
          animation: animate 1s ease-in-out 0.3s 1 forwards;
        }
        
        .carousel-content button {
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
        
        .carousel-button {
          width: 100%;
          text-align: center;
          position: absolute;
          bottom: 20px;
        }
        
        .carousel-button button {
          background: rgba(171, 171, 171, 0.45);
          width: 40px;
          height: 35px;
          border-radius: 8px;
          border: 1px solid white;
          cursor: pointer;
          margin: 0 5px;
          transition: 0.3s;
        }
        
        .carousel-button button:hover {
          background: #ababab;
          color: #fff;
        }
        
        /* Responsive Adjustments */
        @media (max-width: 1200px) {
          .carousel-item:nth-child(3) {
            left: 52%;
          }
          
          .carousel-item:nth-child(4) {
            left: calc(52% + 180px);
          }
          
          .carousel-item:nth-child(n+5) {
            left: calc(52% + 360px);
          }
        }
        
        @media (max-width: 768px) {
          .carousel-container {
            height: 80vh;
          }
          
          .carousel-content {
            left: 20px;
            width: calc(100% - 40px);
          }
          
          .carousel-item:nth-child(3),
          .carousel-item:nth-child(4),
          .carousel-item:nth-child(n+5) {
            display: none;
          }
          
          .carousel-item:nth-child(2)::before {
            background: linear-gradient(to right, rgba(0, 0, 0, 0.8) 30%, rgba(0, 0, 0, 0.4));
          }
        }
        
        @media (max-width: 480px) {
          .carousel-container {
            height: 70vh;
          }
          
          .carousel-content {
            left: 15px;
            width: calc(100% - 30px);
          }
          
          .carousel-button {
            bottom: 10px;
          }
          
          .carousel-button button {
            width: 35px;
            height: 30px;
          }
        }
      `}</style>
    </>
  );
};

export default CarouselComponent;