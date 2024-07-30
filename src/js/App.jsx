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

// const React = (function () {
//     let hooks = [];
//     let idx = 0;
//     let root = null;

//     function useState(initialValue) {
//         const state = hooks[idx] || initialValue;

//         const _idx = idx;
//         const setState = newVal => {
//             hooks[_idx] = newVal;
//         };

//         idx++;

//         return [state, setState];
//     }

//     function useEffect(cb, deps) {
//         let oldDeps = hooks[idx];
//         let hasChanged = true;

//         if (oldDeps) {
//             hasChanged = deps.some((dep, i) => !Object.is(dep, oldDeps[i]));
//         }

//         if (hasChanged) cb();
//         hooks[idx] = deps;
//         idx++;
//     }

//     function workLoop() {
//         idx = 0;
//         root.update(<MyComponent />);
//         setTimeout(workLoop, 300);
//     }

//     let renderIndex = 0;

//     function render(Component, selector, oldHooks) {
//         oldHooks = oldHooks || [];
//         console.log(oldHooks, hooks);
//         let vNode = Component();
//         let hasChanged = hooks.some((dep, i) => !Object.is(dep, oldHooks[i]));
//         idx = 0;
//         // let root = document.querySelector(selector);

//         if (renderIndex === 0) {
//             root = View.createRoot(selector);
//         }
//         // root.innerHTML = "";
//         // const c = Component();
//         // c.render();

//         // let node = View.createElement(vNode);
//         // root.appendChild(node);
//         if (renderIndex === 0) {
//             root.render(vNode);
//         } else if (renderIndex > 0 && hasChanged) {
//             root.update(vNode);
//         }

//         renderIndex++;
//         oldHooks = hooks;
//         // return c;
//         setTimeout(() => render(Component, selector, oldHooks), 750);
//     }

//     return { useState, useEffect, vNode, render };
// })();

export default function App() {
    // const [bool, setBool] = React.useState(1);
    let typeBool = true;
    // let appType = process.env.APP_TYPE || 'books-online';
    let appType = typeBool ? 'books-online' : 'ors-viewer';

    return (
        <>
            {/* <div class='absolute left-5 top-5'>
                <input
                    type='checkbox'
                    checked={typeBool}
                    onclick={() => {
                        typeBool = !typeBool;
                        console.log(typeBool);
                    }}
                />
                <p>Toggle {appType}</p>
            </div> */}
            <header class='flex flex-col lg:h-32'>
                <Navbar />
                <Breadcrumbs type={appType} />
            </header>
            <div class='container mx-auto'>
                {/* <div class='flex flex-col lg:flex-row'> */}
                <div class='lg:grid lg:grid-cols-6'>
                    <Sidebar_Left type={appType} />
                    <Body type={appType} />
                    <Sidebar_Right type={appType} />
                </div>
            </div>
            <Footer />
        </>
    );
}
