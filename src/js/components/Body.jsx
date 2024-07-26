/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Hyperlink from './Hyperlink';
/* eslint-enable */

export default function Body() {
    const styleTabActive =
        'tab-btn rounded-t-md border border-b-transparent p-4';
    const styleTabInactive =
        'tab-btn rounded-t-md border border-transparent border-b-inherit p-4 text-blue-400';
    const toggleTabs = tabBtnClicked => {
        const tabBtns = document.getElementsByClassName('tab-btn');
        const tabBodies = document.getElementsByClassName('tab-body');

        Array.from(tabBtns).forEach(
            tabBtn =>
                (tabBtn.className =
                    tabBtnClicked.target.parentElement === tabBtn
                        ? styleTabActive
                        : styleTabInactive)
        );

        Array.from(tabBodies).forEach(tabBody =>
            tabBtnClicked.target.id.split('-')[2] === tabBody.id.split('-')[2]
                ? tabBody.classList.remove('hidden')
                : tabBody.classList.add('hidden')
        );
    };

    return (
        <main class='flex flex-col gap-4 p-4 xl:col-span-4 xl:col-start-2 xl:me-auto xl:p-8'>
            <div>
                <h1 class='text-4xl font-bold'>ORS 1.001</h1>
                <p class='text-3xl font-thin'>State policy for courts</p>
            </div>
            <div class='flex flex-col gap-4'>
                <ul class='flex'>
                    <li class={styleTabActive}>
                        <button
                            id='tab-btn-1'
                            onclick={toggleTabs}>
                            Text
                        </button>
                    </li>
                    <li class={styleTabInactive}>
                        <button
                            id='tab-btn-2'
                            onclick={toggleTabs}>
                            Annotations
                        </button>
                    </li>
                    <li class='w-full border border-transparent border-b-inherit p-4'>
                        &nbsp;
                    </li>
                </ul>
            </div>
            <p
                id='tab-body-1'
                class='tab-body flex flex-col gap-4'>
                The Legislative Assembly hereby declares that, as a matter of
                statewide concern, it is in the best interests of the people of
                this state that the judicial branch of state government,
                including the appellate, tax and circuit courts, be funded and
                operated at the state level. The Legislative Assembly finds that
                state funding and operation of the judicial branch can provide
                for best statewide allocation of governmental resources
                according to the actual needs of the people and of the judicial
                branch by establishing an accountable, equitably funded and
                uniformly administered system of justice for all the people of
                this state. [1981 s.s. c.3 §1]
                <hr />
                <small>
                    <i>
                        Source: Section 1.001 — State policy for courts,{' '}
                        <Hyperlink
                            href='https://­oregonlegislature.­gov/bills_laws/ors/ors001.­html'
                            body='https://­oregonlegislature.­gov/bills_laws/ors/ors001.­html'
                        />
                    </i>
                </small>
            </p>
            <p
                id='tab-body-2'
                class='tab-body flex flex-col gap-4'>
                <p>Law Review Citations</p>
                <p>50 WLR 291 (2014)</p>
            </p>
        </main>
    );
}
