// import API from "../aixos"

export const getPosts = async () => {
   const resp = await fetch('http://localhost:3000/posts');
   const posts = await resp.json();
   return posts;
}

export const getPostDetail = async (id: any) => {
   const resp = await fetch(`http://localhost:3000/posts/${id}`);
   const posts = await resp.json();
   return posts;
}