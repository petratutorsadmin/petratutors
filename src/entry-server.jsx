import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import { I18nextProvider } from 'react-i18next';
import i18nServer from './i18n-server.js';
import AppSSR from './AppSSR.jsx';

export function render(url) {
    const html = renderToString(
        <HelmetProvider>
            <I18nextProvider i18n={i18nServer}>
                <StaticRouter location={url}>
                    <AppSSR />
                </StaticRouter>
            </I18nextProvider>
        </HelmetProvider>
    );
    return { html };
}
