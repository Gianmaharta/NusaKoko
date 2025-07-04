import React from "react";
import { Layout, Typography } from "antd";

const { Content } = Layout;
const { Title } = Typography;

const AdminHome = () => (
  <Layout style={{ minHeight: "100vh", background: "#f5f5f5" }}>
    <Content style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <Title level={2} style={{ color: "#4E342E" }}>Hallo Admin</Title>
    </Content>
  </Layout>
);

export default AdminHome;