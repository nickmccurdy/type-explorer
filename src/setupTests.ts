// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom/extend-expect";
import nodeFetch from "node-fetch";

function fetchMock(input: string) {
  return nodeFetch(input.replace("https://cors-anywhere.herokuapp.com/", ""));
}

window.fetch = (fetchMock as unknown) as typeof fetch;
