import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Lấy dữ liệu từ Backend
  const fetchUsers = async () => {
    try {
      // Vì trên Nginx đã cấu hình /api proxy qua backend
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, description }),
      });

      if (response.ok) {
        // Reset form
        setName('');
        setDescription('');
        // Tải lại danh sách
        fetchUsers();
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  return (
    <div className="container">
      <h1>Hệ Thống Quản Lý Người Dùng Fullstack</h1>
      <h3>DevOps Exam 009 - HN_KS25K23B - Duong_SY_HIEP</h3>
      
      <div className="form-section">
        <h2>Thêm Người Dùng Mới</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Tên người dùng:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="input-group">
            <label>Mô tả:</label>
            <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
          </div>
          <button type="submit">Thêm ngay</button>
        </form>
      </div>

      <div className="list-section">
        <h2>Danh sách người dùng từ Database</h2>
        {users.length === 0 ? (
          <p>Chưa có dữ liệu nào trong PostgreSQL.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên</th>
                <th>Mô tả</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
