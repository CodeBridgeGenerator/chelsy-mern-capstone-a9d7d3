import React from "react";
import { render, screen } from "@testing-library/react";

import CartItemHistoryCreateDialogComponent from "../CartItemHistoryCreateDialogComponent";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { init } from "@rematch/core";
import { Provider } from "react-redux";
import * as models from "../../../models";

test("renders cartItemHistory create dialog", async () => {
    const store = init({ models });
    render(
        <Provider store={store}>
            <MemoryRouter>
                <CartItemHistoryCreateDialogComponent show={true} />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.getByRole("cartItemHistory-create-dialog-component")).toBeInTheDocument();
});
