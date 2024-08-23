/** @jsx vNode */
/* eslint-disable no-unused-vars */
// These imports require defining of extension type.
import { vNode } from '@ocdla/view';
import Not_Found from '@ocdla/global-components/src/Not_Found.jsx';
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

    addRoute(path, component = Not_Found, params = {}) {
        const routeExists = this.routes.find(r => r.route === path);

        if (routeExists) {
            routeExists.id = id;
            routeExists.component = component;
        } else this.routes.push({ route: path, component, params });
    }

    match(path) {
        // if (path === '/') {
        //     let { route, component, params } = this.routes['/'];

        //     return [component, params];
        // }
        // Leave the root path alone; compensate for any trailing slashes.
        const normalized = path == '/' ? '/' : path.replace(/\/+$/, '');
        let parts = normalized.split('/');
        let _var = parts.length > 2 ? parts[parts.length - 2] : null;
        // this.routes.shift(); // We're handling the document root path above.
        for (const r in this.routes.reverse()) {
            let { route, component, params } = this.routes[r];
            //  '^' + rRoute + '#(\w+)\.(\d+)$'
            // /toc
            // /toc/volume/1
            // /toc/volume/2
            // /toc/section#123.456
            // /chapter/278A
            // prettier-ignore
            route = route.replaceAll('/', '\/');
            // May need to add in modifiers / flags.
            let re = new RegExp(route);
            console.log(re);
            let matches = path.match(re);

            // if (!matches) continue;

            // If matches is null, then there wasn't a match.
            if (matches) {
                console.log('1234');

                if (null !== _var) {
                    params[_var] = matches[1];
                }
                return [component, params];
            }
        }

        return [Not_Found, {}];
    }
}
