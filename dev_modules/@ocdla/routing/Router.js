// This import requires the defining of its extension type.
/** @jsx vNode */

import Not_Found from '@ocdla/global-components/src/Not_Found.jsx';

export default class Router {
    // constructor(route, component) {
    // this.basePath = route;
    // this.addRoute(route, component);

    // console.log(basePath);
    // if (this.routes.length !== 0) {
    //     if (!sessionStorage.getItem('init')) {
    //         history.pushState({}, '', route);

    //         sessionStorage.setItem('init', 'false');
    //     }
    // }

    constructor() {
        this.routes = [];
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
        const normalized = path === '/' ? '/' : path.replace(/\/+$/, '');
        const parts = normalized.split('/');
        const _var = parts.length > 2 ? parts[parts.length - 2] : null;

        // We're handling the document root path above.
        // this.routes.shift();

        for (const r in this.routes.reverse()) {
            let { route, component, params } = this.routes[r];

            //  '^' + rRoute + '#(\w+)\.(\d+)$'
            // /toc
            // /toc/volume/1
            // /toc/volume/2
            // /toc/section#123.456
            // /chapter/278A
            // prettier-ignore

            route = route.replaceAll('/', '\\/');

            // May need to add in modifiers / flags.
            const re = new RegExp(route);

            // console.log(re);

            const matches = path.match(re);

            // if (!matches) continue;

            // If matches is null, then there wasn't a match.
            if (matches) {
                // console.log('1234');

                if (null !== _var) params[_var] = matches[1];

                return [component, params];
            }
        }

        return [Not_Found, {}];
    }
}
