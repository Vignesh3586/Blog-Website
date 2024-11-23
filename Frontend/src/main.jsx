import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import {store} from './store/store';
import App from './App'; // Assuming App component is in the src folder
import { BrowserRouter } from 'react-router-dom';
import { fetchPosts } from './slice/posts/postsSlice.js';

store.dispatch(fetchPosts())
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <BrowserRouter future={{ v7_startTransition: true,
       v7_relativeSplatPath: true 
     }}>
      <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);