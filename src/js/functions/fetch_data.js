import Url from '@ocdla/lib-http/Url';
import HttpClient from '@ocdla/lib-http/HttpClient';
import OrsChapter from '@ocdla/ors/src/OrsChapter';
// import Outline from '@ocdla/ors/src/Outline';

export const fetch_breadcrumbs_ors_viewer = async (
    currentVolume,
    currentTitle,
    currentChapter,
    currentSection
) => {
    return [
        {
            type: 'standard',
            href: 'https://oregon.public.law/statutes',
            body: 'ORS'
        },
        {
            type: 'standard',
            href:
                'https://oregon.public.law/statutes/ors_volume_' +
                currentVolume,
            body: 'Vol. ' + currentVolume
        },
        {
            type: 'standard',
            href:
                'https://oregon.public.law/statutes/ors_title_' + currentTitle,
            body: 'Title ' + currentTitle
        },
        {
            type: 'standard',
            href:
                'https://oregon.public.law/statutes/ors_chapter_' +
                currentChapter,
            body:
                'Chap. ' +
                currentChapter +
                '. Courts & Judicial Officers Generally'
        },
        {
            type: 'standard',
            href: 'https://oregon.public.law/statutes/ors_' + currentSection,
            body: '§ ' + currentSection
        }
    ];
};

export const fetch_sidebar_left_ors_viewer = async currentChapter => {
    const url = new Url('https://appdev.ocdla.org/books-online/index.php');

    // url.buildQuery('chapter', '1');
    // url.buildQuery('chapter', '2');
    url.buildQuery('chapter', currentChapter.toString());

    const req = new Request(url.toString());
    const client = new HttpClient();
    const resp = await client.send(req);
    const msword = await OrsChapter.fromResponse(resp);

    msword.chapterNum = currentChapter;

    console.log(msword);

    const xml = OrsChapter.toStructuredChapter(msword);
    const jsonArray = xml.sectionTitles.map((body, i) => {
        const chapterString =
            xml.chapterNum + '.' + i.toString().padStart(3, '0');

        return {
            active: i === currentChapter ? true : undefined,
            href: 'https://oregon.public.law/statutes/ors_' + chapterString,
            heading: chapterString,
            body: body
        };
    });

    return jsonArray;
};

export const fetch_sidebar_right_ors_viewer = async currentChapter => {
    return [
        {
            type: 'sidebar_right',
            href: '/',
            body: 'Current through early 2024'
        },
        {
            type: 'sidebar_right',
            href:
                'https://oregonlegislature.gov/bills_laws/ors/ors' +
                currentChapter.toString().padStart(3, '0') +
                '.html',
            body: '§ ' + currentChapter + '.001’s source a oregon​.gov'
        }
    ];
};

/*
    Inspect the available properties for use in building section outline (left nav) and content.
    section outline (left nav) is listed in sectionTitles property.
    xml.doc contains the entire document.
    xml.toString() will return the entire document as an HTML string for use with innerHTML.
*/

// return Ors_Viewer_Sidebar_Left_Items.map((item, i) => ({
//     active: item.active,
//     href: item.href,
//     // heading: item.heading,
//     heading: i,
//     body: xml.sectionTitles.filter(title => title !== null)[i]
// }));

// console.log(xml.sectionTitles.filter(title => title !== null).length);

// console.log(xml);
// console.log(xml.doc);

// for (let x in xml.sectionTitles) {
//     console.log(x);
// }

// xml.sectionTitles.forEach(e => console.log(e));

// console.log(Ors_Viewer_Sidebar_Left_Items.length);

// let html = xml.toString();

// console.log(html);

// const ref = document.getElementById('ref');

// ref.innerHTML = html;
