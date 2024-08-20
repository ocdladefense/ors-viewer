/*
    import Router from './Router';
    import Statutes from '../components/Statutes';

    const router = new Router();

    router.registerRoute('/statutes', <Statutes />);
    router.registerRoute(/^\/ors-volume\/(\d+)$/);
    router.registerRoute(/^\/ors-title\/(\d+)$/);
    router.registerRoute(/^\/ors-chapter\/(\d+)$/);

    const currentRoute = window.location.pathname;
*/

import Not_Found from '@ocdla/global-components/src/Not_Found';
import Ors_Search from '../components/Ors_Search';
import Statute from '../components/Statute';

export default class Router {
    constructor(basePath = '/') {
        this.basePath = basePath;
        this.routes;
        this.registerRoute(basePath);

        window.location.pathname = basePath;
    }

    registerRoute(route, component, id) {
        this.routes.push(route, component, id);
    }

    getComponentFor(route, id) {
        switch (route) {
            case '/':
                return <Ors_Search />;
            case '/statutes':
                return <Statutes />;
            case /^\/ors-volume\/(\d+)$/:
                return <Statute id={id} />;
            case /^\/ors-title\/(\d+)$/:
                return <Statute id={id} />;
            case /^\/ors-chapter\/(\d+)$/:
                return <Statute id={id} />;
            default:
                return <Not_Found />;
        }
    }

    match(path) {
        for (let r in this.routes) {
            const [route, component] = this.routes[r];
            const match = route.match(path);

            if (match === true) return component;
        }
    }
}
