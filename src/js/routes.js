/** @jsx vNode */

import Router from '@ocdla/routing/Router';
// import Not_Found from '@ocdla/global-components/src/Not_Found';
import Ors_Search from './components/Ors_Search';
import Volumes_Toc from './components/Volumes_Toc';
import Titles_Toc from './components/Titles_Toc';
import Chapters_Toc from './components/Chapters_Toc';
import Sections_Toc from './components/Sections_Toc';
import Ors_Body from './components/Ors_Body';

const router = new Router();
export default router;

switch (APP_NAME) {
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
        // router.addRoute('/chapter/[+-]?([0-9]*[.])?[0-9]+', Sections_Toc, {
        // router.addRoute('/chapter/(\\d+)\\.(\\d+)', Sections_Toc, {
        router.addRoute('/toc/chapter/(\\w+)', Sections_Toc, {
            division: 'Sections'
        });
        // router.addRoute('/section/(\\w+)', Ors_Body);
        // router.addRoute('/section\\#(\\w+)\\.(\\w+)', Ors_Body);
        router.addRoute('/toc/section/(\\w+)\\.(\\w+)', Ors_Body);
        // router.addRoute('/section/(\\d+)\\.(\\d+)', Ors_Body);
        // router.addRoute('/toc/section/(\\d+)\\.(\\d+)', Ors_Body, {
        // router.addRoute('/toc/section/[+-]?([0-9]*[.])?[0-9]+', Ors_Body);
        break;
}
