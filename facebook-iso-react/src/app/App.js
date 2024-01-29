import './App.css';
import Article from "../article/Article"
import articles from "../data/db.json"
import { useState } from 'react';

function App() {
  const [articlesList, setArticleList] = useState(articles);

  const addArticle = () => {
    const article = {
      "id" : 3,
      "title" : "another post",
      "author" : "Someone Else",
      "category" : "Food",
      "publication_date" : "27/1/2024"
    }
    setArticleList([...articlesList, article])
  }

  return (
    <div className="App">
      <div className="button-container">
        <button onClick={addArticle}><h1>NEW POST</h1></button>
        <h2>search</h2>
      </div>
      <div className="content">
        {
          articlesList.map((articles) => <Article {...articles} />)
        }
      </div>
    </div>
  );
}

export default App;
