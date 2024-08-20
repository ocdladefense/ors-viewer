/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Navbar from '@ocdla/global-components/src/Navbar';
import Breadcrumbs from '@ocdla/global-components/src/Breadcrumbs';
// import Not_Found from '@ocdla/global-components/src/Not_Found';
import Ors_Search from './components/Ors_Search';
import TableOfContents from './components/TableOfContents';
import Sidebar from '@ocdla/global-components/src/Sidebar';
import Body from '@ocdla/global-components/src/Body';
import Footer from '@ocdla/global-components/src/Footer';
/* eslint-enable */

export default function App({
    view,
    currentAppType,
    headerPinned,
    // error,
    volumes,
    titles,
    chapters,
    sections,
    breadcrumbs,
    sidebarFirstItems,
    sidebarSecondItems,
    body,
    orsRoutes,
    orsBaseRoute
    // layout
}) {
    // There is a component that can be used to render a nice 404 error.
    // return <Not_Found />;
    return (
        <>
            <header
                // prettier-ignore
                class={`${headerPinned === 'pinned' ? 'sticky top-0 ' : ''}container mx-auto flex w-full flex-col bg-white lg:h-32`}>
                <Navbar />
                <Breadcrumbs crumbs={breadcrumbs} />
            </header>
            {/* <Main cols='3' /> */}
            <main class='container mx-auto border-x'>
                {(() => {
                    switch (currentAppType) {
                        // Books Online
                        case 'bon':
                            return (
                                <div class='lg:grid lg:grid-cols-6'>
                                    <Sidebar
                                        type='left'
                                        items={sidebarFirstItems}
                                    />
                                    <Body
                                        view={view}
                                        currentAppType={currentAppType}
                                        body={body}
                                    />
                                    <Sidebar
                                        type='right'
                                        items={sidebarSecondItems}
                                    />
                                </div>
                            );
                        // ORS Viewer
                        case 'ors': {
                            // Move this later to routing.
                            history.pushState({}, '', orsBaseRoute);

                            switch (orsBaseRoute) {
                                case orsRoutes[0]:
                                    return <Ors_Search />;
                                case orsRoutes[1]:
                                    return (
                                        <TableOfContents
                                            statutesTitle='OREGON REVISED STATUTES'
                                            statuteTitle='Volumes'
                                            statuteItems={volumes}
                                        />
                                    );
                                case orsRoutes[2]:
                                    return (
                                        <TableOfContents
                                            statutesTitle={
                                                'VOLUME ' + titles[0].id
                                            }
                                            statuteTitle='Titles'
                                            statuteItems={titles}
                                        />
                                    );
                                case orsRoutes[3]:
                                    return (
                                        <TableOfContents
                                            statutesTitle={
                                                'TITLE ' + chapters[0].id
                                            }
                                            statuteTitle='Chapters'
                                            statuteItems={chapters}
                                        />
                                    );
                                case orsRoutes[4]:
                                    return (
                                        <TableOfContents
                                            statutesTitle={
                                                'CHAPTER ' +
                                                sections[1].id.split('.')[0]
                                            }
                                            statuteTitle='Sections'
                                            statuteItems={sections}
                                        />
                                    );
                                case orsRoutes[5]:
                                    return (
                                        <div class='lg:grid lg:grid-cols-6'>
                                            <Sidebar
                                                type='left'
                                                items={sidebarFirstItems}
                                            />
                                            <Body
                                                view={view}
                                                currentAppType={currentAppType}
                                                body={body}
                                            />
                                            <Sidebar
                                                type='right'
                                                items={sidebarSecondItems}
                                            />
                                        </div>
                                    );
                            }
                        }
                    }
                })()}
            </main>
            <Footer
                showFacebook={true}
                showTwitter={true}
                showYouTube={true}
                useGoogleMapsIFrame={true}
            />
        </>
    );
}
