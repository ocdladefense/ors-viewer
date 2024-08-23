import '../css/input.css';
/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import App from './App';
// import Not_Found from '@ocdla/global-components/src/Not_Found';
import Ors_Search from './components/Ors_Search';
import Volumes_Toc from './components/Volumes_Toc';
import Titles_Toc from './components/Titles_Toc';
import Chapters_Toc from './components/Chapters_Toc';
import Sections_Toc from './components/Sections_Toc';
import Ors_Body from './components/Ors_Body';
/* eslint-enable */
import HttpClient from '@ocdla/lib-http/HttpClient';
import OrsMock from './mock/OrsMock';
import Router from '@ocdla/routing/Router';

if (USE_LOCAL_STATUTES_XML)
    HttpClient.register('https://ors.ocdla.org', new OrsMock());

// Available Types: 'bon' || 'ors'.
const currentAppType = APP_NAME;
const myModule = await import(`./functions/${currentAppType}/fetch_data.js`);
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
        router.addRoute('/', Ors_Search);
        router.addRoute('/toc', Volumes_Toc, {
            division: 'Volumes',
            title: 'OREGON REVISED STATUTES'
        });
        router.addRoute('/toc/volume/(\\w+)', Titles_Toc, {
            division: 'Titles'
        });
        router.addRoute('/toc/title/(\\w+)', Chapters_Toc, {
            division: 'Chapters'
        });
        router.addRoute('/toc/chapter/(\\w+)', Sections_Toc, {
            division: 'Sections'
        });
        // router.addRoute('/section/(\\d+)\\.(\\d+)', Ors_Body);
        // router.addRoute('/toc/section/[+-]?([0-9]*[.])?[0-9]+', Ors_Body);
        router.addRoute('/toc/section/(\\w+)', Ors_Body);
        break;
}

/* eslint-disable-next-line no-unused-vars */
const [Component, props] = router.match(window.location.pathname);
// const { body, breadcrumbs, sidebarFirstItems, sidebarSecondItems } =
//     myModule.processRoute(props);

// console.log(body);

root.render(
    <App
        view={root}
        currentAppType={currentAppType}
        headerPinned={headerPinned}
        // breadcrumbs={breadcrumbs || []}
        // sidebarFirstItems={sidebarFirstItems || []}
        // sidebarSecondItems={sidebarSecondItems || []}
        // body={body}
    >
        <Component {...props} />
    </App>
);

// if (orsBaseRoute === orsRoutes[5] && orsFetchDynamicHtml)
//     document.getElementById('body').innerHTML = body;
