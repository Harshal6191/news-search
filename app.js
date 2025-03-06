const apikey = 'c8d90b26e349455abce4877126751373';
const blogContainer = document.getElementById('blog-container');

const searchField = document.getElementById('search-input');
const searchBtn = document.getElementById('Search-Btn');


async function fetchRandomnews() {
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apikey=${apikey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;

    } catch (error) {
        console.error("Error fetching random news", error)
        return[]
    }
}


searchBtn.addEventListener("click", async () => {
    const query = searchField.value.trim();

    if (query !== "") {
        try {
            const articles = await fetchNewsQuery(query)
            displayblogs(articles)
        } catch (error) {
            console.log("Error Fetching news by query..", error)
        }
    }

    searchField.value = searchField.ariaPlaceholder;
});

async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apikey=${apikey}`
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;

    } catch (error) {
        console.error("Error fetching random news", error)
        return []
    }
}





function displayblogs(articles) {

    blogContainer.innerHTML = "";

    articles.forEach((article) => {

        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;

        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0, 30) + "..." : article.title;
        title.textContent = truncatedTitle;

        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click", () => {
            window.open(article.url, "_blank");
        })
        blogContainer.appendChild(blogCard);
    });
}


(async () => {
    try {
        const articles = await fetchRandomnews();
        displayblogs(articles);
    } catch (error) {
        console.error("Error fetching random news", error);
    }
})();
