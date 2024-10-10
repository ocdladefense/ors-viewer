/** @jsx vNode */
/* eslint-disable no-unused-vars */
import { vNode } from '@ocdla/view';
import GloabalSearch from '@ocdla/global-components/src/Search';
import HttpClient from '@ocdla/lib-http/HttpClient';
import Url from '@ocdla/lib-http/Url';
/* eslint-enable */

export default function Search() {
    return (
        <div class='flex flex-col items-center gap-8 p-4 text-center lg:p-32'>
            <h3 class='text-5xl font-black tracking-tighter'>
                SEARCH THROUGH THE ORS
            </h3>
            <form
                class='flex h-12 w-full justify-center rounded-md bg-red-600 lg:w-2/3'
                onsubmit={async e => {
                    e.preventDefault();
                    let data = new FormData(e.target);
                    let reference = data.get("reference");
                    let client = new HttpClient();
                    let url = new Url("https://api.ocdla.org/search");
                    url.addParam("reference", reference);
                    let req = new Request(url.toString());

                    let resp = await client.send(req);
                    let matrix = await resp.json();
                    console.log(matrix);


                    let chapter = matrix.shift();
                    let id = "section-"+ matrix.join("-");
                    let redirect = "/chapter/"+chapter+"#"+id;
                    // return false;
                    window.location.href = redirect;
                }}>
                <ul class='flex size-full rounded-md bg-blue-600'>
                    <GloabalSearch placeholder='Search' />
                </ul>
            </form>
        </div>
    );
}
