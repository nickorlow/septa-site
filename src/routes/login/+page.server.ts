import type {Trip, TripResponse, Key, User, JWTData, Error} from '../../types';
import { SECRET_COOKIE } from '$env/static/private';
/** @type {import('./$types').Actions} */


const dateTimeReviver = function (key: string, value: any): Date | any {
    if (key === "entry_time" || key === "exit_time" || key === "lost_stolen_date" || key === "purchase_date" || key == "balance_protection_date") {
        return new Date(value);
    }
    return value;
}

export const actions = {
    getToken: async ({ cookies, request }) => {
        const data = await request.formData();
        const uname = data.get('username');
        const pass = data.get('password');

        let user: User;
        let keys: Key[] = [];
        let trips: Trip[] = [];

        {
            let basicAuthToken = btoa(`${uname}:${pass}`);
            let myHeaders = new Headers();
            myHeaders.append("content-type", "application/json");
            myHeaders.append("x-api-source", "WCI9Exs");
            myHeaders.append("x-authorization", `X-Basic ${basicAuthToken}`);
            myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/110.0");
            myHeaders.append("Accept", "*/*");
            myHeaders.append("Accept-Language", "en-US,en;q=0.5");
            myHeaders.append("Accept-Encoding", "gzip, deflate, br");
            myHeaders.append("Referer", "https://www.septakey.org/account");
            myHeaders.append("Connection", "keep-alive");
            myHeaders.append("Cookie", SECRET_COOKIE);
            myHeaders.append("Sec-Fetch-Dest", "empty");
            myHeaders.append("Sec-Fetch-Mode", "cors");
            myHeaders.append("Sec-Fetch-Site", "same-origin");
            myHeaders.append("Pragma", "no-cache");
            myHeaders.append("Cache-Control", "no-cache");

            let init: RequestInit = {
                method: 'POST',
                headers: myHeaders,
                redirect: 'follow'
            };

            let response = await fetch("https://www.septakey.org/api/v1/login", init)

            if (response.status !== 200) {
                let error: Error = {
                    code: response.status,
                    reason: response.statusText
                };
                return {error};
            }

            let result = await response.text();

            let access_token: string = JSON.parse(result).access_token;
            let jwt_data: JWTData = JSON.parse(atob(access_token.split('.')[1]));

            user = {
                id: jwt_data.contact_id,
                firstname: jwt_data.firstname,
                lastname: jwt_data.lastname,
                token: access_token
            }
        }

        {
            let myHeaders = new Headers();
            myHeaders.append("x-api-source", "WCI9Exs");
            myHeaders.append("x-authorization", `Bearer ${user?.token}`);
            myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/110.0");
            myHeaders.append("Accept", "*/*");
            myHeaders.append("Accept-Language", "en-US,en;q=0.5");
            myHeaders.append("Accept-Encoding", "gzip, deflate, br");
            myHeaders.append("Referer", "https://www.septakey.org/account");
            myHeaders.append("content-type", "application/json");
            myHeaders.append("Connection", "keep-alive");
            myHeaders.append("Cookie", SECRET_COOKIE);
            myHeaders.append("Sec-Fetch-Dest", "empty");
            myHeaders.append("Sec-Fetch-Mode", "cors");
            myHeaders.append("Sec-Fetch-Site", "same-origin");
            myHeaders.append("Pragma", "no-cache");
            myHeaders.append("Cache-Control", "no-cache");
    
            let init: RequestInit = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };
    
            let response = await fetch(`https://www.septakey.org/api/v1/indv_users/${user.id}/keycard_details`, init);
            let result = await response.text();
            keys = JSON.parse(result, dateTimeReviver);
        }

        for(let i = 0; i < keys.length; i++) {
            var myHeaders = new Headers();
            myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/110.0");
            myHeaders.append("Accept", "*/*");
            myHeaders.append("Accept-Language", "en-US,en;q=0.5");
            myHeaders.append("Accept-Encoding", "gzip, deflate, br");
            myHeaders.append("Referer", "https://www.septakey.org/account");
            myHeaders.append("content-type", "application/json");
            myHeaders.append("x-api-source", "WCI9Exs");
            myHeaders.append("x-authorization", `Bearer ${user?.token}`);
            myHeaders.append("Connection", "keep-alive");
            myHeaders.append("Cookie", SECRET_COOKIE);
            myHeaders.append("Sec-Fetch-Dest", "empty");
            myHeaders.append("Sec-Fetch-Mode", "cors");
            myHeaders.append("Sec-Fetch-Site", "same-origin");
            myHeaders.append("Pragma", "no-cache");
            myHeaders.append("Cache-Control", "no-cache");

            var init: RequestInit = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let index = 0;
            let total = 0;

            while (index <= total) {
                let response = await fetch(`https://www.septakey.org/api/v1/indv_users/${user?.id}/keycards/${keys[i].fare_media_id}/trips?start_index=${index+1}&end_index=${index + 20}&sort=desc`, init)
                let result: TripResponse = JSON.parse(await response.text(), dateTimeReviver);

                trips  = trips.concat(result.result);

                index += 20;
                total = result.total;
            }
        }

        trips = trips.sort((x,y)=> (y.entry_time.getTime()  - x.entry_time.getTime()));

        for(let i = 0; i < trips.length; i++) {
            trips[i].entry_stop = trips[i].entry_stop.replace(" - MFL", "");
            trips[i].entry_stop= trips[i].entry_stop.replace(" - BSL", "");
            trips[i].entry_stop = trips[i].entry_stop.replace(" - NHSL", "");
            if(trips[i].amount < 0) {
                trips.splice(i-1, 2);
                i -= 2;
            }
        }

        return {user, trips, keys};
    }
};
