import React from "react";
import Title from "./Title";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css?family=Poppins:400,500,600,700&display=swap');
        
        .about-wrapper {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 20px;
          margin: 0 auto;
          max-width: 1200px;
          padding: 0 20px;
        }
        
        .about-box {
          width: 100%;
          max-width: 350px;
          position: relative;
          perspective: 1000px;
          margin-bottom: 30px;
        }
        
        .about-box .about-front-face {
          background: #fff;
          height: 220px;
          width: 100%;
          align-items: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow: 0px 5px 20px 0px rgba(128, 0, 0, 0.1);
          transition: all 0.5s ease;
          padding: 20px;
        }
        
        .about-box .about-front-face .about-icon {
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .about-box .about-front-face .about-icon img {
          max-width: 100%;
          max-height: 100%;
        }
        
        .about-box .about-front-face span {
          font-size: 20px;
          font-weight: 600;
          text-transform: uppercase;
          color: #800000;
          text-align: center;
        }
        
        .about-box .about-back-face {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          height: 220px;
          width: 100%;
          padding: 20px;
          color: #fff;
          opacity: 0;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          background: linear-gradient(135deg, #740c4a, #DAA520);
          box-shadow: 0px 5px 20px 0px rgba(128, 0, 0, 0.1);
          transform: translateY(110px) rotateX(-90deg);
          transition: all 0.9s ease;
          overflow-y: auto;
        }
        
        .about-box .about-back-face p {
          margin-top: 10px;
          text-align: center;
        }
        
        .about-box:hover .about-back-face {
          opacity: 1;
          transform: rotateX(0deg);
        }
        
        .about-box:hover .about-front-face {
          opacity: 0;
          transform: translateY(-110px) rotateX(90deg);
        }
        
        .header-image {
          max-width: 100%;
          height: auto;
          margin: 0 auto;
          display: block;
        }
        
        @media (max-width: 768px) {
          .about-wrapper {
            padding: 0 10px;
          }
          
          .about-box {
            margin-bottom: 20px;
          }
          
          .about-box .about-front-face span {
            font-size: 18px;
          }
          
          .about-box .about-back-face {
            padding: 15px;
          }
        }
        
        @media (max-width: 480px) {
          .about-box .about-front-face {
            height: 200px;
          }
          
          .about-box .about-back-face {
            height: 200px;
          }
          
          .about-box .about-front-face .about-icon {
            height: 60px;
          }
        }
      `}</style>

      <div className="text-center text-3xl mt-10 md:mt-20 px-4">
        <Title text1={"ABOUT"} text2={"US"}></Title>
        <div className="my-5 md:my-10">
          <img
            src={assets.header_image}
            alt="Header"
            className="header-image"
          />
        </div>
      </div>

      <div className="about-wrapper">
        {/* Box 1 */}
        <div className="about-box">
          <div className="about-front-face">
            <div className="about-icon">
              <img
                src="https://img.icons8.com/color/96/000000/crown.png"
                alt="Crown Icon"
              />
            </div>
            <span>A Legacy of Sarees</span>
          </div>
          <div className="about-back-face">
            <p>
              Our journey began with a deep-rooted love for Indian heritage.
              Every saree is a masterpiece, meticulously designed to reflect
              grace, culture, and sophistication.
            </p>
          </div>
        </div>

        {/* Box 2 */}
        <div className="about-box">
          <div className="about-front-face">
            <div className="about-icon">
              <img
                src="https://img.icons8.com/?size=100&id=1328&format=png&color=000000"
                alt="Thread Icon"
              />
            </div>
            <span>From Thread to Treasure</span>
          </div>
          <div className="about-back-face">
            <p>
              We work closely with skilled artisans across India, ensuring each
              weave tells a story of tradition, precision, and artistry. Kashvi
              Creation offers a saree for every occasion.
            </p>
          </div>
        </div>

        {/* Box 3 */}
        <div className="about-box">
          <div className="about-front-face">
            <div className="about-icon">
              <img
                src="https://img.icons8.com/color/96/000000/ok--v1.png"
                alt="Quality Icon"
              />
            </div>
            <span>Quality You Can Trust</span>
          </div>
          <div className="about-back-face">
            <p>
              With a commitment to quality and elegance, we bring you sarees
              that make every moment special. Explore our collection and embrace
              timeless fashion with Kashvi Creation.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;