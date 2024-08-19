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
import Ors_Section_Link from './components/Ors_Section_Link';
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
    items_statutes_volumes,
    items_statutes_volume_titles,
    items_statutes_title_chapters,
    items_statutes_chapter_sections,
    items_breadcrumbs_books_online,
    items_breadcrumbs_ors_viewer,
    items_sidebar_left_books_online,
    items_sidebar_left_ors_viewer,
    html_body_ors_viewer,
    items_sidebar_right_books_online,
    items_sidebar_right_ors_viewer
}) {
    const appTypeIndicators = currentAppType ? '📚' : '🔍';
    const appTypeString = currentAppType ? 'books_online' : 'ors_viewer';

    // console.log(items_statutes_volumes);

    return (
        <>
            <div
                // prettier-ignore
                class={`${headerPinned === 'pinned' ? 'fixed ' : 'absolute '}right-0 z-10 flex flex-col text-right lg:text-start w-max gap-2 bg-white p-4 lg:left-0 lg:p-2`}>
                {/* <input
                    id='testToggle'
                    type='checkbox'
                    checked={currentAppType}
                    onchange={() => {
                        currentAppType = !currentAppType;

                        view.update(
                            <App
                                view={view}
                                currentAppType={currentAppType}
                            />
                        );
                    }}
                />
                <label
                    class='select-none whitespace-pre font-bold'
                    for='testToggle'>
                    {appTypeString}
                </label> */}
                <button
                    class='select-none font-bold'
                    onclick={() => {
                        currentAppType = !currentAppType;

                        view.render(
                            <App
                                view={view}
                                currentAppType={currentAppType}
                                headerPinned={headerPinned}
                                error={error}
                                currentVolume={currentVolume}
                                currentTitle={currentTitle}
                                currentChapter={currentChapter}
                                currentSection={currentSection}
                                items_statutes_volumes={items_statutes_volumes}
                                items_statutes_volume_titles={
                                    items_statutes_volume_titles
                                }
                                items_statutes_title_chapters={
                                    items_statutes_title_chapters
                                }
                                items_statutes_chapter_sections={
                                    items_statutes_chapter_sections
                                }
                                items_breadcrumbs_books_online={
                                    items_breadcrumbs_books_online
                                }
                                items_breadcrumbs_ors_viewer={
                                    items_breadcrumbs_ors_viewer
                                }
                                items_sidebar_left_ors_viewer={
                                    items_sidebar_left_ors_viewer
                                }
                                items_sidebar_left_books_online={
                                    items_sidebar_left_books_online
                                }
                                html_body_ors_viewer={html_body_ors_viewer}
                                items_sidebar_right_books_online={
                                    items_sidebar_right_books_online
                                }
                                items_sidebar_right_ors_viewer={
                                    items_sidebar_right_ors_viewer
                                }
                            />
                        );
                    }}>
                    {appTypeIndicators} | {appTypeString}
                </button>
                {!currentAppType ? (
                    <>
                        <Link
                            href='/'
                            label='HOME'
                        />
                        <Link
                            href='/statutes'
                            label='STATUTES'
                        />
                        <Link
                            href='/statutes/ors_volume_1'
                            label='VOLUME 1'
                        />
                        <Link
                            href='/statutes/ors_title_1'
                            label='TITLE 1'
                        />
                        <Link
                            href='/statutes/ors_chapter_1'
                            label='CHAPTER 1'
                        />
                    </>
                ) : (
                    <></>
                )}
            </div>
            <header
                // prettier-ignore
                class={`${headerPinned === 'pinned' ? 'sticky top-0 ' : ''}container mx-auto flex w-full flex-col bg-white lg:h-32`}>
                <Navbar />
                <Breadcrumbs
                    items={
                        currentAppType
                            ? items_breadcrumbs_books_online
                            : items_breadcrumbs_ors_viewer
                    }
                />
            </header>
            {/* <Main cols='3' /> */}
            <main
                id='body'
                class='container mx-auto border-x'>
                {(() => {
                    switch (error) {
                        case true:
                            return <Not_Found />;
                        default:
                            const route = window.location.pathname;

                            switch (currentAppType) {
                                // Books Online
                                case true:
                                    return (
                                        <div class='lg:grid lg:grid-cols-6'>
                                            <Sidebar>
                                                {currentAppType
                                                    ? items_sidebar_left_books_online.map(
                                                          item => (
                                                              <Ors_Section_Link
                                                                  {...item}
                                                              />
                                                          )
                                                      )
                                                    : items_sidebar_left_ors_viewer.map(
                                                          item => (
                                                              <Ors_Section_Link
                                                                  {...item}
                                                              />
                                                          )
                                                      )}
                                            </Sidebar>
                                            <Body
                                                view={view}
                                                type={appTypeString}
                                                html_body_ors_viewer={
                                                    html_body_ors_viewer
                                                }
                                            />
                                            <Sidebar>
                                                {currentAppType
                                                    ? items_sidebar_right_books_online.map(
                                                          item => (
                                                              <Sidebar_Item
                                                                  {...item}
                                                              />
                                                          )
                                                      )
                                                    : items_sidebar_right_ors_viewer.map(
                                                          item => (
                                                              <Sidebar_Item
                                                                  {...item}
                                                              />
                                                          )
                                                      )}
                                            </Sidebar>
                                        </div>
                                    );
                                // ORS Viewer
                                case false:
                                    switch (route) {
                                        // Home.
                                        case '/':
                                            return <Ors_Search />;
                                        // All volumes.
                                        case '/statutes':
                                            return (
                                                <Statutes
                                                    statutesTitle='OREGON REVISED STATUTES'
                                                    statuteTitle='Volumes'
                                                    statuteItems={
                                                        items_statutes_volumes
                                                    }
                                                />
                                            );
                                        // All titles of a volume.
                                        default:
                                            // Route example: localhost/statutes/ors_volume_1
                                            const matchVolumeCheck =
                                                route.match(
                                                    /^\/statutes\/ors_volume_(\d+)$/
                                                );
                                            // Route example: localhost/statutes/ors_title_1
                                            const matchTitleCheck = route.match(
                                                /^\/statutes\/ors_title_(\d+)$/
                                            );
                                            // Route example: localhost/statutes/ors_chapter_1
                                            const matchChapterCheck =
                                                route.match(
                                                    /^\/statutes\/ors_chapter_(\d+)$/
                                                );

                                            if (matchVolumeCheck) {
                                                const matchVolumeId =
                                                    matchVolumeCheck[1];

                                                return (
                                                    <Statutes
                                                        statutesTitle={
                                                            'VOLUME ' +
                                                            matchVolumeId
                                                        }
                                                        statuteTitle='Titles'
                                                        statuteItems={
                                                            items_statutes_volume_titles
                                                        }
                                                    />
                                                );
                                            } else if (matchTitleCheck) {
                                                const matchTitleId =
                                                    matchTitleCheck[1];

                                                return (
                                                    <Statutes
                                                        statutesTitle={
                                                            'TITLE ' +
                                                            matchTitleId
                                                        }
                                                        statuteTitle='Chapters'
                                                        statuteItems={
                                                            items_statutes_title_chapters
                                                        }
                                                    />
                                                );
                                            } else if (matchChapterCheck) {
                                                const matchChapterId =
                                                    matchChapterCheck[1];

                                                return (
                                                    <Statutes
                                                        statutesTitle={
                                                            'CHAPTER ' +
                                                            matchChapterId
                                                        }
                                                        statuteTitle='Sections'
                                                        statuteItems={
                                                            items_statutes_chapter_sections
                                                        }
                                                    />
                                                );
                                            }
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
