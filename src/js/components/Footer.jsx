/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Hyperlink from './Hyperlink';
/* eslint-enable */

export default function Footer() {
    return (
        <footer class='container mx-auto w-full p-4 pb-20'>
            <hr />
            <ul class='mt-4 flex flex-col gap-8 xl:flex-row'>
                <li>
                    <ul class='flex flex-col gap-8'>
                        <li class='flex flex-col gap-2'>
                            <strong>Stay Connected</strong>
                            <p>
                                Join thousands of people who receive monthly
                                site updates.
                            </p>
                        </li>
                        <li>
                            <Hyperlink
                                extraClasses='bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md'
                                href='http://eepurl.com/dqx2dj'
                                body='Subscribe'
                            />
                        </li>
                        <li>
                            <ul class='flex gap-2'>
                                <li>
                                    <Hyperlink
                                        extraClasses='opacity-50 hover:opacity-60'
                                        href='https://instagram.com/law.is.code/'
                                        body={
                                            <img
                                                class='size-12'
                                                src='https://oregon.public.law/assets/social/instagram-logo-840401f66d7e41fb9696f8e077c49b550e669a1a613e2612a7ba18aa2c53776d.svg'
                                            />
                                        }
                                    />
                                </li>
                                <li>
                                    <Hyperlink
                                        extraClasses='opacity-50 hover:opacity-60'
                                        href='https://facebook.com/PublicDotLaw'
                                        body={
                                            <img
                                                class='size-12'
                                                src='https://oregon.public.law/assets/social/facebook-logo-button-a44d2115afa1417c74235fd98657a42b6602af1b47332364fa6627a80e5a61ff.svg'
                                            />
                                        }
                                    />
                                </li>
                                <li>
                                    <Hyperlink
                                        extraClasses='opacity-50 hover:opacity-60'
                                        href='https://twitter.com/law_is_code'
                                        body={
                                            <img
                                                class='size-12'
                                                src='https://oregon.public.law/assets/social/twitter-logo-button-39f7c16ed398ca50006cd9a20dc33da44f7110bc26dbe7ec8980cbd9fc44cdc6.svg'
                                            />
                                        }
                                    />
                                </li>
                                <li>
                                    <Hyperlink
                                        extraClasses='opacity-50 hover:opacity-60'
                                        href='https://github.com/public-law/'
                                        body={
                                            <img
                                                class='size-12'
                                                src='https://oregon.public.law/assets/social/github-logo-b4302181192a1d29bb4b020699926827cea1717d423541ad0ec8b318cda6ff97.svg'
                                            />
                                        }
                                    />
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li>
                    <ul class='flex flex-col gap-7'>
                        <li class='flex flex-col gap-2'>
                            <strong>Get Legal Help</strong>
                            <p>
                                The{' '}
                                <Hyperlink
                                    href='https://osbar.org/index.html'
                                    body='Oregon State Bar ►'
                                />{' '}
                                runs a service for finding an attorney in good
                                standing. Initial consultations are usually free
                                or discounted:{' '}
                                <Hyperlink
                                    href='https://osbar.org/public/ris/'
                                    body='Lawyer Referral Service ►'
                                />
                            </p>
                        </li>
                        <li class='flex flex-col gap-2'>
                            <strong>Committed to Public Service</strong>
                            <p>
                                We will always provide free access to the
                                current law. In addition,{' '}
                                <Hyperlink
                                    href='https://blog.public.law/2018/04/06/automatic-upgrade-for-non-profit-educational-and-govt-users/'
                                    body='we provide special ►'
                                />{' '}
                                support for non-profit, educational, and
                                government users. Through social
                                entre­pre­neurship, we’re lowering the cost of
                                legal services and increasing citizen access.
                            </p>
                        </li>
                    </ul>
                </li>
                <li class='text-nowrap'>
                    <ul class='flex flex-col gap-2'>
                        <li>
                            <strong>Navigate</strong>
                        </li>
                        <li>
                            <ul>
                                <li>
                                    <Hyperlink
                                        href='https://public.law/legal-help-services'
                                        body='Find a Lawyer'
                                    />
                                </li>
                                <li>
                                    <Hyperlink
                                        href='https://blog.public.law/'
                                        body='Blog'
                                    />
                                </li>
                                <li>
                                    <Hyperlink
                                        href='https://public.law/about-us'
                                        body='About Us'
                                    />
                                </li>
                                <li>
                                    <Hyperlink
                                        href='https://public.law/contact-us'
                                        body='Contact Us'
                                    />
                                </li>
                                <li>
                                    <Hyperlink
                                        href='https://public.law/blog'
                                        body='Reports'
                                    />
                                </li>
                                <li>
                                    <Hyperlink
                                        href='https://public.law/sources'
                                        body='Secondary Sources'
                                    />
                                </li>
                            </ul>
                        </li>
                    </ul>
                </li>
                <li class='text-nowrap'>
                    <ul class='flex flex-col gap-2'>
                        <li class='flex whitespace-pre'>
                            <strong>California: </strong>
                            <Hyperlink
                                href='https://california.public.law/codes'
                                body='Codes'
                            />
                        </li>
                        <li class='flex whitespace-pre'>
                            <strong>Colorado: </strong>
                            <Hyperlink
                                href='https://colorado.public.law/statutes'
                                body='C.R.S.'
                            />
                        </li>
                        <li class='flex whitespace-pre'>
                            <strong>Nevada: </strong>
                            <Hyperlink
                                href='https://nevada.public.law/statutes'
                                body='NRS'
                            />
                        </li>
                        <li class='flex whitespace-pre'>
                            <strong>New York: </strong>
                            <Hyperlink
                                href='https://newyork.public.law/laws'
                                body='Laws'
                            />
                        </li>
                        <li class='flex whitespace-pre'>
                            <strong>Oregon: </strong>
                            <Hyperlink
                                href='https://oregon.public.law/rules'
                                body='OAR'
                            />
                            ,{' '}
                            <Hyperlink
                                href='https://oregon.public.law/statutes'
                                body='ORS'
                            />
                        </li>
                        <li class='flex whitespace-pre'>
                            <strong>Texas: </strong>
                            <Hyperlink
                                href='https://texas.public.law/statutes'
                                body='Statues'
                            />
                        </li>
                        <li class='flex whitespace-pre'>
                            <strong>World: </strong>
                            <Hyperlink
                                href='https://public.law/world/rome_statute'
                                body='Rome Statute'
                            />
                            ,{' '}
                            <Hyperlink
                                href='https://public.law/dictionary'
                                body='International Dictionary'
                            />
                        </li>
                    </ul>
                </li>
            </ul>
        </footer>
    );
}
