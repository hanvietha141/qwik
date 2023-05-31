import { $, Resource, component$, useResource$ } from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { getPostDetail } from "~/sevices/post";

// export const useProductDetails = routeLoader$(
//   $(async (requestEvent: any) => {
//     console.log("requestEvent", requestEvent.params.id);
//     const resp = await fetch(`http://localhost:3000/posts/${id}`);
//     const post = await resp.json();
//     // const data = await getPostDetail(requestEvent.params.id);
//     // This code runs only on the server, after every navigation
//     // const res = await fetch(`https://.../products/${requestEvent.params.productId}`);
//     // const product = await res.json();
//     return post;
//   })
// );

export const useProductDetails = routeLoader$(async (requestEvent) => {
  // This code runs only on the server, after every navigation
  const res = await getPostDetail(requestEvent.params.id);
  // const product = await res.json();
  return res;
});

export default component$(() => {
  // const post = useResource$<any>(({ cleanup }) => {
  //   const controller = new AbortController();
  //   cleanup(() => controller.abort());
  //   return useProductDetails;
  // });
  const post = useProductDetails();
  return (
    <>
    {/* {post.value.title} */}
      <Resource
        value={post}
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(post) =>{
          console.log('post', post)
          return  (
            <>
              <h3>This is post {post.id}</h3>
              <p>{post.title}</p>
            </>
          )
        }}
      />
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
