import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./Home";

describe("Render home component", () => {
  it("should render search, posts and load more", () => {
    render(<Home />);
    
  });
});
