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

    addRoute(path, id, component = Not_Found) {
        const routeExists = this.routes.find(r => r.route === path);

        if (routeExists) {
            routeExists.id = id;
            routeExists.component = component;
        } else this.routes.push({ route: path, id, component });
    }

    match(route) {
        const normalizedRoute = route.replace(/\/+$/, '') || '/';

        for (const r in this.routes) {
            const [rRoute, rId, rComponent] = Object.values(this.routes[r]);
            const matchFound = rId
                ? normalizedRoute.match('^' + rRoute + '/(\\d+)$') ||
                  normalizedRoute.match('^' + rRoute + '#(\\d+)\\.(\\d{3})$')
                : normalizedRoute === rRoute;

            if (matchFound) {
                console.log('1234');

                return [rRoute, parseInt(matchFound[1]), rComponent];
            }
        }

        return [Not_Found, {}];
    }
}
