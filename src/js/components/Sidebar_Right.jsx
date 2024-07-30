/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import Hyperlink from './Hyperlink';
/* eslint-enable */

export default function Sidebar_Right({ type }) {
    return (
        <aside class='hidden h-[87.5vh] overflow-scroll border-x text-xs lg:block'>
            <ul class='p-4'>
                {type === 'books-online' ? (
                    <abbr
                        class='flex flex-col gap-4'
                        // Blank **title** attribute is required.
                        title=''>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-1.1. Intent of Provision.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-1.2. Punishment and Public Safety.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-1.3. Presumptive Punishments.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-1.4. Basic Guidelines Principles.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-2.1. Intent of Provision.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-3.1. Guidelines Amendments.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='June 2023 Update'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-3.2. OAR 213-001-0000 Notice Rule for Rulemaking.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-3.3. OAR 213-001-0005 Rulemaking Procedure.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-4.1 Intent of Provision.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-4.2. Date of Felony Uncertain.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-4.3. OAR 213-009-0002 Defendants Found Guilty Except for Insanity.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-4.4. Juvenile Defendants.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='June 2023 Update'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-5.1. Intent of Provision.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-6.1. Effect of Guidelines’ Commentary and Staff Advisories.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-7.1. General Attacks.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-7.2. Specific Attacks—Jury Trial Rights.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='June 2023 Update'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-7.3. Specific Attacks—Due Process.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='June 2023 Update'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-7.4. Specific Attacks—Notice of Intent to Prove Enhancement Facts.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='June 2023 Update'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-7.5. Specific Attacks—Right Against Self-Incrimination.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-7.6. Specific Attacks—Double Counting.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-7.7. Specific Attacks—Confrontation.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-7.8. Specific Attacks—Record of Prior Convictions.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='June 2023 Update'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-7.9. Specific Attacks—Separate Criminal Episode Findings.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='June 2023 Update'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-7.10. Ad Hoc Application of Sentencing Schemes.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-7.11. Specific Attacks—Speedy Trial.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-7.12. Specific Attacks—Special State Constitutional Provisions.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='June 2023 Update'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='June 2023 Update'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='§ 1-8.1. Limitations on Money Judgments.'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='June 2023 Update'
                            />
                        </li>
                        <li>
                            <Hyperlink
                                type='standard'
                                href='/'
                                body='June 2023 Update'
                            />
                        </li>
                    </abbr>
                ) : (
                    <div class='flex flex-col gap-4'>
                        <li>
                            <abbr title=''>
                                <Hyperlink
                                    type='standard'
                                    href='/'
                                    body='Current through early 202'
                                />
                            </abbr>
                        </li>
                        <li>
                            § 1.001’s source at{' '}
                            <Hyperlink
                                type='standard'
                                href='https://oregonlegislature.gov/bills_laws/ors/ors001.html'
                                body='oregon​.gov ►'
                            />
                        </li>
                    </div>
                )}
            </ul>
            {/* <div class='hidden h-full flex-col text-nowrap p-4 lg:flex'></div> */}
        </aside>
    );
}
