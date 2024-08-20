import '../css/input.css';
/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
// import Not_Found from '@ocdla/global-components/src/Not_Found';
import App from './App';
/* eslint-enable */
import HttpClient from '@ocdla/lib-http/HttpClient';
import OrsMock from './mock/OrsMock';
// import ORS_Section_Link from './components/Ors_Section_Link';
// import Sidebar_Item from '@ocdla/global-components/src/Sidebar_Item';
import TableOfContents from './components/TableOfContents';
// import Router from '@ocdla/routing/Router';

if (USE_LOCAL_STATUTES_XML)
    HttpClient.register('https://ors.ocdla.org', new OrsMock());

const currentAppType = APP_NAME; // Available Types: 'bon' || 'ors'.
// const language = detectVisitorLanguage();
let myModule = await import(`./functions/${currentAppType}/fetch_data.js`);
// console.log(myModule);
const headerPinned = ''; // Available Positions: '' (absolute / static) || 'pinned' (fixed / sticky).
// const currentVolume = matchVolumeCheck ? matchVolumeCheck[1] : 1;
// const currentTitle = matchTitleCheck ? matchTitleCheck[1] : 1;
const currentVolume = 1;
const currentTitle = 1;
const currentSection = parseFloat('1.001').toFixed(3); // Use string to workaround to prevent Prettier + vanilla JS rounding decimals for now.
const currentChapter = parseInt(currentSection.split('.')[0]);
let volumes, titles, chapters, sections;

if (currentAppType === 'ors') {
    volumes = await myModule.getVolumes();
    titles = await myModule.getTitles(currentVolume);
    chapters = await myModule.getChapters(currentTitle);
    sections = await myModule.getSections(currentChapter);
}

const breadcrumbs = await myModule.getBreadcrumbs(
    currentVolume,
    currentTitle,
    currentChapter,
    currentSection
);
const sidebarFirstItems = await myModule.getSidebarFirstItems(currentChapter);
const sidebarSecondItems = await myModule.getSidebarSecondItems(currentChapter);
const orsRoutes = [
    '/', // 0
    '/toc', // 1
    '/volume/1', // 2
    '/title/1', // 3
    '/chapter/1', // 4
    '/section#1.001' // 5
];
const orsBaseRoute = orsRoutes[5];
const orsFetchDynamicHtml = false;
const body = await myModule.getBody(currentChapter, orsFetchDynamicHtml);
const error = false; // For now, assume we don't have a 404.
const $root = document.getElementById('root');
const root = View.createRoot($root);

{
    /* <Routes>
    <Route
        path='/'
        element={<Home />}
    />
    <Route
        path='about'
        element={<About />}
    />
    <Route
        path='dashboard'
        element={<Dashboard />}
    />
</Routes>; */
}

// let router = new Router(basePath);
// router.addRoute('statutes', <TableOfContents />);
// router.addRoute('volume/(d+)', Statute, 'volume');
function routerMatch(path) {
    let params = {
        division: 'Volumes',
        title: 'Volumes',
        subtitle: 'Foobar',
        entries: volumes
    };
    return [TableOfContents, params];
}
// let [Component, props] = router.match(window.location.href);
let [Component, props] = routerMatch(window.location.href);
root.render(
    <App
        view={root}
        currentAppType={currentAppType}
        headerPinned={headerPinned}
        volumes={volumes}
        titles={titles}
        chapters={chapters}
        sections={sections}
        breadcrumbs={breadcrumbs}
        sidebarFirstItems={sidebarFirstItems}
        sidebarSecondItems={sidebarSecondItems}
        body={body}
        orsRoutes={orsRoutes}
        orsBaseRoute={orsBaseRoute}
        // layout='2-cols'
    >
        <Component {...props} />
    </App>
);
/* <App>
 {notFoundError ? <Not_Found /> : ''}
 <Component ...props />
 </App> */

if (orsBaseRoute === orsRoutes[5] && orsFetchDynamicHtml)
    document.getElementById('body').innerHTML = body;

// history.pushState({}, '', '/statutes');
// history.pushState({}, '', '/statutes/ors_volume_1');

// document.title = 'Test';

// window.addEventListener('popstate', () => {
//     console.log('a');
// });

// View.addEvent('load', function () {
//     console.log('b');
// });
// console.log(root.root);
// console.log(root.getEvents());

// root.root.addEventListener('load', function () {
//     console.log('b');
// });

// console.log(root.getEvents());
