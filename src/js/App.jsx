/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Navbar from '@ocdla/global-components/src/components/Navbar';
import Breadcrumbs from '@ocdla/global-components/src/components/Breadcrumbs';
import Sidebar from '@ocdla/global-components/src/components/Sidebar';
import Sidebar_Left_Item from '@ocdla/global-components/src/components/Sidebar_Left_Item';
import Sidebar_Right_Item from '@ocdla/global-components/src/components/Sidebar_Right_Item';
import Body from '@ocdla/global-components/src/components/Body';
import Footer from '@ocdla/global-components/src/components/Footer';
/* eslint-enable */
import Books_Online_Breadcrumbs_Items from '@ocdla/global-components/src/data/books-online/breadcrumbs/items.json';
import Ors_Viewer_Breadcrumbs_Items from '@ocdla/global-components/src/data/ors-viewer/breadcrumbs/items.json';
import Books_Online_Sidebar_Left_Items from '@ocdla/global-components/src/data/books-online/sidebar_left/items.json';
import Ors_Viewer_Sidebar_Left_Items from '@ocdla/global-components/src/data/ors-viewer/sidebar_left/items.json';
import Books_Online_Sidebar_Right_Items from '@ocdla/global-components/src/data/books-online/sidebar_right/items.json';
import Ors_Viewer_Sidebar_Right_Items from '@ocdla/global-components/src/data/ors-viewer/sidebar_right/items.json';

export default function App({ view, appTypeCurrent }) {
    const appTypeIndicators = appTypeCurrent ? '📚' : '🔍';
    const appTypeString = appTypeCurrent ? 'books-online' : 'ors-viewer';

    return (
        <>
            {/* <div class='absolute flex translate-x-[-25%] translate-y-[300%] -rotate-90 gap-2'> */}
            <div class='group absolute right-0 m-4 flex gap-2 lg:left-0 lg:m-2'>
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
                    class='select-none whitespace-pre font-bold'
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
            {/* <div class='container mx-auto border-x border-red-600'> */}
            <div class='container mx-auto border-x'>
                {/* <div class='flex flex-col lg:flex-row'> */}
                <div class='lg:grid lg:grid-cols-6'>
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
            <Footer />
        </>
    );
}
