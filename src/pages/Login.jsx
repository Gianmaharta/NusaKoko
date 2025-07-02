import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./../styles/login.css";
import logoNusaKoko from "../assets/logo-nusakoko.png"; // import logo

const Login = () => {
  return (
    <div className="login-container">
      {/* Left Side */}
      <div className="login-left">
        <div className="logo-circle">
          <img src={logoNusaKoko} alt="Logo" className="logo-image" />
        </div>
      </div>
      {/* Right Side */}
      <div className="login-right">
        <div className="login-card">
          <div className="login-avatar">
            <UserOutlined style={{ fontSize: 64, color: "#fff" }} />
          </div>
          <Form
            name="login"
            className="login-form"
            initialValues={{ remember: true }}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Please input your Username!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                className="login-input"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Please input your Password!" }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                className="login-input"
                size="large"
              />
            </Form.Item>
            <div className="login-forgot">
              <a href="#">Forgot password?</a>
            </div>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-btn"
                size="large"
                block
              >
                LOGIN
              </Button>
            </Form.Item>
            <div className="login-register">
              <span>I Don't Have Account?</span>
              <a href="#">Register</a>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;