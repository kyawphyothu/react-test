import { useEffect, useState } from 'react'

type ArticleSource = {
  id: string | null;
  name: string;
};

type Article = {
  source: ArticleSource;
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

type NewsApiResponse = {
  status: string;
  totalResults: number;
  articles: Article[];
};


const apiKey = 'ffe65a0f523a47edb1e88c9edbe37556';
const url = `https://newsapi.org/v2/everything?domains=wsj.com&apiKey=${apiKey}`;

const fetchNews = async (): Promise<NewsApiResponse> => {
  const response = await fetch(url);
  const data: NewsApiResponse = await response.json();
  return data;
};

function App() {
  const [news, setNews] = useState<null | Article[]>(null);

  useEffect(() => {
    (
      async function () {
        const data = await fetchNews();
        setNews(data.articles)
      }
    )()
  }, [])

  return (
    <>
    {
      news && news.map(i => {
        return (
          <div key={i.source.id} style={{ border: "2px solid red", padding: "8px 16px" }}>
            <h2>{i.title}</h2>
            <h6>{i.publishedAt}</h6>
            <h6>{i.author}</h6>

            <h4>{i.content}</h4>
            <button><a href={i.url} target='_blank'>Link</a></button>
          </div>
        )
      })
    }
    </>
  )
}

export default App
