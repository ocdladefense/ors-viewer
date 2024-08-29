/** @jsx vNode */
import '../css/input.css';
/* eslint-disable no-unused-vars */
import { vNode, View } from '@ocdla/view';
import App from './App';
/* eslint-enable */
import HttpClient from '@ocdla/lib-http/HttpClient';
import OrsMock from './mock/OrsMock';
import router from './routes';
import Titles_Toc from './components/toc/Titles_Toc';
import Chapters_Toc from './components/toc/Chapters_Toc';
import Sections_Toc from './components/toc/Sections_Toc';
import Chapter from './components/Chapter';
import { getBreadcrumbs } from './functions/ors/fetch_data';

if (USE_LOCAL_STATUTES_XML)
    HttpClient.register('https://ors.ocdla.org', new OrsMock());

// Available Types: 'bon' || 'ors'.
const currentAppType = APP_NAME;
// const myModule = await import(`./functions/${currentAppType}/fetch_data.js`);
const headerPinned = false;
const $root = document.getElementById('root');
const root = View.createRoot($root);
const [Component, props] = router.match(
    window.location.pathname,
    window.location.hash
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
        breadcrumbItems = getBreadcrumbs('chapter', props.chapter, props.hash);
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
