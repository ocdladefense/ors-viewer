import '../css/input.css';
/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import App from './App';
import Ors_Search from './components/Ors_Search';
import VolumesToc from './components/VolumesToc';
import TitlesToc from './components/TitlesToc';
import ChaptersToc from './components/ChaptersToc';
/* eslint-enable */
import HttpClient from '@ocdla/lib-http/HttpClient';
import OrsMock from './mock/OrsMock';
import Router from '@ocdla/routing/Router';

if (USE_LOCAL_STATUTES_XML)
    HttpClient.register('https://ors.ocdla.org', new OrsMock());

// Available Types: 'bon' || 'ors'.
const currentAppType = APP_NAME;

let myModule = await import(`./functions/${currentAppType}/fetch_data.js`);

// Available Positions: '' (absolute / static) || 'pinned' (fixed / sticky).
const headerPinned = '';
const $root = document.getElementById('root');
const root = View.createRoot($root);
const router = new Router();

switch (currentAppType) {
    case 'bon':
        router.addRoute('/', 'xyz');
        break;
    case 'ors':
        // prettier-ignore
        router.addRoute('/', Ors_Search);
        // prettier-ignore
        router.addRoute('/toc', VolumesToc, { division: 'Volumes', title: 'OREGON REVISED STATUTES'});
        // prettier-ignore
        router.addRoute('/toc/volume/(\\w+)', TitlesToc);
        // prettier-ignore
        router.addRoute('/toc/title/(\\w+)', ChaptersToc);
        // prettier-ignore
        // router.addRoute('/chapter/(\w+)', TableOfContents);
        break;
}

const [Component, props] = router.match(window.location.pathname);

const currentSection = parseFloat('1.001').toFixed(3); // Use string to workaround to prevent Prettier + vanilla JS rounding decimals for now.
const currentChapter = parseInt(currentSection.split('.')[0]);

const breadcrumbs = await myModule.getBreadcrumbs(
    currentChapter,
    currentChapter,
    currentChapter,
    currentSection
);
const sidebarFirstItems = await myModule.getSidebarFirstItems(currentChapter);
const sidebarSecondItems = await myModule.getSidebarSecondItems(currentChapter);
const orsFetchDynamicHtml = false;
const body = await myModule.getBody(currentChapter, orsFetchDynamicHtml);
const error = false; // For now, assume we don't have a 404.

root.render(
    <App
        view={root}
        currentAppType={currentAppType}
        headerPinned={headerPinned}
        breadcrumbs={breadcrumbs}
        sidebarFirstItems={sidebarFirstItems}
        sidebarSecondItems={sidebarSecondItems}
        body={body}>
        <Component {...props} />
    </App>
);

//if (orsBaseRoute === orsRoutes[5] && orsFetchDynamicHtml)
//  document.getElementById('body').innerHTML = body;
