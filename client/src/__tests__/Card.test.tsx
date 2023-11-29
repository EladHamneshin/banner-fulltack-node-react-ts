import { render, screen } from "@testing-library/react"
import { Card } from "../Card"
import userEvent from "@testing-library/user-event";
const card = {
    name: "Charizard",
    imageUrl: "https://images.pokemontcg.io/base1/4.png",
};
const onShowDetails = vi.fn()
describe("Card", () => {
    test("test name is displayed", () => {
        render(<Card card={card} onShowDetails={onShowDetails} isShowingDetails={false} />)
        const nameElement = screen.getByText(/Charizard/i)
        expect(nameElement).toBeInTheDocument()
    });
    test("test image is displayed", () => {
        render(<Card card={card} onShowDetails={onShowDetails} isShowingDetails={true} />)
        const imageElement = screen.getByRole("img")
        expect(imageElement).toBeInTheDocument()
    });
    test("button is clicked using userEvent", async () => {
        const user = userEvent.setup()
        render(<Card card={card} onShowDetails={onShowDetails} isShowingDetails={false} />)
        const buttonElement = screen.getByRole("button")
        await user.click(buttonElement);
        expect(onShowDetails).toHaveBeenCalled()
        });
});