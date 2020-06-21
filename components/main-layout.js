import { BackTop, Layout, Typography } from 'antd';

const { Content, Header, Footer, Sider } = Layout;
const { Title } = Typography;

export default function MainLayout({ children }) {
  return (
    <Layout>
      <Sider
        style={{
          background: 'white',
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <Title level={4}>Pokemon By Types</Title>
      </Sider>
      <Layout style={{ marginLeft: 200 }}>
        <Header>
          <Title level={1}>POKEDEX</Title>
        </Header>
        <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
          {children}
        </Content>
        <BackTop />
        <Footer style={{ textAlign: 'center' }}>rbanianom ©2020</Footer>
      </Layout>
      <style>
        {`
          .ant-layout-header {
            background: #fff;
            border-bottom: 1px solid #f0f0f0;
          }
          .ant-layout-content {
            padding: 20px 50px;
          }
          @media screen and (max-width: 576px) {
            .ant-layout-header {
              padding: 0px 24px;
            }
            .ant-layout-content {
              padding: 20px 0px;
            }
          }
        `}
      </style>
    </Layout>
  );
}
