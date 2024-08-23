import '../css/input.css';
/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import App from './App';
// import Not_Found from '@ocdla/global-components/src/Not_Found';
// import ORS_Section_Link from './components/Ors_Section_Link';
// import Sidebar_Item from '@ocdla/global-components/src/Sidebar_Item';
// import Sidebar from '@ocdla/global-components/src/Sidebar';
// import Body from '@ocdla/global-components/src/Body';
import Ors_Search from './components/Ors_Search';
import TableOfContents from './components/TableOfContents';
import VolumesToc from './components/VolumesToc';
import TitlesToc from './components/TitlesToc';
import ChaptersToc from './components/ChaptersToc';
/* eslint-enable */
import HttpClient from '@ocdla/lib-http/HttpClient';
import OrsMock from './mock/OrsMock';
import Router from '@ocdla/routing/Router';

if (USE_LOCAL_STATUTES_XML)
    HttpClient.register('https://ors.ocdla.org', new OrsMock());

const currentAppType = APP_NAME; // Available Types: 'bon' || 'ors'.
// const language = detectVisitorLanguage();
let myModule = await import(`./functions/${currentAppType}/fetch_data.js`);
// console.log(myModule);
const headerPinned = ''; // Available Positions: '' (absolute / static) || 'pinned' (fixed / sticky).

// history.pushState({}, '', '/');
// history.pushState({}, '', '/toc');
// history.pushState({}, '', '/toc/volume/1');
// history.pushState({}, '', '/toc/title/1');
// history.pushState({}, '', '/toc/chapter/1');
// history.pushState({}, '', '/toc/section/1.001');

const $root = document.getElementById('root');
const root = View.createRoot($root);
const router = new Router();

// router.addRoute('/');
// router.addRoute('/toc');
// router.addRoute('/volume', 1);
// router.addRoute('/title', 1);
// router.addRoute('/chapter', 1);
// router.addRoute('/section', 1);

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
        // router.addRoute('/toc/section', true, 'a');
        break;
}

// router.addRoute('/', null, Ors_Search);
// router.addRoute('/toc', null, TableOfContents, {
//     division: 'Volumes',
//     title: 'OREGON REVISED STATUTES',
//     entries: volumes
// });
// router.addRoute('/volume', 1, TableOfContents, {
//     division: 'Titles',
//     title: 'VOLUME ' + titles[0].id,
//     subtitle: titles[0].volumeName,
//     entries: titles
// });
// router.addRoute('/title', 1, TableOfContents, {
//     division: 'Chapters',
//     title: 'TITLE ' + chapters[0].id,
//     subtitle: chapters[0].titleName,
//     entries: chapters
// });
// router.addRoute('/chapter', 1, TableOfContents, {
//     division: 'Sections',
//     title: 'CHAPTER ' + sections[1].id.split('.')[0],
//     subtitle: sections[1].chapterName,
//     entries: sections
// });
// router.addRoute('/section', 1.001, TableOfContents, {});

const routeData = router.match(window.location.pathname);
// const [route, id, Component, props] = routeData;
const [Component, props] = routeData;
// const [Component, props] = ['abc', {}];

let volumes, titles, chapters, sections;

// console.log(id);
// console.log(router.routes[0].route);

const currentSection = parseFloat('1.001').toFixed(3); // Use string to workaround to prevent Prettier + vanilla JS rounding decimals for now.
const currentChapter = parseInt(currentSection.split('.')[0]);

// if (currentAppType === 'ors') {
//     sections = await myModule.getSections(id);
// }

// console.log(titles);
// console.log(router.routes[1]);

if (false && currentAppType === 'ors') {
    switch (param[0]) {
        // ----------> '/'
        case router.routes[0].route:
            props = {};
            break;
        // ----------> '/toc'
        case router.routes[1].route:
            props = {
                division: 'Volumes',
                title: 'OREGON REVISED STATUTES',
                entries: myModule.getVolumes()
            };
            break;
        // ----------> '/volume/*'
        case router.routes[2].route:
            props = {
                division: 'Titles',
                title: 'VOLUME ' + id,
                subtitle: myModule.getVolume(id).getAttribute('name'),
                entries: myModule.getTitles(true, id)
            };
            break;
        // ----------> '/title/*'
        case router.routes[3].route:
            props = {
                division: 'Chapters',
                title: 'TITLE ' + id,
                subtitle: myModule.getTitle(id),
                entries: myModule.getChapters(true, id)
            };
            break;
        // ----------> '/chapter/*'
        /*case router.routes[4].route:
            chapters = await myModule.getChapters(false, id);
            sections = await myModule.getSections(true, id);
            props = {
                division: 'Sections',
                title: 'CHAPTER ' + id,
                subtitle: chapters.find(v => parseInt(v.id) === id).label,
                entries: sections
            };
            break;
            */
        /* /section/*
        case router.routes[5].route:
            console.log('a');
            props = {
                body: 'abc'
            };
            break;
            */
    }
}

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
        // volumes={volumes}
        // titles={titles}
        // chapters={chapters}
        // sections={sections}
        breadcrumbs={breadcrumbs}
        sidebarFirstItems={sidebarFirstItems}
        sidebarSecondItems={sidebarSecondItems}
        body={body}
        // layout='2-cols'
        // />
    >
        {/* {notFoundError ? <Not_Found /> : ''} */}
        <Component {...props} />
    </App>
);

//if (orsBaseRoute === orsRoutes[5] && orsFetchDynamicHtml)
//  document.getElementById('body').innerHTML = body;

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
