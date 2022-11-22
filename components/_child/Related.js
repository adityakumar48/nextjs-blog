import Image from "next/image";
import Link from "next/link";
import fetcher from "../../lib/fetcher";
import Author from "./Author";
import Error from "./Error";
import Spinner from "./Spinner";

const Related = () => {
  
  const {data , isLoading , isError} = fetcher('api/posts')
  if(isLoading) return <Spinner />
  if(isError) return <Error />
  return (
    <section className="pt-20">
      <h1 className="font-bold text-3xl py-10 ">Related</h1>
      <div className="flex flex-col gap-10">
        {data.map((value,index)=>(
          <Post key={index} data={value}></Post>
        ))}
       
      </div>
    </section>
  );
};

function Post({data}){
  const {title , category, published, img, id, author} = data;
    return(
        <div className="flex gap-5">
            <div className="image flex flex-col justify-start">
            <Link href={`/posts/${id}`}>
          <a>
            <Image src={img || "/"} className="rounded" width={250} height={200} />
          </a>
        </Link>
            </div>

            <div className="info flex justify-center flex-col">
            <div className="cat">
          <Link href={`/posts/${id}`}>
            <a className="text-orange-600 hover:text-orange-800">
              {category || "unknown"}
            </a>
          </Link>
          <Link href={`/posts/${id}`}>
            <a className="text-gray-600 hover:text-gray-800">
              - {published || "unknown"}
            </a>
          </Link>
        </div>
        <div className="title">
          <Link href={`/posts/${id}`}>
            <a className="text-xl py-3 font-bold text-gray-800 hover:text-gray-600">
            {title  || "unknown"}
            </a>
          </Link>
        </div>
      
        {
          author ?  <Author {...author}></Author> : <></>
         
        }
            </div>
        </div>
    )
}

export default Related;
