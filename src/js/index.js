import '../css/input.css';
/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import App from './App';
/* eslint-enable */
import {
    fetch_breadcrumbs_ors_viewer,
    fetch_sidebar_left_ors_viewer,
    fetch_sidebar_right_ors_viewer
} from './functions/fetch_data';

const $body = document.querySelector('body');
const root = View.createRoot($body);
const currentVolume = 1;
const currentTitle = 1;
// Use string to workaround to prevent Prettier rounding decimals for now.
const currentSection = parseFloat('1.001').toFixed(3);
// const currentSection = parseFloat('2.010').toFixed(3);
const currentChapter = parseInt(currentSection.split('.')[0]);
const items_breadcrumbs_ors_viewer = await fetch_breadcrumbs_ors_viewer(
    currentVolume,
    currentTitle,
    currentChapter,
    currentSection
);
const items_sidebar_left_ors_viewer =
    await fetch_sidebar_left_ors_viewer(currentChapter);
const items_sidebar_right_ors_viewer =
    await fetch_sidebar_right_ors_viewer(currentChapter);

root.render(
    <App
        view={root}
        appTypeCurrent={false}
        currentVolume={currentVolume}
        currentTitle={currentTitle}
        currentChapter={currentChapter}
        currentSection={currentSection}
        items_breadcrumbs_ors_viewer={items_breadcrumbs_ors_viewer}
        items_sidebar_left_ors_viewer={items_sidebar_left_ors_viewer}
        items_sidebar_right_ors_viewer={items_sidebar_right_ors_viewer}
    />
);
