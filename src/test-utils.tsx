import { RenderOptions, render } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";
import { Provider } from "react-redux";
import { store } from "./reduxToolkit/store";
import { BrowserRouter as Router } from "react-router-dom";


const Wrapper = ({children}: {children: React.ReactNode}) => (
    <I18nextProvider i18n={i18n}>
        <Provider store={store}>
            <Router basename={process.env.PUBLIC_URL}>
                {children}
            </Router>
        </Provider>
    </I18nextProvider>
)

const customizedRender = (ui: React.ReactElement, options: RenderOptions) => (
    render(ui, {
        wrapper: Wrapper,
        ...options // 其他特定測試要加入 Provider，才不會被預設覆蓋
    })
)

export * from "@testing-library/react";
export { customizedRender  as render };