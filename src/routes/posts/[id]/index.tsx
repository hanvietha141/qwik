import {
  $,
  Resource,
  component$,
  useResource$,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { fandeloApi, fandeloApiGetDetail, getPostDetail } from "~/sevices/post";
import { Image } from "@unpic/qwik";
import { MUIButton } from "~/integrations/react/mui";

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
  // const post = useResource$<any>(({ cleanup }) => {
  //   const controller = new AbortController();
  //   cleanup(() => controller.abort());
  //   return useProductDetails;
  // });
  const post = useProductDetails();
  const isShowThumbnail = useSignal(false);
  // const showThumbnailHandler = $(() => {
  //   isShowThumbnail.value = true;
  // })
  return (
    <>
      <Resource
        value={post}
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(post) => {
          console.log("post", post);
          return (
            <>
              <h3>This is post {post.responseData.id}</h3>
              <p>{post.responseData.title}</p>
              <MUIButton variant="outlined" onClick$={() => {isShowThumbnail.value=true}} >Show thumbnail</MUIButton>
              {isShowThumbnail.value && (
                <Image
                  src={post.externalImageUrl}
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
