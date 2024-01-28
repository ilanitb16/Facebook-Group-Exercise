import './App.css';
import Article from "../article/Article"
import articles from "../data/db.json"
import { useState } from 'react';

function App() {
const [articlesList, setArticleList] = useState(articles)
console.log(articlesList)
var i = 1
console.log(i)
i+=1
console.log(i)
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
      <button onClick={addArticle}>Add</button>
      {
        articlesList.map((articles) => <Article {...articles} />)
      }
    </div>
  );
}

export default App;