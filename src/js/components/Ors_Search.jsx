/** @jsx vNode */
/* eslint-disable-next-line no-unused-vars */
import { vNode } from '@ocdla/view';

export default function Ors_Search() {
    return (
        <div class='flex flex-col items-center gap-8 p-16 text-center lg:p-32'>
            <h3 class='text-5xl font-black tracking-tighter'>
                SEARCH THROUGH THE ORS
            </h3>
            <form
                class='flex w-full justify-center'
                onsubmit={e => {
                    e.preventDefault();

                    window.location.pathname = '/toc';
                }}>
                <input
                    class='w-full rounded-l-md border border-neutral-300 p-4 lg:w-1/2'
                    type='search'
                    placeholder='Search'
                />
                <button class='rounded-r-md border border-black bg-black p-4 font-bold text-white'>
                    GO
                </button>
            </form>
        </div>
    );
}
