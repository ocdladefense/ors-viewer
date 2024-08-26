/** @jsx vNode */
import '../css/input.css';

/* eslint-disable no-unused-vars */
import { vNode, View, getEffects } from '@ocdla/view';
import router from './routes';
import App from './App';
import HttpClient from '@ocdla/lib-http/HttpClient';
import OrsMock from './mock/OrsMock';

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
