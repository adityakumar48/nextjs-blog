// endPoint - http://localhost:3000/api/posts  

const BaseUrl = "http://localhost:3000/api/posts";

export default async function getPost(id){
    const res = await fetch(`${BaseUrl}`);
    const posts = await res.json();

if(id){
 return posts.find(value=>value.id == id)
}
    return posts;
}