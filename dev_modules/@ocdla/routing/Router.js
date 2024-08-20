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
    case 'bon':
        if (route !== '/') error = true;
        break;
    // ORS Viewer
    case 'ors':
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

const routes = {};

// route: "volume/(\d+)"
// component: Statute
// props: "id"
function registerRoute(route, component, props) {
    // Insert our class code here eventually (if we need to).
}

<Routes>
    <Route
        path='/'
        element={<Home />}
    />
    <Route
        path='about'
        element={<About />}
    />
    <Route
        path='dashboard'
        element={<Dashboard />}
    />
</Routes>;

let router = new Router(basePath);
router.addRoute('statutes', <Statutes />);
router.addRoute('volume/(d+)', Statute, 'volume');

let [Component, props] = router.match(window.location.href);

function match(href) {
    // Determine which route (if any) matches the given href.

    return [component, props];
}

// Insert our class code here eventually (if we need to).

export default class Router {}

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
