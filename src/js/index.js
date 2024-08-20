import '../css/input.css';
/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import Not_Found from '@ocdla/global-components/src/Not_Found';
import App from './App';
/* eslint-enable */
import HttpClient from '@ocdla/lib-http/HttpClient';
import OrsMock from './mock/OrsMock';

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
} from './functions/fetch_data';

const USE_LOCAL_STATUTES_XML = true;

if (USE_LOCAL_STATUTES_XML || true)
    HttpClient.register('https://ors.ocdla.org', new OrsMock());

const currentAppType = APP_TYPE;
/*
    Switch boolean data type to string data type later on perhaps.

    APP_TYPE can't be changed directly due to asynchronous nature.
*/
const route = window.location.pathname;
// Route example: localhost/statutes/ors_volume_1
const matchVolumeCheck = route.match(/^\/statutes\/ors_volume_(\d+)$/);
// Route example: localhost/statutes/ors_title_1
const matchTitleCheck = route.match(/^\/statutes\/ors_title_(\d+)$/);
// Route example: localhost/statutes/ors_chapter_1
const matchChapterCheck = route.match(/^\/statutes\/ors_chapter_(\d+)$/);
let error;

switch (currentAppType) {
    // Books Online
    case true:
        if (route !== '/') error = true;
        break;
    // ORS Viewer
    case false:
        if (
            route !== '/' &&
            route !== '/statutes' &&
            !matchVolumeCheck &&
            !matchTitleCheck &&
            !matchChapterCheck
        )
            error = true;
        break;
}

const $root = document.getElementById('root');
const root = View.createRoot($root);
// Available Positions: '' (absolute / static) || 'pinned' (fixed / sticky).
const headerPinned = '';
// const currentVolume = matchVolumeCheck ? matchVolumeCheck[1] : 1;
// const currentTitle = matchTitleCheck ? matchTitleCheck[1] : 1;
const currentVolume = 1;
const currentTitle = 1;
// Use string to workaround to prevent Prettier rounding decimals for now.
const currentSection = parseFloat('1.001').toFixed(3);
const currentChapter = parseInt(currentSection.split('.')[0]);
const items_statutes_volumes = await fetch_items_statutes_volumes();
const items_statutes_volume_titles =
    await fetch_items_statutes_volume_titles(currentVolume);
const items_statutes_title_chapters =
    await fetch_items_statutes_title_chapters(currentTitle);
const items_statutes_chapter_sections =
    await fetch_items_statutes_chapter_sections(currentChapter);
const items_breadcrumbs_books_online =
    await fetch_items_breadcrumbs_books_online();
const items_breadcrumbs_ors_viewer = await fetch_items_breadcrumbs_ors_viewer(
    currentVolume,
    currentTitle,
    currentChapter,
    currentSection
);
const items_sidebar_left_books_online =
    await fetch_sidebar_left_books_online(currentChapter);
const items_sidebar_left_ors_viewer =
    await fetch_sidebar_left_ors_viewer(currentChapter);
const html_body_ors_viewer = await fetch_body_ors_viewer(currentChapter);
const items_sidebar_right_books_online =
    await fetch_sidebar_right_books_online(currentChapter);
const items_sidebar_right_ors_viewer =
    await fetch_sidebar_right_ors_viewer(currentChapter);
const body = <Not_Found />;

root.render(
    <App
        view={root}
        currentAppType={currentAppType}
        headerPinned={headerPinned}
        error={error}
        route={route}
        currentVolume={currentVolume}
        currentTitle={currentTitle}
        currentChapter={currentChapter}
        currentSection={currentSection}
        items_statutes_volumes={items_statutes_volumes}
        items_statutes_volume_titles={items_statutes_volume_titles}
        items_statutes_title_chapters={items_statutes_title_chapters}
        items_statutes_chapter_sections={items_statutes_chapter_sections}
        items_breadcrumbs_books_online={items_breadcrumbs_books_online}
        items_breadcrumbs_ors_viewer={items_breadcrumbs_ors_viewer}
        items_sidebar_left_books_online={items_sidebar_left_books_online}
        items_sidebar_left_ors_viewer={items_sidebar_left_ors_viewer}
        html_body_ors_viewer={html_body_ors_viewer}
        items_sidebar_right_books_online={items_sidebar_right_books_online}
        items_sidebar_right_ors_viewer={items_sidebar_right_ors_viewer}
        body={body}
    />
);

// history.pushState({}, '', '/statutes');
// history.pushState({}, '', '/statutes/ors_volume_1');

// document.title = 'Test';
// document.getElementById('body').innerHTML = html_body_ors_viewer;

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
