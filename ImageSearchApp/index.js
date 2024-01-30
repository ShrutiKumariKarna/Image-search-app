 // https://www.youtube.com/watch?v=oaliV2Dp7WQ&list=PL9bD98LkBR7P16BndaNtP4x6Wf5Ib85Hm

const key = "5G4Zjre0OMZxDU2eN5d17mxmbmYdVM5bwBb6_rXNVW8";

const Form = document.querySelector("form");
const inputbox = document.getElementById("input_box");
const resultcontainer = document.querySelector(".result-container");
const showmorebutn = document.getElementById("show_more");

let input_data = "";
let pages = 1;

async function searchImages() {
    input_data = inputbox.value;
    const url = `https://api.unsplash.com/search/photos?page=${pages}&query=${input_data}&client_id=${key}`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (pages === 1) {
        resultcontainer.innerHTML = "";
    }

    results.map((result) => {
        const imagewrapper = document.createElement("div");
        imagewrapper.classList.add("resultbox"); // Removed the dot before "resultbox"
        
        const imagE = document.createElement('img');
        imagE.src = result.urls.small;
        imagE.alt = result.alt_description;
        
        const imagelink = document.createElement('a');
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.textContent = result.alt_description;

        imagewrapper.appendChild(imagE);
        imagewrapper.appendChild(imagelink);
        
        resultcontainer.appendChild(imagewrapper); // Changed from imagewrapper.appendChild(imagewrapper);
    });

    pages++;

    if (pages > 1) {
        showmorebutn.style.display = "block";
    }
}

Form.addEventListener("submit", (Event) => {
    Event.preventDefault();
    pages = 1;
    searchImages();
});

showmorebutn.addEventListener("click", () => {
    searchImages();
});
