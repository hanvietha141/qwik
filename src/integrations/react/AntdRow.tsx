/** @jsxImportSource react */

import { Slot } from "@builder.io/qwik";
import { qwikify$ } from "@builder.io/qwik-react";
import { Row } from "antd";

export const AntdRow = qwikify$(Row);

export const _AntdRow = qwikify$(() => {
  return (
    <Row>
      <Slot />
    </Row>
  );
});
