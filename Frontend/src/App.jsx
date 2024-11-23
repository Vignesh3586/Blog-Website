import './App.css';
import Posts from './slice/posts/posts';
import AddPost from './slice/posts/AddPost';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import About from './components/About';
import PostPage from './components/PostPage';
import EditPostPage from './components/EditPostPage'
import Users from './slice/users/Users';
import UserPage from './slice/users/UserPage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/editpost/:id" element={<EditPostPage />} />
        <Route path="/addpost" element={<AddPost />} />
        <Route path="/about" element={<About />} />
        <Route path="/users" >
        <Route index element={<Users/>}/>
        <Route path=":authorName" element={<UserPage/>}/>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
