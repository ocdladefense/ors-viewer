/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Hyperlink from './Hyperlink';
/* eslint-enable */

export default function Navbar() {
    return (
        <nav class='flex items-center lg:h-16 lg:p-0'>
            <menu class='container mx-auto flex flex-col gap-4 border border-t-0 p-4 pt-0 lg:h-16 lg:flex-row lg:items-center lg:gap-0 lg:py-0'>
                <ul class='flex flex-col items-center gap-4 lg:me-auto lg:flex-row lg:gap-0'>
                    <li class='flex items-center font-black text-white'>
                        <Hyperlink
                            type='navbar-brand'
                            href='https://oregon.public.law/'
                            body={
                                <div class='flex items-center'>
                                    <img
                                        class='h-16'
                                        src='https://www.ocdla.org/wp-content/uploads/2019/10/cropped-ocdla-logo.png'
                                    />
                                </div>
                            }
                        />
                    </li>
                    <li>
                        <Hyperlink
                            type='navbar-link'
                            href='https://oregon.public.law/rules'
                            body='Oregon Administrative Rules'
                        />
                    </li>
                    <li class='font-bold'>
                        <Hyperlink
                            type='navbar-link'
                            href='https://oregon.public.law/statutes'
                            body='Oregon Revised Statutes'
                        />
                    </li>
                </ul>
                <hr class='block lg:hidden' />
                <ul class='flex flex-row-reverse items-center gap-2 lg:flex-row'>
                    {/* <li>
                        <search>
                            <input
                                class='w-full px-3 py-2 text-black lg:rounded-lg'
                                type='search'
                                placeholder='Search'
                            />
                        </search>
                    </li> */}
                    <li class='group relative ms-auto lg:m-0'>
                        <button class='peer flex h-[34px] w-[34px] items-center justify-center rounded-full bg-[#516490] p-2 text-white hover:opacity-[67.5%] group-focus-within:opacity-[67.5%]'>
                            G
                        </button>
                        <div class='absolute left-[50%] top-full z-10 mt-[15px] hidden -translate-x-1/2 flex-col text-nowrap shadow group-focus-within:flex'>
                            <Hyperlink
                                type='navbar-dropdown'
                                href='https://oregon.public.law/users/sign_in'
                                body='Login'
                            />
                        </div>
                    </li>
                    <li class='hidden text-neutral-300 lg:block'>|</li>
                    <li>
                        <Hyperlink
                            type='navbar-button-feedback'
                            href='/'
                            body='Give Feedback'
                        />{' '}
                    </li>
                </ul>
            </menu>
        </nav>
    );
}
