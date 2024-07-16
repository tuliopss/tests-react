import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "vitest";
import Home from "./Home";
import userEvent from "@testing-library/user-event";

const handlers = [
  http.get("*jsonplaceholder.typicode.com*", async (req, res, ctx) => {
    console.log("calls");

    return HttpResponse.json([
      {
        userId: 1,
        id: 1,
        title: "title 1",
        body: "quia et suscipit",
        url: "img/img1",
      },
      {
        userId: 2,
        id: 2,
        title: "title 2",
        body: "quia et suscipit",
        url: "img/img2",
      },
      {
        userId: 3,
        id: 3,
        title: "title 3",
        body: "quia et suscipit",
        url: "img/img3",
      },
      {
        userId: 4,
        id: 4,
        title: "title 4",
        body: "quia et suscipit",
        url: "img/img4",
      },
    ]);
  }),
];

const server = setupServer(...handlers);
describe("Render home component", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => {
    server.resetHandlers();
  });

  afterAll(() => {
    server.close();
  });
  it("should render search, posts and load more", async () => {
    render(<Home />);
    const noMorePosts = screen.getByText("Não existem posts com esse título");

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts, { timeout: 5000 });

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(3);

    const button = screen.getByRole("button", { name: /clique aqui/i });
    expect(button).toBeInTheDocument();
  });

  it("should search for posts ", async () => {
    render(<Home />);
    const user = userEvent.setup();
    expect.assertions(13);
    const noMorePosts = screen.getByText("Não existem posts com esse título");

    await waitForElementToBeRemoved(noMorePosts, { timeout: 5000 });

    const search = screen.getByPlaceholderText(/type your search/i);

    expect(
      screen.getByRole("heading", { name: /title 1/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /title 2/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /title 3/i })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: /title 4/i })
    ).not.toBeInTheDocument();

    await user.type(search, "title 1");
    expect(
      screen.getByRole("heading", { level: 2 }, { name: /title 1/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole(
        "heading",
        { level: 1 },
        { name: "Search value: title 1" }
      )
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: /title 2/i })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: /title 3/i })
    ).not.toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: /title 4/i })
    ).not.toBeInTheDocument();

    await user.clear(search);
    expect(
      screen.getByRole("heading", { name: /title 1/i })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: /title 2/i })
    ).toBeInTheDocument();

    expect(
      screen.queryByRole("heading", { name: /title 3/i })
    ).toBeInTheDocument();

    await user.type(search, "no existe");
    expect(
      screen.getByText("Não existem posts com esse título")
    ).toBeInTheDocument();
  });

  it("should load more posts", async () => {
    render(<Home />);
    const event = userEvent.setup();

    const noMorePosts = screen.getByText("Não existem posts com esse título");
    await waitForElementToBeRemoved(noMorePosts, { timeout: 5000 });
    const button = screen.getByRole("button", { name: /clique aqui/i });

    await event.click(button);
    expect(
      screen.getByRole("heading", { name: /title 4/i })
    ).toBeInTheDocument();

    expect(button).toBeDisabled();
    // screen.debug();
  });
});
