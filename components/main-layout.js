import { useState } from 'react';
import { BackTop, Layout, Typography } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import TypesNav from './types-nav';

const { Content, Header, Footer, Sider } = Layout;
const { Title } = Typography;

export default function MainLayout({ children }) {
  const [isResponsive, setIsResponsive] = useState(false);
  const [isMenuCollapse, setMenuCollapse] = useState(true);

  const handleNavButton = () => {
    setMenuCollapse(true);
  };

  const overflow = isResponsive ? 'initial' : 'auto';

  return (
    <Layout>
      <Sider
        theme="light"
        breakpoint="lg"
        collapsedWidth={0}
        width={255}
        collapsible
        collapsed={isMenuCollapse}
        onBreakpoint={(broken) => {
          setIsResponsive(broken);
        }}
        trigger={null}
      >
        <span
          className={
            'ant-layout-sider-zero-width-trigger ant-layout-sider-zero-width-trigger-left'
          }
        >
          {isMenuCollapse ? (
            <MenuUnfoldOutlined
              onClick={() => setMenuCollapse(!isMenuCollapse)}
            />
          ) : (
            <MenuFoldOutlined
              onClick={() => setMenuCollapse(!isMenuCollapse)}
            />
          )}
        </span>
        <Title level={4}>Pokemon By Types</Title>
        <TypesNav
          isResponsive={isResponsive}
          handleNavButton={handleNavButton}
        />
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
            height: 100vh;
            position: fixed;
            left: 0;
          }
        `}
      </style>
    </Layout>
  );
}
