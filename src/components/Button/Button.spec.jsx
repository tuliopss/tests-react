import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, vi } from "vitest";
import Button from "./Button";
import userEvent from "@testing-library/user-event";

describe("<Button/>", () => {
  it("should render button with the text 'Load more'", () => {
    render(<Button text='Load more' />);
    expect.assertions(1);
    //Get: o elemento está na tela
    //Query: o elemento pode não estar na tela
    const button = screen.getByRole("button", { name: /load more/i });

    expect(button).toBeInTheDocument();
  });

  it("should call function on button click", async () => {
    const fn = vi.fn();

    render(<Button text='Load more' handleClick={fn} />);

    const button = screen.getByRole("button", { name: /load more/i });
    fireEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled is true", async () => {
    render(<Button text='Load more' disabled={true} />);

    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeDisabled();
  });
  it("should be enable when disabled is false", async () => {
    render(<Button text='Load more' disabled={false} />);

    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeEnabled();
  });
});
