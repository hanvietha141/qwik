import {
  $,
  Resource,
  component$,
  useSignal,
  useTask$
} from "@builder.io/qwik";
import { DocumentHead, routeLoader$, useLocation } from "@builder.io/qwik-city";
import { Image } from "@unpic/qwik";
import { MUIButton } from "~/integrations/react/mui";
import { fandeloApiGetDetail } from "~/sevices/post";


// export const useProductDetails = routeLoader$(
//   $(async (requestEvent: any) => {
//     console.log("requestEvent", requestEvent.params.id);
//     const resp = await fandeloApi();
//     return resp;
//   })
// );

export const useProductDetails = routeLoader$(async (requestEvent) => {
  // This code runs only on the server, after every navigation
  const res = await fandeloApiGetDetail(requestEvent.params.id);
  return res;
});

export default component$(() => {
  const location = useLocation();
  // const post = useResource$<any>(({ cleanup }) => {
  //   const controller = new AbortController();
  //   cleanup(() => controller.abort());
  //   return useProductDetails;
  // });
  const post = useProductDetails();
  const isShowThumbnail = useSignal(false);
  const showThumbnailHandler = $((val: boolean) => {
    isShowThumbnail.value = val;
  })

  useTask$(({track}) => {
    track(() => location.params.id)
    showThumbnailHandler(false)
  })

  return (
    <>
      <Resource
        value={post}
        onPending={() => {
          return <>Loading...</>
        }}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(post) => {
          console.log("post", post);
          return (
            <>
              <h3 >This is post {post.responseData.id}</h3>
              <p>{post.responseData.title}</p>
              <MUIButton variant="outlined" onClick$={() => showThumbnailHandler(true)} >Show thumbnail</MUIButton>
              {isShowThumbnail.value === true && (
                <Image
                  src={post.responseData.externalImageUrl}
                  layout="constrained"
                  width={800}
                  height={600}
                  alt="Image"
                />
              )}
            </>
          );
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
