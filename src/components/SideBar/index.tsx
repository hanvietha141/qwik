import {
  $,
  Resource,
  component$,
  useResource$,
  useSignal,
  useStylesScoped$,
  useTask$,
} from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { MUIContainer, MUIInput } from "~/integrations/react/mui";
import { fandeloApi } from "~/sevices/post";
import styles from "./index.css?inline";

const SideBar = component$(() => {
  useStylesScoped$(styles);

  const inputText = useSignal("");
  const debouncedValue = useSignal("");
  const postsRessource = useResource$<any>(({ track, cleanup }) => {
    track(() => debouncedValue.value);
    const controller = new AbortController();
    cleanup(() => controller.abort());
    return fandeloApi(debouncedValue.value);
  });

  const onInput = $((val: any) => {
    inputText.value = val.target.value;
  });

  useTask$(({ track, cleanup }) => {
    track(() => inputText.value);

    const debounced = setTimeout(() => {
      debouncedValue.value = inputText.value;
    }, 500);

    cleanup(() => clearTimeout(debounced));
  });

  return (
    <MUIContainer>
      <MUIInput placeholder="Type something to search" onInput$={onInput} class="mui-input-hahan" />
      <Resource
        value={postsRessource}
        onPending={() => <div>Loading...</div>}
        onRejected={(error) => <div>Error: {error.message}</div>}
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
    </MUIContainer>
  );
});

export default SideBar;
