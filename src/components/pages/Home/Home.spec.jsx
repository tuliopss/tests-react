import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./Home";

describe("Render home component", () => {
  it("test 1", () => {
    render(<Home />);
    screen.debug(); // prints out the jsx in the App component unto the command line
  });
});
