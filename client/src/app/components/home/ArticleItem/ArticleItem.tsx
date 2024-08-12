import styles from "./ArticleItem.module.css";

interface ArticleItemProps {
    article: Article;
    onDelete: (event: any, id: string) => void;
}

export const ArticleItem: React.FC<ArticleItemProps> = ({ article, onDelete }) => {
    return (
        <section className={styles.Article}>
            <a href={article.url}>
                <article>
                    <div>
                        <span>{article.title}.</span>
                        <span className={styles.author}>- {article.author} -</span>
                    </div>
                    <div>{article.created_at_formated}</div>
                    <div onClick={(event) => onDelete(event, article._id)}>🗑️</div>
                </article>
            </a>
        </section>
    );
};
