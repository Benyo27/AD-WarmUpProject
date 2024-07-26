import { Article } from "..//Article";

const getArticles = async () => {
    try {
        const response = await fetch(`${process.env.API_URL}/articles`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    } 
}

export const ArticlesContainer = async () => {
    const articles = await getArticles();
    console.log(articles);
    return (
        <main>
            {articles.map((article: Article) => (
                <Article key={article.title} article={article} />
            ))}
        </main>
    )
}