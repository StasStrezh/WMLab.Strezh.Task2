
class getInfo {
    constructor() {

    }

    getGif(){
        return {
            type: 'GIF',
            callAPI: `http://api.giphy.com/v1/gifs/search?q=a&api_key=Z5DFH2jZQwLaZLyz078i0IO192i5zU0E&offset=`
        }
    }
    getSticker(){
        return {
            type: 'STICKER',
            callAPI: `http://api.giphy.com/v1/stickers/search?q=a&api_key=Z5DFH2jZQwLaZLyz078i0IO192i5zU0E&offset=`
        }
    }
}

class GifSearch {
    static form() {
        return document.getElementsByTagName('form')[0]
    }

    static resultsList() {
        return document.getElementsByClassName('Tabcontent')
    }

    constructor(gifTab, stickerTab) {
        // this.listen = this.listen.bind(this)
        this.gifTab = gifTab;
        this.stickerTab = stickerTab;
    }

    listen() {
        GifSearch.form().addEventListener('submit', this.submitForm.bind(this))
    }

    submitForm(event) {
        event.preventDefault();

        const div = document.getElementById('Gif')
        while(div.firstChild){
            div.removeChild(div.firstChild);
        }
        const div2 = document.getElementById('Stickers')
        while(div2.firstChild){
            div2.removeChild(div2.firstChild);
        }
        let offs = 0;
       this.drawing(offs)
    }

    drawing(off) {

        const searchQuery = escape(GifSearch.form().query.value)
        let giphyQuery
        let a

        if(gifTab.classList.contains('default')) {
            const payload = Info.getGif();
            a = 0;
            giphyQuery = payload.callAPI + off + "&q=" + searchQuery
        }
        if (stickerTab.classList.contains('default'))
        {
            const payload = Info.getSticker();
            a = 1
            giphyQuery = payload.callAPI + off + "&q=" + searchQuery
        }

        fetch(giphyQuery)
            .then(function(response) {
                if(response.ok) {
                    return response.json().then(function(json) {
                        for (const gif of json.data) {
                            const listItem = document.createElement('img')
                            listItem.src = gif.images.original.url
                            console.log(GifSearch.resultsList()[a])
                            GifSearch.resultsList()[a].appendChild(listItem)
                        }
                    })

                } else {
                    const responseMessage = document.createElement('p')
                    responseMessage.innerText = "Network response was not ok."
                    document.body.appendChild(responseMessage)
                }
            })
            .catch(function(error) {
                const errorMessage = document.createElement('p')
                errorMessage.innerText = "There has been a problem with your fetch operation: " + error.message
                document.body.appendChild(errorMessage)
            });
    }
}

const gifTab = document.querySelector('.gif');
const stickerTab = document.querySelector('.sticker');
const element = document.getElementById('dy');

const tabs = document.querySelectorAll('.tablinks');
for(let i=0; i<tabs.length; i++) {
    tabs[i].addEventListener('click', function (e) {
        for (let j = 0; j < tabs.length; j++) {
            tabs[j].classList.remove('default');
        }
        tabs[i].classList.add('default');

        app_gif.listen();
    })
}

function openTab(event, tabId) {
    const tabcontent = document.getElementsByClassName("Tabcontent")
    for(let i=0; i<tabcontent.length; i++) {
        tabcontent[i].style.display = "none"
    }
    document.getElementById(tabId).style.display = "block"
}
let set = 25;
if(element.addEventListener) {
    if('onwheel' in document) {
        element.addEventListener('wheel', function (e) {
            if (element.scrollHeight - element.scrollTop === element.clientHeight) {
                app_gif.drawing(set);
                set += set;
            }
        });
    }
}

const app_gif = new GifSearch(gifTab, stickerTab)
const Info = new getInfo()



