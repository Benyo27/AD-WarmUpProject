'use client';

import { useEffect, useState } from "react";
import { ArticleItem } from "../ArticleItem";

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
                <ArticleItem key={article._id} article={article} onDelete={handleDelete} />
            ))}
        </main>
    )
}