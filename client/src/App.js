// client/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');

    // Lấy danh sách người dùng từ backend
    useEffect(() => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error('Lỗi khi lấy người dùng:', err));
    }, []);

    // Xử lý khi thêm người dùng
    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = { name, email, role };

        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then(res => res.json())
            .then(data => {
                setUsers([...users, data]);
                setName('');
                setEmail('');
                setRole('');
            })
            .catch(err => console.error('Lỗi khi thêm người dùng:', err));
    };

    return (
        <div className="app">
            <div className="navbar">
                <div className="brand">Cong Thanh DevOps</div>
                <div className="nav-links">
                    <a className="home" href="/">Trang chủ</a>
                </div>
            </div>

            <h1>Ứng dụng quản lý người dùng</h1>

            <div className="form-container">
                <input type="text" placeholder="Nhập tên người dùng" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="email" placeholder="Nhập email người dùng" value={email} onChange={(e) => setEmail(e.target.value)} />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Chọn vai trò</option>
                    <option value="Admin">Quản trị viên</option>
                    <option value="User">Người dùng</option>
                </select>
                <button onClick={handleSubmit}>Thêm người dùng</button>
            </div>

            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id} className="user-item">
                        <span>{user.name} ({user.email}) - {user.role}</span>
                        <div className="edit-container">
                            <button>Sửa</button>
                            <button>Xóa</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
