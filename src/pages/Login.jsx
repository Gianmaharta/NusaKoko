import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/login.css";
import logoNusaKoko from "../assets/logo-nusakoko.png";
import api from "../utils/api";

// Tambahkan prop isModal
const Login = ({ isModal, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("password", values.password);

      const res = await api.post("/api/nusakoko/auth/login", formData);
      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("role", res.data.role); // Simpan role
      if (onSuccess) {
        onSuccess(res.data.role); // Kirim role ke handler
      } else {
        // Redirect sesuai role
        if (res.data.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/produk");
        }
      }
    } catch (err) {
      message.error(
        err.response?.data?.msg || "Login gagal, cek username/password!"
      );
    } finally {
      setLoading(false);
    }
  };

  return isModal ? (
    <div className="login-right">
      <div className="login-card">
        <div className="login-avatar">
          <UserOutlined style={{ fontSize: 64, color: "#fff" }} />
        </div>
        <Form
          name="login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
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
              loading={loading}
            >
              LOGIN
            </Button>
          </Form.Item>
          <div className="login-register">
            <span>I Don't Have Account?</span>
            <Link to="/register">Register</Link>
          </div>
        </Form>
      </div>
    </div>
  ) : (
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
            onFinish={onFinish}
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
                loading={loading}
              >
                LOGIN
              </Button>
            </Form.Item>
            <div className="login-register">
              <span>I Don't Have Account?</span>
              <Link to="/register">Register</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;