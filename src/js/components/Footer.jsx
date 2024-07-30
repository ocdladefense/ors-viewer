/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Hyperlink from './Hyperlink';
/* eslint-enable */

export default function Footer() {
    return (
        <footer class='container mx-auto flex flex-col gap-4 border border-b-0 p-4 pb-16 lg:flex-row lg:gap-0 lg:p-8 lg:pb-16'>
            <ul class='flex h-max flex-col gap-8 lg:flex-row lg:gap-32'>
                <li>
                    <ul class='flex items-center gap-4'>
                        <li class='flex'>
                            <Hyperlink
                                type='brand'
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
                            <ul class='flex flex-col'>
                                <li>
                                    <ul class='flex gap-2'>
                                        <li>
                                            <Hyperlink
                                                type='footer-social'
                                                href='https://www.facebook.com/OregonCriminalDefenseLawyersAssociation/'
                                                body={
                                                    <img
                                                        class='size-8'
                                                        src='https://www.ocdla.org/wp-content/themes/wireframe/assets/images/default-facebook-icon.png'
                                                    />
                                                }
                                            />
                                        </li>
                                        <li>
                                            <Hyperlink
                                                type='footer-social'
                                                href='https://twitter.com/oregondefense?lang=en'
                                                body={
                                                    <img
                                                        class='size-8'
                                                        src='https://www.ocdla.org/wp-content/themes/wireframe/assets/images/default-twitter-icon.png'
                                                    />
                                                }
                                            />
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    <ul class='text-xs font-thin'>
                        <li>
                            © 2024 Oregon Criminal Defense Lawyers Association
                        </li>
                        <li>
                            Oregon Criminal Defense Lawyers Association is a
                            501(c)(3) nonprofit educational association.
                            Contributions to OCDLA may be tax deductible - check
                            with your tax advisor. Electronic downloads are for
                            the sole use of the purchasing member. Files may not
                            be distributed to others.
                        </li>
                    </ul>
                </li>
                <li class='text-nowrap'>
                    <ul class='flex flex-col gap-2'>
                        <li>
                            <strong>Services</strong>
                        </li>
                        <li>
                            <ul>
                                <li>
                                    <Hyperlink
                                        type='standard'
                                        href='https://pubs.ocdla.org/directory/members'
                                        body='Membership Directory'
                                    />
                                </li>
                                <li>
                                    <Hyperlink
                                        type='standard'
                                        href='https://pubs.ocdla.org/directory/experts'
                                        body='Expert Directory'
                                    />
                                </li>
                                <li>
                                    <Hyperlink
                                        type='standard'
                                        href='/'
                                        body='Online store'
                                    />
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class='text-nowrap'>
                    <ul class='flex flex-col gap-2'>
                        <li>
                            <strong>Research</strong>
                        </li>
                        <li>
                            <ul>
                                <li>
                                    <Hyperlink
                                        type='standard'
                                        href='https://pubs.ocdla.org/car/list'
                                        body='Research Criminal Appellate Review'
                                    />
                                </li>
                                <li>
                                    <Hyperlink
                                        type='standard'
                                        href='https://lod.ocdla.org/'
                                        body='Library of Defense'
                                    />
                                </li>
                                <li>
                                    <Hyperlink
                                        type='standard'
                                        href='https://lod.ocdla.org/Public:Subscriptions'
                                        body='Books Online'
                                    />
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class='text-nowrap'>
                    <ul class='flex flex-col gap-2'>
                        <li>
                            <strong>Resources</strong>
                        </li>
                        <li>
                            <ul>
                                <li>
                                    <Hyperlink
                                        type='standard'
                                        href='/'
                                        body='CLEs'
                                    />
                                </li>
                                <li>
                                    <Hyperlink
                                        type='standard'
                                        href='/'
                                        body='Videos'
                                    />
                                </li>
                                <li>
                                    <Hyperlink
                                        type='standard'
                                        href='/'
                                        body='Seminars & Events'
                                    />
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </footer>
    );
}
