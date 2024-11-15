import React, { useState } from 'react';
import { changePassword } from '../services/api';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await changePassword({ token, newPassword });
      alert('Password changed successfully');
    } catch (error) {
      alert('Error changing password');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
      />
      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePassword;
