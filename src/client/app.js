import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import '../../assets/css/style.css';

const initialPosts = [
  {
    id: 2,
    text: 'Lorem ipsum',
    user: {
      avatar: '/uploads/avatar1.png',
      username: 'Test User',
    },
  },
  {
    id: 1,
    text: 'Lorem ipsum',
    user: {
      avatar: '/uploads/avatar2.png',
      username: 'Test User 2',
    },
  },
];

const App = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [postContent, setPostContent] = useState('');

  return (
    <div className='container'>
      <Helmet>
        <title>Graphbook - Feed</title>
        <meta
          name='description'
          content='Newfeed of all your friends on Graphbook'
        />
      </Helmet>
      <div className='postForm'>
        <form onSubmit={handleSubmit}>
          <textarea
            value={postContent}
            onChange={e => setPostContent(e.target.value)}
            placeholder='Write your custom post!'
          />
          <input type='submit' value='Submit' />
        </form>
      </div>
      <div className='feed'>
        {initialPosts.map((post, i) => (
          <div key={post.id} className='post'>
            <div className='header'>
              <img src={post.user.avatar} />
              <h2>{post.user.username}</h2>
            </div>
            <p className='content'>{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const handleSubmit = event => {
    event.preventDefault();
    const newPost = {
      id: posts.length + 1,
      text: postContent,
      user: {
        avatar: '/uploads/avatar1.png',
        username: 'Fake User',
      },
    };
    setPosts([newPost, ...posts]);
    setPostContent('');
  };
};

export default App;
