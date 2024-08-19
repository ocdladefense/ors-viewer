import '../css/input.css';
/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import Not_Found from '@ocdla/global-components/src/Not_Found';
import App from './App';
/* eslint-enable */
import HttpClient from '@ocdla/lib-http/HttpClient';
import OrsMock from './mock/OrsMock';
import ORS_Section_Link from './components/Ors_Section_Link';
import Sidebar_Item from '@ocdla/global-components/src/Sidebar_Item';
import Statutes from './components/Statutes';
// import Router from '@ocdla/routing/Router';

/*
import {
    fetch_items_statutes_volumes,
    fetch_items_statutes_volume_titles,
    fetch_items_statutes_title_chapters,
    fetch_items_statutes_chapter_sections,
    fetch_items_breadcrumbs_books_online,
    fetch_items_breadcrumbs_ors_viewer,
    fetch_sidebar_left_books_online,
    fetch_sidebar_left_ors_viewer,
    fetch_body_ors_viewer,
    fetch_sidebar_right_books_online,
    fetch_sidebar_right_ors_viewer
} from './functions/bon/fetch_data';
*/
const USE_LOCAL_STATUTES_XML = true;
if (USE_LOCAL_STATUTES_XML || true) {
    HttpClient.register('https://ors.ocdla.org', new OrsMock());
}

// "bon", "ors"
const currentAppType = APP_NAME;

// const language = detectVisitorLanguage();
let myModule = await import(`./functions/${currentAppType}/fetch_data.js`);
console.log(myModule);
/*
    Switch boolean data type to string data type later on perhaps.

    APP_TYPE can't be changed directly due to asynchronous nature.
*/

// Available Positions: '' (absolute / static) || 'pinned' (fixed / sticky).
const headerPinned = '';
// const currentVolume = matchVolumeCheck ? matchVolumeCheck[1] : 1;
// const currentTitle = matchTitleCheck ? matchTitleCheck[1] : 1;
const currentVolume = 1;
const currentTitle = 1;
// Use string to workaround to prevent Prettier rounding decimals for now.
const currentSection = parseFloat('1.001').toFixed(3);
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
const body = await myModule.getBody(currentChapter);

const error = false; // For now, assume we don't have a 404.

const $root = document.getElementById('root');
const root = View.createRoot($root);

<Routes>
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
</Routes>;

let router = new Router(basePath);
router.addRoute('statutes', <Statutes />);
router.addRoute('volume/(\d+)', Statute, "volume");

let [Component, props] = router.match(window.location.href);



/*
        currentVolume={currentVolume}
        currentTitle={currentTitle}
        currentChapter={currentChapter}
        currentSection={currentSection}
        volumes={volumes}
        items_statutes_volume_titles={items_statutes_volume_titles}
        items_statutes_title_chapters={items_statutes_title_chapters}
        items_statutes_chapter_sections={items_statutes_chapter_sections}
        */

root.render(
    <App
        view={root}
        currentAppType={currentAppType}
        headerPinned={headerPinned}
        error={error}
        volumes={volumes}
        breadcrumbs={breadcrumbs}
        sidebarFirstItems={sidebarFirstItems}
        sidebarSecondItems={sidebarSecondItems}
        body={body}
        layout='2-cols'>
        {notFoundError ? <Not_Found /> : ''}
        <Component ...props />
    </App>
);
