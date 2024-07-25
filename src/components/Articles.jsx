import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const Articles = () => {
  const [articles, setArticles] = useState([]);
  const API_KEY = '0a7059eb5a9b495f99673d6d1189120e';
  const QUERY = 'technology';

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch(`https://newsapi.org/v2/everything?q=${QUERY}&apiKey=${API_KEY}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArticles(data.articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  const MAX_DESCRIPTION_LENGTH = 100;

  return (
    <div className="container mt-5">
      <div className="row">
        {articles.map((article, index) => (
          <div className="col-md-4 d-flex mb-4" key={index}>
            <div className="card mb-4 shadow-sm h-100">
              {article.urlToImage && (
                <img src={article.urlToImage} className="card-img-top" alt={article.title} />
              )}
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text flex-grow-1">
                  {article.description && article.description.length > MAX_DESCRIPTION_LENGTH
                    ? `${article.description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
                    : article.description}
                </p>
                <p className="card-text"><strong>Autor: {article.author || 'Desconocido'}</strong></p>
                <div className="btn-group mt-auto">
                  <a href={article.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Leer más</a>
                  <a href="/" className="btn btn-secondary">Comprar ahora</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
