import FeedPage from "../feedPage/FeedPage.js";
import posts from "../postItem/allPosts.json"
import { UserProvider } from '../providers/user_context';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from "react-router-dom";

describe('FeedPage test', () => {
    it('renders without crashing', () => {
      render(<BrowserRouter><UserProvider><FeedPage postList={posts} setPostList={()=>{}} toggleTheme={()=>{}} /></UserProvider></BrowserRouter>);

      // login was successful 
      expect(window.location.pathname).toBe('/')
    });
  
    // it('displays posts', () => {
    //   const { getByText } = render(<BrowserRouter><UserProvider><FeedPage postList={posts} /></UserProvider></BrowserRouter>);
    //   expect(getByText('Post 1')).toBeInTheDocument();
    //   expect(getByText('Post 2')).toBeInTheDocument();
    // });
  
    // it('displays search input', () => {
    //   const { getByPlaceholderText } = render(<BrowserRouter><UserProvider><FeedPage postList={posts} /></UserProvider></BrowserRouter>);
    //   expect(getByPlaceholderText('Search')).toBeInTheDocument();
    // });
  
  });