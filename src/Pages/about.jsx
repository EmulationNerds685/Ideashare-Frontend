import "../about.css";
const About = () => {
  return (
    <div className="about-container">
        <h1 style={{textAlign:"center"}}>About</h1>
      <h1>Ideashare Blogging Website – A MERN Stack Project</h1>
      <p>
        As a part of integrating the various technologies I've learned from the
        MERN (MongoDB, Express.js, React, Node.js) stack, I created a fully
        functional Blog Website. This project served as both a hands-on learning
        experience and a personal milestone in full-stack development.
      </p>

      <h2>Project Overview</h2>
      <p>
        The blog platform allows users to: Create blog posts View all posts made
        by any user Edit or delete their own posts using a unique authorization
        method The focus was on implementing core CRUD functionality with a
        lightweight yet effective user authorization system.{" "}
      </p>

      <h2> Authorization Mechanism</h2>
      <p>
        Instead of using traditional user accounts or authentication libraries,
        I implemented a simple but functional authorization method: When a user
        creates a blog post, a random 6-digit code is generated and shown to
        them. This code is hashed and stored securely in the database along with
        the post data. To edit or delete the post later, the user needs to
        provide this code. The code entered is hashed again and compared with
        the stored hash to validate ownership. This approach keeps the system
        minimal and user-friendly while still adding a layer of security for
        post modifications.{" "}
      </p>
      <h2>🛠️ Tech Stack</h2>
      <p>
        Frontend: React with functional components and hooks Backend: Node.js
        with Express.js Database: MongoDB (with Mongoose for schema modeling)
        Styling: CSS and minimal UI libraries Other Tools: bcrypt for hashing,
        UUID/code generator for the 6-digit code
      </p>
      <h2> Key Learning Outcomes</h2>
      <p>
        Implementing secure hashing for lightweight authentication Working with
        RESTful API endpoints in Express Managing state and API interactions on
        the frontend with React Structuring a full-stack project from scratch
        using MERN stack best practices Deploying a simple, functional web app
        with minimal dependencies This project helped solidify my understanding
        of full-stack web development and taught me how to integrate backend
        logic with frontend user flows effectively. It was also an interesting
        challenge to create a unique post authorization method without relying
        on traditional user login systems.
      </p>
    </div>
  );
};
export default About;
