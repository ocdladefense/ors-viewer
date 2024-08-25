/** @jsx vNode */
import '../css/input.css';

/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import router from './routes';
import App from './App';
import HttpClient from '@ocdla/lib-http/HttpClient';
import OrsMock from './mock/OrsMock';
import Ors_Body from './components/Chapter';
import { body } from './components/Chapter';

/* eslint-enable */
if (USE_LOCAL_STATUTES_XML)
    HttpClient.register('https://ors.ocdla.org', new OrsMock());

// Available Types: 'bon' || 'ors'.
const currentAppType = APP_NAME;
// const myModule = await import(`./functions/${currentAppType}/fetch_data.js`);
// Available Positions: '' (absolute / static) || 'pinned' (fixed / sticky).
const headerPinned = '';
const $root = document.getElementById('root');
const root = View.createRoot($root);

const [Component, props] = router.match(window.location.pathname);

root.render(
    <App
        view={root}
        currentAppType={currentAppType}
        headerPinned={headerPinned}>
        <Component {...props} />
    </App>
);

if (Component === Ors_Body) {
    const _body = await body();

    document.getElementById('body').innerHTML = _body;
}
