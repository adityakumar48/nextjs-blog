import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import Image from "next/image";
import Author from "./_child/Author";
import fetcher from "../lib/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";

const Section3 = () => {
  const {data , isLoading , isError} = fetcher('api/popular')
  if(isLoading) return <Spinner />
  if(isError) return <Error />
  return (
    <section className="container mx-auto md:px-20 py-16">
      <h1 className="font-bold text-4xl py-12 text-center">Most Popular</h1>

      {/* Swiper */}

      <Swiper slidesPerView={2}>

      {
    data.map((value,index)=>(
      <SwiperSlide key={index}><Post data={value}></Post></SwiperSlide>
    ))
      }
 
      </Swiper>
    </section>
  );
};

function Post({data}) {
  const {id,category,description ,title,img,published,author} = data;

  return (
    <div className="grid">
      <div className="images">
        <Link href={"/"}>
          <a>
            <Image src={img || "/"} width={600} height={400} />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col py-4">
        <div className="cat">
          <Link href={"/"}>
            <a className="text-orange-600 hover:text-orange-800">
              {category||"unknown"}
            </a>
          </Link>
          <Link href={"/"}>
            <a className="text-gray-600 hover:text-gray-800">
              - {published ||"unknown"}
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={"/"}>
            <a className="text-3xl md:text-4xl py-3 font-bold text-gray-800 hover:text-gray-600">
              {title || "unknown"}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">
       {description || "Unknown"}
        </p>
        {
          author ?  <Author></Author> : <></>
         
        }
      </div>
    </div>
  );
}

export default Section3;
