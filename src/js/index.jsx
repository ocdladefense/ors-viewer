/** @jsx vNode */

/**
 * @fileoverview This file is the root of the ORS Viewer application.
 */


import '../css/input.css';
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import App from './App';
/* eslint-enable */
import HttpClient from '@ocdla/lib-http/HttpClient';
import OrsMock from './mock/OrsMock';
import OcdlaApiMock from './mock/OcdlaApiMock';
import Router from '@ocdla/lib-routing/src/Router.js';
import routes from './routes';
import NotFound from '@ocdla/global-components/src/NotFound.jsx';
import Titles_Toc from './components/toc/Titles_Toc';
import Chapters_Toc from './components/toc/Chapters_Toc';
import Sections_Toc from './components/toc/Sections_Toc';
import Chapter from './components/Chapter';
import { getBreadcrumbs } from './functions/ors/fetch_data';

console.log(`IS_PRODUCTION - ${BASE_PATH}`);

if (USE_LOCAL_STATUTES_XML)
    HttpClient.register('https://ors.ocdla.org', new OrsMock());
if (USE_LOCAL_REFERENCE_PARSER)
    HttpClient.register('https://api.ocdla.org', new OcdlaApiMock());



const router = new Router();
router.setBasePath(BASE_PATH || '/');
router.setNotFoundCallback(NotFound);
routes.forEach(route => router.addRoute(route.path, route.callback, route.params || {}));

// Available Types: 'bon' || 'ors'.
const currentAppType = APP_NAME;
const headerPinned = false;
const $root = document.getElementById('root');
const root = View.createRoot($root);
const [Component, props] = router.match(
    window.location.pathname
);
let breadcrumbItems;

switch (Component) {
    case Titles_Toc:
        breadcrumbItems = getBreadcrumbs('titles', props.volume);
        break;
    case Chapters_Toc:
        breadcrumbItems = getBreadcrumbs('chapters', props.title);
        break;
    case Sections_Toc:
        breadcrumbItems = getBreadcrumbs('sections', props.chapter);
        break;
    case Chapter:
        breadcrumbItems = getBreadcrumbs('chapter', props.chapter, window.location.hash);
        break;
    default:
        breadcrumbItems = getBreadcrumbs();
        break;
}

root.render(
    <App
        view={root}
        currentAppType={currentAppType}
        headerPinned={headerPinned}
        breadcrumbs={breadcrumbItems}>
        <Component {...props} />
    </App>
);
