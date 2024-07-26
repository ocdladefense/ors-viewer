/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Hyperlink from './Hyperlink';
/* eslint-enable */

export default function Sidebar_Right() {
    return (
        <aside class='flex flex-col text-nowrap'>
            <h1 class='border-b-zinc flex gap-8 text-nowrap border-b-4 bg-zinc-100 px-4 py-2'>
                <p>Up to date</p>
                <img
                    class='ms-auto size-6'
                    src='https://oregon.public.law/assets/checked-dark-green-2857f87605b971587a477f5d9beafb3c3a76b47b8a4b5dcecbf01b27418206c1.svg'
                />
            </h1>
            <small class='flex flex-col gap-4 p-4'>
                <abbr title=''>
                    <Hyperlink
                        href='javascript:void(0)'
                        body='Current through early 202'
                    />
                </abbr>
                <p>
                    § 1.001’s source at{' '}
                    <Hyperlink
                        href='https://oregonlegislature.gov/bills_laws/ors/ors001.html'
                        body='oregon​.gov ►'
                    />
                </p>
            </small>
        </aside>
    );
}
