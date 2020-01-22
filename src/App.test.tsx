import React from "react";
import { fireEvent, render, wait } from "@testing-library/react";
import App from "./App";

test("renders search results", async () => {
  const { container, getByLabelText, getByText } = render(<App />);
  expect(container.querySelector(".monaco-editor")).toBeNull();

  fireEvent.change(getByLabelText("Package:"), { target: { value: "react" } });
  fireEvent.click(getByText("Submit"));
  await wait(() => {
    expect(container.querySelector(".monaco-editor")).not.toBeNull();
  });
});
