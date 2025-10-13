import React, { useState } from "react";
import "./Contact.css";
import { FaPhoneAlt, FaEnvelope, FaQuestionCircle } from "react-icons/fa";

<h1 className="contact-title">
  📩 اتصل بنا
  <span className="help-icon">❓</span>
</h1>

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("تم إرسال رسالتك بنجاح ✅");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      <h1 className="contact-title">
        <FaQuestionCircle className="icon" /> تواصل معنا
      </h1>

      <div className="contact-container">
        {/* Contact Info Section */}
        <div className="contact-info">
          <p>
            <FaPhoneAlt className="icon" /> الهاتف:{" "}
            <strong>+216 12 345 678</strong>
          </p>
          <p>
            <FaEnvelope className="icon" /> البريد:{" "}
            <strong>info@elilmwal3amal.com</strong>
          </p>
        </div>

        {/* Contact Form */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>الاسم الكامل</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label>البريد الإلكتروني</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>رسالتك</label>
          <textarea
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button type="submit">إرسال</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
