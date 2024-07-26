import styles from "./Article.module.css";

interface ArticleProps {
    article: Article
}

export const Article = ({ article }: ArticleProps) => {
    return (
        <main className={styles.Article}>
            <a href={article.url}>
                <article key={article.title}>
                    <div>
                        <span className={styles.title}>{article.title}</span>
                        <span className={styles.author}>. - {article.author} -</span>
                    </div>
                    <div>{article.created_at}</div>
                </article>
            </a>
        </main>
    )
}