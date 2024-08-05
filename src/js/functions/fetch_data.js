import Ors_Viewer_Sidebar_Left_Items from '../../data/ors-viewer/sidebar_left/items.json';
import OrsChapter from '@ocdla/ors/src/OrsChapter';
import HttpClient from '@ocdla/lib-http/HttpClient';
import Url from '@ocdla/lib-http/Url';

export const fetch_sidebar_left_ors_viewer = async () => {
    let url = new Url('https://appdev.ocdla.org/books-online/index.php');

    url.buildQuery('chapter', '1');

    let req = new Request(url.toString());
    let client = new HttpClient();
    let resp = await client.send(req);
    let msword = await OrsChapter.fromResponse(resp);

    msword.chapterNum = 2;

    let xml = OrsChapter.toStructuredChapter(msword);

    return Ors_Viewer_Sidebar_Left_Items.map((item, i) => ({
        active: item.active,
        href: item.href,
        heading: item.heading,
        body: xml.sectionTitles[i]
    }));
};

/*
    Inspect the available properties for use in building section outline (left nav) and content.
    section outline (left nav) is listed in sectionTitles property.
    xml.doc contains the entire document.
    xml.toString() will return the entire document as an HTML string for use with innerHTML.
*/

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
