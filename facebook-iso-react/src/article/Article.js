
import './Article.css';
import Umbrella from '../umbrella.jpg';

function Article({id, title, author, publication_date, category }) {
  return (
    <a href="article.html?id=1">
      <article>
        <h2>{title}</h2>
        <h3><img src={Umbrella} alt=" " /></h3>
        <span> {author}, <time>{publication_date}</time></span>
        <category>{category}</category>
      </article>
    </a>
  );
}

export default Article;
