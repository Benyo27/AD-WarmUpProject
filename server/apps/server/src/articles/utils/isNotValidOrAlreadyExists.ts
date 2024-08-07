export function isNotValidOrAlreadyExists(article, existingArticle) {
  return (
    !article.author ||
    !article.created_at ||
    (!article.title && !article.story_title) ||
    (!article.url && !article.story_url) ||
    existingArticle
  );
}
