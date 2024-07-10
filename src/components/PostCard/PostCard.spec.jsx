import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PostCard from "./PostCard";

const props = {
  title: "title",
  body: "body",
  id: "1",
  cover: "img/src.png",
};

describe("<PostCard/>", () => {
  it("should render PostCard correctly", () => {
    render(<PostCard {...props} />);

    expect(screen.getByRole("img", { name: props.title })).toHaveAttribute(
      "src",
      props.cover
    );
  });
});
