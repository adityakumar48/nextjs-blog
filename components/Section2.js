import Link from "next/link";
import Image from "next/image";
import Author from "./_child/Author";
import getPost from "../lib/helper";
import fetcher from "../lib/fetcher";
import Spinner from "./_child/Spinner";
import Error from "./_child/Error";

const Section2 = () => {

  const {data , isLoading , isError} = fetcher('api/posts')
  if(isLoading) return <Spinner />
  if(isError) return <Error />

  return (
    <section className="container mx-auto md:px-20">
      <h1 className="font-bold text-4xl py-12 text-center">Latest Posts</h1>
      {/* Grid Columns */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-14 ">
        {data.map((value,index)=>(
          <Post data={value} key={index}></Post>
        ))}
        
        </div>
    </section>
  );
};

function Post({data}) {
  const {id,category,title,img,published,author} = data;
  return (
    <div className="item">
      <div className="images">
        <Link href={"/"}>
          <a>
            <Image
              src={img || "/"}
              className="rounded"
              width={500}
              height={350}
            />
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
            <a className="text-xl py-3 font-bold text-gray-800 hover:text-gray-600">
              {title ||"Title"}
            </a>
          </Link>
        </div>
        <p className="text-gray-500 py-3">
          {" "}
          Even the all-powerful Pointing has no control about the blind texts it
          is an almost unorthographic life One day however a small line of blind
          text by the name of Lorem Ipsum decided to leave for the far World of
          Grammar.
        </p>
        {
          author ?  <Author></Author> : <></>
         
        }
      </div>
    </div>
  );
}

export default Section2;
