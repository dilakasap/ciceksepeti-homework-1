//Get elements from html
let formButton = document.querySelector("#form-btn");
let cardsButton = document.querySelector("#cards-btn");
let mainContainer = document.querySelector(".main-container");
let sideBar = document.querySelector(".side-bar");
let form = document.querySelector(".form");
let searchBar = document.querySelector(".search-bar");
let content = document.querySelector(".content");
let postWrapper = document.querySelector(".post-wrapper");
let txt = document.getElementById("txt");
let submit =document.querySelector("#submit");
let modal =document.querySelector(".modal");
let closeButton=document.querySelector("#close");
let formInput=document.querySelector("#formInput");
let modalContent=document.querySelector(".modal-content");

//Events
formButton.addEventListener("click", loadForm);
closeButton.addEventListener("click",closeModal);
cardsButton.addEventListener("click", () => {
    fetchCards();
});

txt.addEventListener("input",handleChange);
submit.addEventListener("click",submitForm);
window.onload = Run();

//Close modal with x button
function closeModal (e){
    e.preventDefault();
    modalContent.innerHTML="";
    modal.style.display="none";
}
//Submit form and open modal with Submit button
function submitForm (e){
    e.preventDefault();
    modal.style.display="flex";
    for(let i=0; i<formInput.elements.length-1; i++){
       let p =document.createElement("p");
       p.innerHTML=`${formInput.elements[i].parentElement.textContent} `+formInput.elements[i].value;
       modalContent.appendChild(p);
       formInput.elements[i].value="";
    }
}
// get input-text value to the fetchCards function
function handleChange(e){
    fetchCards(e.target.value);
}

//Clean main-container and run loadForm function
function Run() {
    mainContainer.innerHTML = "";
    mainContainer.appendChild(sideBar);
    loadForm();
}

//load form and hide search-bar
function loadForm() {
    mainContainer.innerHTML = "";
    mainContainer.appendChild(sideBar);
    mainContainer.appendChild(form);
    searchBar.classList.add("hidden");

}
//get data from API with fetch, filter data for search-bar
function fetchCards(q = '') {
    mainContainer.innerHTML = "";
    postWrapper.innerHTML = "";
    mainContainer.appendChild(sideBar);
    searchBar.classList.remove("hidden");
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then((res) => res.json())
        .then((data) => {
            if (q !== '') {
                q=q.toLowerCase();
                data = data.filter((x) => {
                    return x.title.toLowerCase().includes(q) || x.body.toLowerCase().includes(q)
                });
            }
            loadCards(data);
        });
}
//create max 10 cards for the content with createElement-appendChild methods
function loadCards(data) {
    var length = data.length;
    if (length > 10) {
        length = 10;
    }
    for (let i = 0; i < length; i++) {
        let post = document.createElement("div");
        post.className = "post";
        let image = document.createElement("div");
        image.className = "image";
        let img = document.createElement("img");
        img.src = "https://picsum.photos/300/200?random="+(i+1);
        let title = document.createElement("div");
        title.className = "title";
        let p_title = document.createElement("p");
        p_title.innerHTML = data[i].title;
        let desc = document.createElement("div");
        desc.className = "desc";
        let p_desc = document.createElement("p");
        p_desc.innerHTML = data[i].body;

        desc.appendChild(p_desc);
        title.appendChild(p_title);
        image.appendChild(img);
        post.appendChild(image);
        post.appendChild(title);
        post.appendChild(desc);
        postWrapper.appendChild(post);
        content.appendChild(postWrapper);
        mainContainer.appendChild(content);
    }

}
