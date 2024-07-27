'use client';

import { useEffect, useState } from "react";
import styles from "./ArticlesContainer.module.css";

const deleteArticle = async (id: string) => {
    try {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles/${id}`, {
            method: "DELETE"
        });
    } catch (error) {
        console.error(error);
    }
}

export const ArticlesContainer = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [updateArticles, setUpdateArticles] = useState(false);

    const handleDelete = async (event: any, id: string) => {
        event.preventDefault();
        await deleteArticle(id);
        setUpdateArticles(prev => !prev);
    }

    useEffect(() => {
        const getArticles = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`);
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error(error);
            } 
        }
        getArticles();
    }, [updateArticles]);

    return (
        <main>
            {articles.map((article: Article) => (
                <section key={article.title} className={styles.Article}>
                    <a href={article.url}>
                        <article>
                            <div>
                                <span>{article.title}.</span>
                                <span className={styles.author}>- {article.author} -</span>
                            </div>
                            <div>{article.created_at}</div>
                            <div onClick={(event) => {handleDelete(event, article._id)}}>🗑️</div>
                        </article>
                    </a>
                </section>
            ))}
        </main>
    )
}