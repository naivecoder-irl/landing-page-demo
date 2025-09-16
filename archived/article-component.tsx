"use client"; // This is a client-side component

// Import React hooks and Image component
import { useEffect, useState } from "react";
import Image from "next/image";

// Define Article interface
export interface Article {
  id: string;
  title: string;
  content: string;
  cover: any;
  publishedDate: Date;
}

// Define Strapi URL
const STRAPI_URL =
  process.env.NEXT_PUBLIC_STRAPI_URL || "http://127.0.0.1:1337";

export default function ArticleContent() {
  // Define articles state
  const [articles, setArticles] = useState<Article[]>([]);

  // Fetch articles
  const getArticles = async () => {
    const response = await fetch(`${STRAPI_URL}/api/articles?populate=*`);
    const data = await response.json();
    setArticles(data.data);
  };

  // Format date
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  // Fetch articles on component mount
  useEffect(() => {
    getArticles();
  }, []);

  return (
    <div className="p-6">
      <h1 className="mb-8 text-4xl font-bold">
        Next.js and Strapi Integration
      </h1>
      <div>
        <h2 className="mb-6 text-2xl font-semibold">Articles</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="overflow-hidden rounded-lg bg-white shadow-md"
            >
              <Image
                className="h-48 w-full object-cover"
                src={STRAPI_URL + article.cover.url}
                alt={article.title}
                width={180}
                height={38}
                priority
              />
              <div className="p-4">
                <h3 className="mb-2 text-lg font-bold">{article.title}</h3>
                <p className="mb-4 text-gray-600">{article.content}</p>
                <p className="text-sm text-gray-500">
                  Published: {formatDate(article.publishedDate)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
