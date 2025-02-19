import React from "react";
import Title from "../components/Title";

const Contact = () => {
  return (
    <div className="px-4 md:px-10 lg:px-20">
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"Contact"} text2={"Us"} />
      </div>

      <div className="my-10 flex flex-col items-center md:flex-row md:items-start gap-10 mb-28">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3720.2629246257675!2d72.8460322!3d21.1817118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be04f30c2a28475%3A0xad5f81ba586f9f2c!2sKashvi%20Creation%20SHOP%20NO%20113%2C%20MILLENNIUM%20TEXTILE%20MARKET%20-%202%2C%201ST%20FLOOR%2C%20Surat-395002%2C%20Gujarat%2C%20India!5e0!3m2!1sen!2sin!4v1739618659937!5m2!1sen!2sin"
          className="w-full sm:w-[450px] md:w-[550px] lg:w-[600px] h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px]"
          style={{ border: "0" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="flex flex-col justify-center items-start gap-4 md:gap-6">
          <p className="font-semibold text-lg sm:text-xl text-gray-600">
            Our Store
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            <b>Sales Office:</b> Shop No. 113,
            <br /> Millennium textile Market-2 <br /> Ring Road, Surat (395002)
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            <b>Head Office:</b> Shop No. 6115 to 6124,
            <br /> Millennium textile Market-4 <br /> Bhathena, Surat (395002)
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            <b>Vimal Jain: </b>
            <a href="tel:9376421333" className="text-blue-500 hover:underline">
              9376421333
            </a>
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            <b>Manoj Kejriwal: </b>
            <a href="tel:7290909696" className="text-blue-500 hover:underline">
              7290909696
            </a>
          </p>
          <p className="text-gray-500 text-sm sm:text-base">
            <b>Email: </b>
            <a
              href="mailto:kashvicreation10@gmail.com"
              className="text-blue-500 hover:underline"
            >
              kashvicreation10@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;