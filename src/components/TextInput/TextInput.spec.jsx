import { describe, expect, it, vi } from "vitest";
import TextInput from "./TextInput";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// const propsMock = {
//   posts: [
//     {
//       id: 1,
//       title: "title",
//       body: "body 1",
//       cover: "img/img.png",
//     },
//     {
//       id: 2,
//       title: "title 2",
//       body: "body 2",
//       cover: "img/img.png 2",
//     },
//     {
//       id: 3,
//       title: "title 3",
//       body: "body 3",
//       cover: "img/img.png 3",
//     },
//   ],
// };
describe("<TextInput/>", () => {
  it("should have a value of searchValue", () => {
    const fn = vi.fn();
    render(<TextInput handleChange={fn} searchValue={"testadno"} />);

    const input = screen.getByPlaceholderText(/type your search/i);

    expect(input.value).toBe("testadno");
  });

  it("should call handleChange function on each key pressed", async () => {
    const fn = vi.fn();
    const user = userEvent.setup();
    render(<TextInput handleChange={fn} />);

    const input = screen.getByPlaceholderText(/type your search/i);

    const value = "value";

    await user.type(input, value);

    expect(input.value).toBe(value);

    expect(fn).toHaveBeenCalledTimes(value.length);
  });
  it("should match snapshot", () => {
    const fn = vi.fn();
    const { container } = render(<TextInput handleChange={fn} />);

    expect(container).toMatchSnapshot();
  });
});
