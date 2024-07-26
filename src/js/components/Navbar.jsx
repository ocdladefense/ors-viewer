/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Hyperlink from './Hyperlink';
/* eslint-enable */

export default function Navbar() {
    return (
        <nav class='flex items-center text-nowrap bg-[#3f3250] p-4 text-white/75 xl:h-16 xl:p-0'>
            <menu class='container mx-auto flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-0'>
                <ul class='flex flex-col gap-4 xl:me-auto xl:flex-row xl:items-center xl:gap-0'>
                    <li class='flex items-center font-black text-white'>
                        <Hyperlink
                            extraClasses='px-2 py-4'
                            href='https://oregon.public.law/'
                            body={
                                <div class='flex items-center gap-2'>
                                    <img
                                        class='size-8'
                                        src='https://oregon.public.law/assets/logo/logo-white-on-transparent-68px-8727330fcdef91e245320acd7eb218bf7c3fc280a9ac48873293e89c65f1557a.png'
                                    />
                                    OregonLaws
                                </div>
                            }
                        />
                    </li>
                    <li>
                        <Hyperlink
                            extraClasses='hover:text-white hover:underline hover:underline-offset-2 px-4 py-8'
                            href='https://oregon.public.law/rules'
                            body='Oregon Administrative Rules'
                        />
                    </li>
                    <li class='font-bold'>
                        <Hyperlink
                            extraClasses='hover:text-white hover:underline hover:underline-offset-2 px-4 py-8'
                            href='https://oregon.public.law/statutes'
                            body='Oregon Revised Statutes'
                        />
                    </li>
                    <li>
                        <Hyperlink
                            extraClasses='hover:text-white hover:underline hover:underline-offset-2 px-4 py-8'
                            href='https://oregon.public.law/rules-of-civil-procedure'
                            body='ORCP'
                        />
                    </li>
                </ul>
                <ul class='flex flex-col gap-4 xl:flex-row xl:items-center xl:gap-0'>
                    <li>
                        <search>
                            <input
                                class='w-full px-3 py-2 text-black xl:rounded-lg'
                                type='search'
                                placeholder='Search'
                            />
                        </search>
                    </li>
                    <li>
                        <Hyperlink
                            extraClasses='hover:text-white hover:underline hover:underline-offset-2 px-4 py-8'
                            href='https://public.law/pricing'
                            body='Remove ads'
                        />
                    </li>
                    <li>
                        <Hyperlink
                            extraClasses='hover:text-white hover:underline hover:underline-offset-2 px-4 py-8'
                            href='https://oregon.public.law/users/sign_in'
                            body='Login'
                        />
                    </li>
                </ul>
            </menu>
        </nav>
    );
}
