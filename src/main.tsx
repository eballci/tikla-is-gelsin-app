import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app';
import {Provider} from "react-redux";
import {store} from "./store/store";
import {defineCustomElements} from "@ionic/pwa-elements/loader";

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);

defineCustomElements(window).then();