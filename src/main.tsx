import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import "antd/dist/reset.css";
import { Provider } from 'react-redux'
import { store } from './store';
import { ConfigProvider } from 'antd';
import en_US from 'antd/es/locale/en_US';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <ConfigProvider locale={en_US}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>
)
