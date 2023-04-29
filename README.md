# SEPTA Site
This is a website that can display information about your SEPTA ridership.

__This project has NO affiliation with the Southeastern Pennsylvania Transportation Authority (SEPTA) in any way, shape, or form__

![image](https://user-images.githubusercontent.com/56371027/235278034-012c6ca7-3a7b-4bc7-b89f-6c3efe193f96.png)

Currently, it shows your trip history using the SEPTA Metro wayfinding (this is different from the current wayfinding that SEPTA uses).
It can also give you some statistics such as how much you've spent on SEPTA fares, your favorite station, your favorite line, and how many
trips you've taken on SEPTA.

I wrote this website in order to learn Svelte. In doing this, I made some design choices that may not have been optimal, but they did
help me learn Svelte. The main design choice that I made due to this was getting a user's entire SEPTA ridership history in one call
to the server using Svelte's serverside functions. In practice, I would likely use the JS Fetch API and load ridership history in a
paginated manner.


## Running
I am currently not hosting an instance of this, so if you want to run this, you will have to run it locally. This can be done with the following steps:

__Note:__ I am not responsible if following this guide gets your SEPTA account messed up in any way, or if it causes the heat-death of the universe. 

1. Clone the repository with `git clone git@github.com:/nickorlow/septa-site`

2. Install dependencies with `npm i`

3. Get your SEPTA Key Cookie. SEPTA does DDoS mitigation through Incapsula, which requires that a Cookie be sent with each request. It is specifically
engineered not to be able to be generated outside of a browser. In order to get this cookie, open the browser's network tab in the developer tools,
login to [septakey.org](https://septakey.org), and then click on the request going to the URL `https://www.septakey.org/api/v1/data?data_element=MULTI_RIDER`
(note that you can use requests to other URLs, but for simplicity's sake, it's easy to just tell people to use this one), then click on the Cookie header in the **Request Headers**
and copy it's value. It should look something like:

```
visid_incap_XXXXXX=XXXXXXXX; incap_ses_XXXX_XXXXXX=XXXXXXXXXXXXXXXX; SameSite=None; ADRUM_BTa=R:XX|g:XXXXXXXXXX|n:customer1_XXXXXXXXXX; ADRUM_BT1=R:XX|i:XXXX|e:0|d:X
```

Once you have this copied, create a file where you cloned this repository with the name `.env` (the file should be in the same directory as this README file). Then copy
the key into the file in this format:

```
SECRET_COOKIE=[YOUR_COPIED_COOKIE_HERE]
```

4. Start the website with `npm run dev`

Your cookie will expire after some amount of time, and you may have to repeat this process again.
