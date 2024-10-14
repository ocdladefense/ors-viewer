/**
 * @fileoverview This file defines the browser URL routes for the ORS Viewer application.
 */

/** @jsx vNode */
import Search from './components/Search';
import Volumes_Toc from './components/toc/Volumes_Toc';
import Titles_Toc from './components/toc/Titles_Toc';
import Chapters_Toc from './components/toc/Chapters_Toc';
import Sections_Toc from './components/toc/Sections_Toc';
import Chapter from './components/Chapter';


const routes = [
    {
        path: "/",
        callback: Search
    },
    {
        path: "/toc",
        callback: Volumes_Toc,
        params: {
            division: 'Volumes',
            title: 'OREGON REVISED STATUTES'
        }
    },
    {
        path: "/toc/volume/(\\w+)",
        callback: Titles_Toc,
        params: {
            division: 'Titles'
        }
    },
    {
        path: "/toc/title/(\\w+)",
        callback: Chapters_Toc,
        params: {
            division: 'Chapters'
        }
    },
    {
        path: "/chapter/(\\w+)",
        callback: Chapter
    },
    {
        path: "/toc/chapter/(\\w+)",
        callback: Sections_Toc,
        params: {
            division: 'Sections'
        }
    }
];

/*
        router.addRoute('/', Search);
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
        // router.addRoute('/chapter/(\\w+)', Chapter);
        router.addRoute('/chapter/(\\w+)', Chapter);
        router.addRoute('/toc/chapter/(\\w+)', Sections_Toc, {
            division: 'Sections'
        });
        // router.addRoute('/section/(\\w+)', Ors_Body);
        // router.addRoute('/toc/section/(\\w+)\\.(\\w+)', Chapter);
        // router.addRoute('/section/(\\d+)\\.(\\d+)', Ors_Body);
        // router.addRoute('/toc/section/(\\d+)\\.(\\d+)', Ors_Body, {
        // router.addRoute('/toc/section/[+-]?([0-9]*[.])?[0-9]+', Ors_Body);
        
*/

export default routes;
