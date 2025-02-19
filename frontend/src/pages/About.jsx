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
          justify-content: center;
          gap: 20px;
          margin: 0 90px;
        }
        @media (max-width: 1200px) {
          .about-wrapper {
            flex-direction: column;
            align-items: center;
          }
        }
        .about-box {
          width: 350px;
          position: relative;
          perspective: 1000px;
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
        }
        .about-box .about-front-face .about-icon {
          height: 80px;
        }
        .about-box .about-front-face .about-icon img {
          font-size: 65px;
          color: #800000; /* Maroon */
        }
        .about-box .about-front-face span {
          font-size: 22px;
          font-weight: 600;
          text-transform: uppercase;
          color: #800000; /* Maroon */
        }
        .about-box .about-back-face {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 1;
          height: 220px;
          width: 100%;
          padding: 30px;
          color: #fff;
          opacity: 0;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          background: linear-gradient(135deg, #740c4a, #DAA520);
          box-shadow: 0px 5px 20px 0px rgba(128, 0, 0, 0.1);
          transform: translateY(110px) rotateX(-90deg);
          transition: all 0.9s ease;
        }
        .about-box .about-back-face p {
          margin-top: 10px;
          text-align: justify;
        }
        .about-box:hover .about-back-face {
          opacity: 1;
          transform: rotateX(0deg);
        }
        .about-box:hover .about-front-face {
          opacity: 0;
          transform: translateY(-110px) rotateX(90deg);
        }
      `}</style>

      <div className="text-center text-3xl mt-20">
        <Title text1={"ABOUT"} text2={"US"}></Title>
        <div className="my-10">
          <img src={assets.header_image} alt="" />
        </div>
      </div>
      <div className="about-wrapper">
        {/* Box 1 */}
        <div className="about-box">
          <div className="about-front-face">
            <div className="about-icon">
              <img
                src="https://img.icons8.com/color/96/000000/crown.png"
                width="80rem"
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
                width="60rem"
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
            <div className="about-icon mb-5">
              <img
                src="https://img.icons8.com/color/96/000000/ok--v1.png"
                alt="Quality Icon"
                height="30rem"
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
