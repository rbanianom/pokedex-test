import { useState } from 'react';
import { BackTop, Layout, Typography } from 'antd';
import TypesNav from './types-nav';

const { Content, Header, Footer, Sider } = Layout;
const { Title } = Typography;

export default function MainLayout({ children }) {
  const [isResponsive, setIsResponsive] = useState(false);

  const overflow = isResponsive ? 'initial' : 'auto';

  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth={0}
        width={255}
        onBreakpoint={(broken) => {
          setIsResponsive(broken);
        }}
      >
        <Title level={4}>Pokemon By Types</Title>
        <TypesNav isResponsive={isResponsive} />
      </Sider>
      <Layout style={{ marginLeft: isResponsive ? '0px' : '220px' }}>
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
          .ant-layout-sider{
            z-index: 1;
            overflow: ${overflow};
            background: white;
            height: 100vh;
            position: fixed;
            left: 0;
          }
        `}
      </style>
    </Layout>
  );
}
