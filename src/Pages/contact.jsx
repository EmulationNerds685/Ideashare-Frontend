import React, { useState } from 'react';
import axios from 'axios';
import '../contact.css'; // assuming styles are in Contact.css

const backend = import.meta.env.VITE_BACKEND_URL  // or wherever your API is

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${backend}/contact`, formData);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (err) {
      console.error('Contact error:', err);
      alert('Failed to send message. Please try again.');
    }
  };

  return (
    <div className="contact-container">
      <h2 className="contact-heading">Forgot Your Code?</h2>
      <p className="contact-description">
        If you've lost your blog code, reach out to the developer below.
      </p>

      {submitted ? (
        <p className="contact-success">Thanks for reaching out! I’ll get back to you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} className="contact-form">
          <label className="contact-label">
            Your Name
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="contact-input"
            />
          </label>

          <label className="contact-label">
            Your Email
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="contact-input"
            />
          </label>

          <label className="contact-label">
            Message
            <textarea
              name="message"
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Mention blog title, date, or anything that can help me find your post"
              className="contact-textarea"
            />
          </label>

          <button type="submit" className="contact-button">Send Message</button>
        </form>
      )}
    </div>
  );
};

export default Contact;
