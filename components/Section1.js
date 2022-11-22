import Image from "next/image";
import Link from "next/link";
import Author from "./_child/Author";
import SwiperCore,{Autoplay} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import fetcher from "../lib/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";

const Section1 = () => {
  const {data , isLoading , isError} = fetcher('api/trending')
  if(isLoading) return <Spinner />
  if(isError) return <Error />


    SwiperCore.use([Autoplay]);
    const bg = {
        background:"url('/images/banner.png') no-repeat",
        backgroundPosition:"right", 
    }
  return (
    <section className="py-16" style={bg}>
      <div className="container mx-auto md:px-20">
        <h1 className="font-bold text-4xl pb-12 text-center">Trending</h1>

        <Swiper
      slidesPerView={1}
        autoplay={{
            loop:true,
            delay:2000
        }}
    >
      {
    data.map((value,index)=>(
      <SwiperSlide key={index}><Slide data={value}></Slide></SwiperSlide>
    ))
      }
   

    </Swiper>

       
      </div>
    </section>
  );
};

function Slide({data}) {

  const {id,category,description ,title,img,published,author} = data;

  return (
    <div className="grid md:grid-cols-2">
      <div className="image">
        <Link href={`/posts/${id}`}>
          <a>
            <Image src={img || "/"} width={600} height={600} />
          </a>
        </Link>
      </div>
      <div className="info flex justify-center flex-col" >
        <div className="cat">
          <Link href={`/posts/${id}`}>
            <a className="text-orange-600 hover:text-orange-800">
              {category||"unknown"}
            </a>
          </Link>
          <Link href={`/posts/${id}`}>
            <a className="text-gray-600 hover:text-gray-800">
              - {published ||"unknown"}
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/posts/${id}`}>
            <a className="text-3xl md:text-6xl py-2 font-bold text-gray-800 hover:text-gray-600">
              {title || "unknown"}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-4">
        {description || "unknown"}   
        </p>
        {
          author ?  <Author {...author}></Author> : <></>
         
        }
      </div>
    </div>
  );
}

export default Section1;
