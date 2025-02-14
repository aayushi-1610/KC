import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
const Contact = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 border-t">
        <Title text1={"Contact"} text2={"Us"} />
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28">
        <img
          className="w-full md:max-w-[480px]"
          src={assets.contact_img}
          alt=""
        />
        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            <b>Sales Office:</b>Shop No. 113,
            <br />
            Millennium textile Market-2 <br />
            Ring Road, Surat (395002)
          </p>
          <p className="text-gray-500">
            <b>Head Office:</b>Shop No. 6115 to 6124,
            <br />
            Millennium textile Market-4 <br />
            Bhathena, Surat (395002)
          </p>
          <p className="text-gray-500">
            <b>Vimal Jain: </b>9376421333
          </p>
          <p className="text-gray-500">
            <b>Manoj Kejriwal</b>7290909696
          </p>
          <p className="text-gray-500">
            <b>Email: </b>kashvicreation10@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;