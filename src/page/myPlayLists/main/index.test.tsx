import { render, screen } from "../../../test-utils";
import Main from "./index";
import '@testing-library/jest-dom'

describe("myPlayLists/main", () => {
    test("Initail Render Correctly!", () => {
        const mockGetArtistNames = jest.fn(() => ("Artist-1,Artist-2"));
        const mockHandleDeleteItemToPlayList = jest.fn();

        render(
            <Main 
                getArtistNames={mockGetArtistNames}
                handleDeleteItemToPlayList={mockHandleDeleteItemToPlayList}
            />
        )

        const initCellEl = screen.getByRole("cell", {
            name: /no data/i
        })
        expect(initCellEl).toBeInTheDocument();
    })
})