import { component$, Slot } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';

import Footer from '~/components/starter/footer/footer';
import Header from '~/components/starter/header/header';

import SideBar from '~/components/SideBar';

export const useServerTimeLoader = routeLoader$(() => {
  return {
    date: new Date().toISOString(),
  };
});

export default component$(() => {
  // useStyles$(styles);
  return (
    <>
      <Header />
      <main class="flex" >
        <div class="w-1/4">
          <SideBar />
        </div>
        <div class="w-3/4">
          <Slot/>
        </div>
      </main>
      <Footer />
    </>
  );
});
