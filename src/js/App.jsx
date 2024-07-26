/** @jsx vNode */ /** @jsxFrag "Fragment" */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Navbar from './components/Navbar';
import Breadcrumbs from './components/Breadcrumbs';
import Sidebar_Left from './components/Sidebar_Left';
import Body from './components/Body';
import Sidebar_Right from './components/Sidebar_Right';
import Footer from './components/Footer';
/* eslint-enable */

export default function App() {
    return (
        <>
            <header class='flex flex-col xl:h-32'>
                <Navbar />
                <Breadcrumbs />
            </header>
            <div class='container mx-auto'>
                {/* <div class='flex flex-col xl:flex-row'> */}
                <div class='xl:grid xl:grid-cols-6'>
                    <Sidebar_Left />
                    <Body />
                    <Sidebar_Right />
                </div>
            </div>
            <Footer />
        </>
    );
}
