
import './index.css';

import { ConfigProvider, Layout } from 'antd';
import SideMenu from './Components/SideMenu/SideMenu';
import AppHeader from './Components/AppHeader/AppHeader';

import AppRouter from './Components/AppRouter';


const App: React.FC = () => {

  return (
    <ConfigProvider theme={{
      components: {
        Menu: { darkItemSelectedBg: '#F3D324' }
      }
    }}>
      <Layout>
       <SideMenu />
        <Layout>
          <AppHeader />
          <AppRouter />
          
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default App;