import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

const SlideBanner = () => {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation, Autoplay]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      className="mySwiper"
    >
      <SwiperSlide>
        <Link href="/products">
          <a className="w-full select-none">
            <img
              className="object-contain object-fill bg-gray-300 w-[100vw] h-[50vh]"
              src="https://images.freekaamaal.com/store_desc_images/1516103172.jpg"
              alt=""
            />
          </a>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href="/products">
          <a className="w-full select-none">
            <img
              className="object-contain object-fill bg-gray-300 w-[100vw] h-[50vh]"
              src="https://images.freekaamaal.com/store_desc_images/1516103172.jpg"
              alt=""
            />
          </a>
        </Link>
      </SwiperSlide>
      <SwiperSlide>
        <Link href="/products">
          <a className="w-full select-none">
            <img
              className="object-contain object-fill bg-gray-300 w-[100vw] h-[50vh]"
              src="https://images.freekaamaal.com/store_desc_images/1516103172.jpg"
              alt=""
            />
          </a>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};

export default SlideBanner;
