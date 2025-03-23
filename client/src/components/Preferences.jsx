import { useState, useEffect } from 'react';
import api from '../interceptor';
import { useNavigate } from 'react-router-dom';

const Preferences = () => {
  const [username, setUsername] = useState('');
  const [profession, setProfession] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
   
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/user/preferences', { username, profession });
      const data = response.data;
      if (data.message) {
        console.log('Preferences updated successfully:', data.message); // Add logging
        navigate('/events');
        alert(data.message);
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Preferences</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="text"
        value={profession}
        onChange={(e) => setProfession(e.target.value)}
        placeholder="Profession"
        required
      />
      <button type="submit">Save</button>
    </form>
  );
};

export default Preferences;
