const activePage = window.location.pathname;
console.log(activePage)

const navLinks = document.querySelectorAll("nav a").forEach(link => {
    if(link.href.includes(`${activePage}`)){
        console.log(`${activePage}`);
        link.classList.add("active");
    }
})


const isLocalhost = location.hostname === "localhost" || location.hostname === "127.0.0.1";
const serverUrl = "API_URL_HERE";
const endpoint = isLocalhost ? "http://localhost:3333" : serverUrl;

function getArticles() {
    fetch("http://localhost:3333/articles/")
        .then(function (res){
            return res.json();
        }).then(function (data){
        console.log(data);
        appendArticles(data);
    });
}

function appendArticles(articleList) {
    console.log(articleList);
    let html ="";
    for (let i = 0; i < articleList.length; i++) {
        const post = articleList[i];
        console.log(post)

        html += `
            <article>
                <img src="${post.image}" alt=""/>
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <div class="btns">
                <button class="btn-delete-user" onclick="deleteArticle('${post.id}')">Delete</button>
                </div>
            </article>
        `;
    }
    document.querySelector("#posts-grid").innerHTML = html;
}

function deleteArticle(id){
    fetch(endpoint + "/articles/" + id, {method: "DELETE"}).then(function(res){
        getArticles();
    });
}

function createArticle(event){
    event.preventDefault();

    const post ={
        title: event.target.title.value,
        body: event.target.body.value,
        image: event.target.url.value
    }
    console.log(post)
    fetch("http://localhost:3333/articles/",{
        method: "POST",
        body: JSON.stringify(post),
        headers: {
            "Content-Type": "application/json"
        }
    });
}

getArticles();