// const route = window.location.pathname;
// // Route example: localhost/statutes/ors_volume_1
// const matchVolumeCheck = route.match(/^\/statutes\/ors_volume_(\d+)$/);
// // Route example: localhost/statutes/ors_title_1
// const matchTitleCheck = route.match(/^\/statutes\/ors_title_(\d+)$/);
// // Route example: localhost/statutes/ors_chapter_1
// const matchChapterCheck = route.match(/^\/statutes\/ors_chapter_(\d+)$/);
// let error;

// switch (currentAppType) {
//     // Books Online
//     case 'bon':
//         if (route !== '/') error = true;
//         break;
//     // ORS Viewer
//     case 'ors':
//         if (
//             route !== '/' &&
//             route !== '/statutes' &&
//             !matchVolumeCheck &&
//             !matchTitleCheck &&
//             !matchChapterCheck
//         )
//             error = true;
//         break;
// }

// const routes = {};

// // route: "volume/(\d+)"
// // component: Statute
// // props: "id"
// function addRoute(route, component, props) {
//     // Insert our class code here eventually (if we need to).
// }

// <Routes>
//     <Route
//         path='/'
//         element={<Home />}
//     />
//     <Route
//         path='about'
//         element={<About />}
//     />
//     <Route
//         path='dashboard'
//         element={<Dashboard />}
//     />
// </Routes>;

// let router = new Router(basePath);
// router.addRoute('statutes', <TableOfContents />);
// router.addRoute('volume/(d+)', Statute, 'volume');

// let [Component, props] = router.match(window.location.href);

// function match(href) {
//     // Determine which route (if any) matches the given href.

//     return [component, props];
// }

// Insert our class code here eventually (if we need to).

// export default class Router {}

// history.pushState({}, '', '/statutes');
// history.pushState({}, '', '/statutes/ors_volume_1');

// document.title = 'Test';
// document.getElementById('body').innerHTML = html_body_ors_viewer;

// document.addEventListener('load', () => {
//     // document.addEventListener('popstate', () => {
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

/*
    import Router from './Router';
    import TableOfContents from '../components/TableOfContents';

    const router = new Router();

    router.addRoute('/statutes', <TableOfContents />);
    router.addRoute(/^\/ors-volume\/(\d+)$/);
    router.addRoute(/^\/ors-title\/(\d+)$/);
    router.addRoute(/^\/ors-chapter\/(\d+)$/);

    const currentRoute = window.location.pathname;
*/

/** @jsx vNode */
/* eslint-disable no-unused-vars */
// These imports require defining of extension type.
import { vNode } from '@ocdla/view';
import Not_Found from '@ocdla/global-components/src/Not_Found.jsx';
import Ors_Search from '../../../src/js/components/Ors_Search.jsx';
import TableOfContents from '../../../src/js/components/TableOfContents.jsx';
/* eslint-enable */

export default class Router {
    // constructor(route, component) {
    constructor() {
        // this.basePath = route;
        this.routes = [];
        // this.addRoute(route, component);

        // console.log(basePath);
        // if (this.routes.length !== 0) {
        //     if (!sessionStorage.getItem('init')) {
        //         history.pushState({}, '', route);

        //         sessionStorage.setItem('init', 'false');
        //     }
        // }
    }

    // getComponent(route) {
    //     console.log(route);
    //     switch (route) {
    //         case '/':
    //             return Ors_Search;
    //         case '/toc':
    //             return TableOfContents;
    //         case this.routes[0]:
    //             return <Statute id={id} />;
    //         case this.routes[0]:
    //             return <Statute id={id} />;
    //         case this.routes[0]:
    //             return <Statute id={id} />;
    //         case this.routes[0]:
    //             return <Statute id={id} />;
    //     }
    // }

    // addRoute(route, id = null, component = Not_Found, props = {}) {
    addRoute(path, id, component = Not_Found) {
        // addRoute(route, id = null) {
        const routeExists = this.routes.find(r => r.route === path);

        if (routeExists) {
            routeExists.id = id;
            routeExists.component = component;
            // routeExists.props = props;
            // } else this.routes.push({ route, id, component, props });
        } else this.routes.push({ route: path, id, component });
        // } else this.routes.push({ route, id });
    }

    match(route) {
        const normalizedRoute = route.replace(/\/+$/, '') || '/';

        for (const r in this.routes) {
            // const [rRoute, rId, rComponent, rProps] = Object.values(
            const [rRoute, rId, rComponent] = Object.values(this.routes[r]);
            // let matchFound;
            // console.log(route.match('^/volume/(\\d+)$'));
            // const [rRoute, rId] = Object.values(this.routes[r]);
            // console.log('^' + rRoute + '/(\\d+)$');
            const matchFound = rId
                ? route.match('^' + rRoute + '/(\\d+)$') ||
                  route.match('^' + rRoute + '#(\\d+)$')
                : normalizedRoute === rRoute;
            // const matchFound = normalizedRoute.test(rRoute);
            // const matchFound = rId
            //     ? new RegExp('^/volume/(\\d+)$').test(normalizedRoute)
            //     : normalizedRoute === rRoute;
            // const matchFound = normalizedRoute.test(rRoute);

            // if (rId) console.log(rRoute + rId);
            // console.log(new RegExp(normalizedRoute));
            // if (rId) {
            //     console.log(rRoute);
            //     console.log(normalizedRoute);
            //     console.log(new RegExp(rRoute).test(normalizedRoute));
            // }
            if (matchFound) {
                // console.log('a');
                // return [rRoute, rId, this.getComponent(route)];
                // return [rRoute, rId, rComponent, rProps];
                return [rRoute, parseInt(matchFound[1]), rComponent];
            }
        }

        return [Not_Found, {}];
    }
}
