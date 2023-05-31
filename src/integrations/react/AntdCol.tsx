/** @jsxImportSource react */

// import { Slot } from "@builder.io/qwik";
import { qwikify$ } from "@builder.io/qwik-react";
import { Col } from "antd";

export const AntdCol = qwikify$(Col);

// export const AntdCol = qwikify$(() => {
//   return (
//     <AntdCol>
//       <Slot />
//     </AntdCol>
//   );
// });
