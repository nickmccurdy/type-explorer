import React from "react";
import { fireEvent, render, wait } from "@testing-library/react";
import App from "./App";

test("renders search results", async () => {
  const { container } = render(<App />);
  expect(container.querySelector(".monaco-editor")).toBeNull();

  fireEvent.change(container.querySelector("input")!, {
    target: {
      value: "react"
    }
  });
  fireEvent.click(container.querySelector("button")!);
  await wait(() => {
    expect(container.querySelector(".monaco-editor")).not.toBeNull();
  });
});
