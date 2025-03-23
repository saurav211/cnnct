import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <h1>Welcome to CNNCT</h1>
      <p>This is a Meeting & Event Scheduling Platform.</p>
      <div>
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/signup">
          <button>Signup</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;
