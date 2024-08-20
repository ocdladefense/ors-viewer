import HttpClient from '@ocdla/lib-http/HttpClient';

// import Outline from '@ocdla/ors/src/Outline';
import Items_Breadcrumbs_Books_Online from '../../../data/json/books_online/breadcrumbs/items.json';

import Items_Sidebar_Left_Books_Online from '../../../data/json/books_online/sidebar_left/items.json';

import Items_Sidebar_Right_Books_Online from '../../../data/json/books_online/sidebar_right/items.json';

export const getBreadcrumbs = async () => {
    switch (USE_MOCK) {
        // Development
        case true:
            return Items_Breadcrumbs_Books_Online;
        // Production
        default:
            const baseUrl = '/';

            return [
                {
                    href: baseUrl,
                    label: 'Books Online'
                },
                {
                    href: baseUrl,
                    label: 'Felony Sentencing in Oregon'
                }
            ];
    }
};

export const getSidebarFirstItems = async () => {
    switch (USE_MOCK) {
        // Development
        case true:
            return Items_Sidebar_Left_Books_Online;
        // Production
        default:
            const client = new HttpClient();
            const req = new Request('../../data/xml/books_online/books.xml');
            // const req = new Request(
            //     'https://raw.githubusercontent.com/ocdladefense/books-online/table-of-contents/src/js/mock/mock-data/books.xml'
            // );
            const resp = await client.send(req);
            const xml = await resp.text();
            const parser = new DOMParser();
            const parsedXML = parser.parseFromString(xml, 'application/xml');
            const xmlParts = parsedXML.getElementsByTagName('part');
            const xmlChapters = parsedXML.getElementsByTagName('chapter');
            const xmlAppendixes = parsedXML.getElementsByTagName('appendix');
            let jsonArray = [];
            const baseUrl = 'https://pubs.ocdla.org/fsm/';

            Array.from(xmlParts).forEach(part => {
                const partLabel = part.getAttribute('label');
                const partHref =
                    baseUrl + partLabel.toLowerCase().replace(/\s+/g, '-');

                jsonArray.push({
                    href: partHref,
                    heading: partLabel,
                    label: ''
                });
            });

            Array.from(xmlChapters).forEach(chapter => {
                const chapterLabel = chapter.getAttribute('label');
                const chapterHref = baseUrl + chapterLabel.split(' ')[1];
                const chapterName = chapter.getAttribute('name');

                jsonArray.push({
                    href: chapterHref,
                    heading: chapterLabel,
                    label: chapterName
                });
            });

            Array.from(xmlAppendixes).forEach(appendix => {
                const appendixLabel = appendix.getAttribute('label');
                const appendixHref =
                    baseUrl +
                    'appendix-' +
                    appendixLabel.split(' ')[1].toLowerCase();

                jsonArray.push({
                    href: appendixHref,
                    heading: appendixLabel,
                    label: ''
                });
            });

            return jsonArray;
    }
};

export const getSidebarSecondItems = async () => {
    switch (USE_MOCK) {
        // Development
        case true:
            return Items_Sidebar_Right_Books_Online;
        /*
            Production

            WIP for dynamic fetching.
        */
        default:
            const baseUrl = '/';

            return [
                {
                    href: baseUrl,
                    label: '§ 1-1.1. Intent of Provision.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-1.2. Punishment and Public Safety.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-1.3. Presumptive Punishments.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-1.4. Basic Guidelines Principles.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-2.1. Intent of Provision.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-3.1. Guidelines Amendments.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-3.2. OAR 213-001-0000 Notice Rule for Rulemaking.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-3.3. OAR 213-001-0005 Rulemaking Procedure.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-4.1 Intent of Provision.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-4.2. Date of Felony Uncertain.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-4.3. OAR 213-009-0002 Defendants Found Guilty Except for Insanity.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-4.4. Juvenile Defendants.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-5.1. Intent of Provision.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-6.1. Effect of Guidelines’ Commentary and Staff Advisories.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.1. General Attacks.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.2. Specific Attacks—Jury Trial Rights.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.3. Specific Attacks—Due Process.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.4. Specific Attacks—Notice of Intent to Prove Enhancement Facts.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.5. Specific Attacks—Right Against Self-Incrimination.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.6. Specific Attacks—Double Counting.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.7. Specific Attacks—Confrontation.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.8. Specific Attacks—Record of Prior Convictions.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.9. Specific Attacks—Separate Criminal Episode Findings.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.10. Ad Hoc Application of Sentencing Schemes.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.11. Specific Attacks—Speedy Trial.'
                },
                {
                    href: baseUrl,
                    label: '§ 1-7.12. Specific Attacks—Special State Constitutional Provisions.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: '§ 1-8.1. Limitations on Money Judgments.'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                },
                {
                    href: baseUrl,
                    label: 'June 2023 Update'
                }
            ];
    }
};
