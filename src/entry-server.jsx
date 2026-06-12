import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import i18nServer from './i18n-server.js';
import AppSSR from './AppSSR.jsx';

export function render(url) {
    const html = renderToString(
        <HelmetProvider>
            <I18nextProvider i18n={i18nServer}>
                <MemoryRouter initialEntries={[url]}>
                    <AppSSR />
                </MemoryRouter>
            </I18nextProvider>
        </HelmetProvider>
    );
    return { html };
}
