import { describe, expect, it } from "vitest";
import Posts from "./Posts";
import { render, screen } from "@testing-library/react";

const propsMock = {
  posts: [
    {
      id: 1,
      title: "title",
      body: "body 1",
      cover: "img/img.png",
    },
    {
      id: 2,
      title: "title 2",
      body: "body 2",
      cover: "img/img.png 2",
    },
    {
      id: 3,
      title: "title 3",
      body: "body 3",
      cover: "img/img.png 3",
    },
  ],
};
describe("<Posts/>", () => {
  it("should render posts", () => {
    render(<Posts {...propsMock} />);

    expect(screen.getAllByRole("heading", { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByRole("img", { name: /title/i })).toHaveLength(3);
    expect(screen.getAllByText(/body/i)).toHaveLength(3);
    expect(screen.getByRole("img", { name: /title 3/i })).toHaveAttribute(
      "src",
      "img/img.png 3"
    );
  });

  it("should not render posts", () => {
    render(<Posts />);

    expect(
      screen.queryByRole("heading", { name: /title/i })
    ).not.toBeInTheDocument();  
  });

  it("should match snapshot", () => {
    const { container } = render(<Posts {...propsMock} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
