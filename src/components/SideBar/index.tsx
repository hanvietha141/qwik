import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from "@builder.io/qwik";
import { fandeloApi, getPosts } from "~/sevices/post";
import styles from "./index.css?inline";
import { Link } from "@builder.io/qwik-city";

const SideBar = component$(() => {
  useStylesScoped$(styles);
  const postsRessource = useResource$<any>(({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    return fandeloApi();
  });
  return (
    <>
      <Resource
        value={postsRessource}
        onPending={() => <>Loading...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={(posts) => (
          <ul>
            {posts.responseData.data.map((post: any) => (
              <li key={post.id}>
                <Link href={`/posts/${post.id}`}>
                  <p class="item">{post.title}</p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      />
    </>
  );
});

export default SideBar;
