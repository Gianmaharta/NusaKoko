import React, { useState } from "react";
import { Form, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/login.css";
import logoNusaKoko from "../assets/logo-nusakoko.png";
import api from "../utils/api";

const Register = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", values.username);
      formData.append("email", values.email);
      formData.append("password", values.password);

      await api.post("/api/nusakoko/auth/register", formData);
      message.success("Registrasi berhasil! Silakan login.");
      navigate("/login");
    } catch (err) {
      message.error(
        err.response?.data?.msg ||
          err.response?.data?.message ||
          "Registrasi gagal, cek data Anda!"
      );
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (_, value) => {
    if (!value || form.getFieldValue("password") === value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Konfirmasi password tidak cocok!"));
  };

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
          <h2 style={{ textAlign: "center", color: "#4B2E19", marginBottom: 24 }}>
            Daftar Akun Baru
          </h2>
          <Form
            form={form}
            name="register"
            className="login-form"
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Username wajib diisi!" }]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                className="login-input"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Email wajib diisi!" },
                { type: "email", message: "Format email tidak valid!" },
              ]}
            >
              <Input
                prefix={<MailOutlined />}
                placeholder="Email"
                className="login-input"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password wajib diisi!" }]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                className="login-input"
                size="large"
              />
            </Form.Item>
            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Konfirmasi password wajib diisi!" },
                { validator: validatePassword },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Konfirmasi Password"
                className="login-input"
                size="large"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-btn"
                size="large"
                block
                loading={loading}
              >
                REGISTER
              </Button>
            </Form.Item>
            <div className="login-register">
              <span>Sudah punya akun?</span>
              <Link to="/login">Login di sini</Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;