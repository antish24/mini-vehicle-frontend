import React, { useState } from "react";
import {
  Link,
  Route,
  Routes,
} from "react-router-dom";
import {
  Layout,
  theme,
  Menu,
} from "antd";

import {
  MdDashboard,
  MdNextPlan,
} from "react-icons/md";

import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: "1",
      label: <Link to={"/"}>Vechicle</Link>,
      icon: <MdDashboard size={20} />,
    },
    {
      key: "15",
      label: "Version 0.5",
      icon: <MdNextPlan size={20} />,
    },
  ];

  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme='dark'
          style={{ overflow: "scroll" }}
        >
          <Menu
            theme='dark'
            style={{ overflow: "hidden", width: "100%" }}
            mode="inline"
            items={items}
          />
          <div style={{ height: "40px" }}></div>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: "0 16px",
              background: colorBgContainer,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "10px",
            }}
          >
          </Header>
          <Content
            style={{
              overflow: "scroll",
              margin: "16px 8px 0",
            }}
          >
            <div
              style={{
                padding: 8,
                minHeight: "100%",
                background: colorBgContainer,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route element={<Dashboard />} path="/" />
                <Route element={<PageNotFound />} path="*" />
              </Routes>
            </div>
          </Content>
          <Footer
            style={{
              height: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {"MINI APP VECHICLE"}©{new Date().getFullYear()}
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};
export default App;
