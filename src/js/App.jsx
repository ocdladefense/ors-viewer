/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Navbar from '@ocdla/global-components/src/Navbar';
import Breadcrumbs from '@ocdla/global-components/src/Breadcrumbs';
import Sidebar from '@ocdla/global-components/src/Sidebar';
import Sidebar_Left_Item from '@ocdla/global-components/src/Sidebar_Left_Item';
import Sidebar_Right_Item from '@ocdla/global-components/src/Sidebar_Right_Item';
import Body from '@ocdla/global-components/src/Body';
import Footer from '@ocdla/global-components/src/Footer';
/* eslint-enable */
import Books_Online_Breadcrumbs_Items from '../data/books-online/breadcrumbs/items.json';
import Ors_Viewer_Breadcrumbs_Items from '../data/ors-viewer/breadcrumbs/items.json';
import Books_Online_Sidebar_Left_Items from '../data/books-online/sidebar_left/items.json';
import Ors_Viewer_Sidebar_Left_Items from '../data/ors-viewer/sidebar_left/items.json';
import Books_Online_Sidebar_Right_Items from '../data/books-online/sidebar_right/items.json';
import Ors_Viewer_Sidebar_Right_Items from '../data/ors-viewer/sidebar_right/items.json';

import { fetch_sidebar_left_ors_viewer } from './functions/fetch_data';

export default async function App({ view, appTypeCurrent }) {
    const appTypeIndicators = appTypeCurrent ? '📚' : '🔍';
    const appTypeString = appTypeCurrent ? 'books-online' : 'ors-viewer';

    // Test 1
    // console.log(fetch_sidebar_left_ors_viewer());

    // Test 2
    // const abc = async () => await fetch_sidebar_left_ors_viewer();
    // console.log(abc);

    // Test 3
    const abc = await fetch_sidebar_left_ors_viewer();
    console.log(abc);

    return (
        <>
            {/* <div class='absolute right-0 flex w-max translate-x-[28.75%] translate-y-[100%] -rotate-90 gap-2 bg-white p-4 lg:left-0 lg:translate-x-[-25%] lg:translate-y-[200%] lg:p-2'> */}
            <div class='absolute right-0 flex w-max gap-2 bg-white p-4 lg:left-0 lg:p-2'>
                {/* <input
                    id='testToggle'
                    type='checkbox'
                    checked={appTypeCurrent}
                    onchange={() => {
                        appTypeCurrent = !appTypeCurrent;

                        view.update(
                            <App
                                view={view}
                                appTypeCurrent={appTypeCurrent}
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
                        appTypeCurrent = !appTypeCurrent;

                        view.render(
                            <App
                                view={view}
                                appTypeCurrent={appTypeCurrent}
                            />
                        );
                    }}>
                    {appTypeIndicators} | {appTypeString}
                </button>
            </div>
            <header class='flex flex-col lg:h-32'>
                <Navbar />
                <Breadcrumbs
                    items={
                        appTypeCurrent === true
                            ? Books_Online_Breadcrumbs_Items
                            : appTypeCurrent === false
                              ? Ors_Viewer_Breadcrumbs_Items
                              : []
                    }
                />
            </header>
            <div class='container mx-auto border-x'>
                {/* <div class='flex flex-col lg:flex-row'> */}
                <div class='lg:grid lg:grid-cols-6'>
                    {/* ? Ors_Viewer_Sidebar_Left_Items */}
                    <Sidebar
                        component={Sidebar_Left_Item}
                        items={
                            appTypeCurrent === true
                                ? Books_Online_Sidebar_Left_Items
                                : appTypeCurrent === false
                                  ? Ors_Viewer_Sidebar_Left_Items
                                  : []
                        }
                    />
                    <Body type={appTypeString} />
                    <Sidebar
                        component={Sidebar_Right_Item}
                        items={
                            appTypeCurrent === true
                                ? Books_Online_Sidebar_Right_Items
                                : appTypeCurrent === false
                                  ? Ors_Viewer_Sidebar_Right_Items
                                  : []
                        }
                    />
                </div>
            </div>
            <Footer
                showFacebook={true}
                showTwitter={true}
                useIFrame={true}
            />
        </>
    );
}
