/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Link from '@ocdla/global-components/src/Defaults';
import Navbar from '@ocdla/global-components/src/Navbar';
import Breadcrumbs from '@ocdla/global-components/src/Breadcrumbs';
import Not_Found from '@ocdla/global-components/src/Not_Found';
import Ors_Search from './components/Ors_Search';
import Statutes from './components/Statutes';
import Statute from './components/Statute';
import Statute_Item from './components/Statute_Item';
import Sidebar from '@ocdla/global-components/src/Sidebar';

import Sidebar_Item from '@ocdla/global-components/src/Sidebar_Item';
import Body from '@ocdla/global-components/src/Body';
import Footer from '@ocdla/global-components/src/Footer';
/* eslint-enable */

export default function App({
    view,
    currentAppType,
    headerPinned,
    error,
    currentVolume,
    currentTitle,
    currentChapter,
    currentSection,
    volumes,
    items_statutes_volume_titles,
    items_statutes_title_chapters,
    items_statutes_chapter_sections,
    breadcrumbs,
    html_body_ors_viewer,
    sidebarFirstItems,
    sidebarSecondItems
}) {
    const appTypeIndicators = currentAppType === 'bon' ? '📚' : '🔍';
    const appTypeString =
        currentAppType === 'bon' ? 'books_online' : 'ors_viewer';

    // console.log(items_statutes_volumes);
    // There is a component that can be used to render a nice 404 error.
    //  return <Not_Found />;
    return (
        <>
            <header
                // prettier-ignore
                class={`${headerPinned === 'pinned' ? 'sticky top-0 ' : ''}container mx-auto flex w-full flex-col bg-white lg:h-32`}>
                <Navbar />
                <Breadcrumbs crumbs={breadcrumbs} />
            </header>
            {/* <Main cols='3' /> */}
            <main
                id='body'
                class='container mx-auto border-x'>
                {(() => {
                    switch (currentAppType) {
                        // ORS Viewer
                        case 'ors':
                            return (
                                <div class='lg:grid lg:grid-cols-1'>
                                    <Statutes
                                        statutesTitle='OREGON REVISED STATUTES'
                                        statuteTitle='Volumes'
                                        statuteItems={volumes}
                                    />
                                </div>
                            );

                        // Books Online
                        default:
                            return (
                                <div class='lg:grid lg:grid-cols-6'>
                                    <Sidebar items={sidebarFirstItems} />
                                    <Body
                                        view={view}
                                        type={appTypeString}
                                        html_body_ors_viewer={
                                            html_body_ors_viewer
                                        }
                                    />
                                    <Sidebar items={sidebarSecondItems} />
                                </div>
                            );
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
