import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Provider } from 'react-redux';
import { store } from './reduxStore/store.jsx';


createRoot(document.getElementById('root')).render(
      // <StrictMode>
            <Provider store={store} >
                  <App />
            </Provider>
      // </StrictMode>,
)
