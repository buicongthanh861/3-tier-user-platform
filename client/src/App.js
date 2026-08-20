// client/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [editingUser, setEditingUser] = useState(null); // Thêm state cho user đang sửa

    // Lấy danh sách người dùng từ backend
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        fetch('/api/users')
            .then(res => res.json())
            .then(data => setUsers(data))
            .catch(err => console.error('Lỗi khi lấy người dùng:', err));
    };

    // Xử lý khi thêm người dùng
    const handleSubmit = (e) => {
        e.preventDefault();

        // Nếu đang ở chế độ sửa → update
        if (editingUser) {
            fetch(`/api/users/${editingUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, role }),
            })
                .then(res => res.json())
                .then(() => {
                    fetchUsers();
                    resetForm();
                })
                .catch(err => console.error('Lỗi khi cập nhật:', err));
            return;
        }

        // Thêm mới
        const newUser = { name, email, role };

        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        })
            .then(res => res.json())
            .then(() => {
                fetchUsers();
                resetForm();
            })
            .catch(err => console.error('Lỗi khi thêm người dùng:', err));
    };

    // Hàm reset form
    const resetForm = () => {
        setName('');
        setEmail('');
        setRole('');
        setEditingUser(null);
    };

    // Xử lý sửa user
    const handleEdit = (user) => {
        setEditingUser(user);
        setName(user.name);
        setEmail(user.email);
        setRole(user.role);
        // Scroll lên form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Xử lý xóa user
    const handleDelete = (userId) => {
        if (window.confirm('Bạn có chắc muốn xóa user này?')) {
            fetch(`/api/users/${userId}`, {
                method: 'DELETE',
            })
                .then(() => {
                    fetchUsers();
                })
                .catch(err => console.error('Lỗi khi xóa:', err));
        }
    };

    return (
        <div className="app">
            <div className="navbar">
                <div className="brand">Cong Thanh DevOps8386</div>
                <div className="nav-links">
                    <a className="home" href="/">Trang chủ</a>
                </div>
            </div>

            <h1>Ứng dụng quản lý người dùng</h1>

            <div className="form-container">
                <input
                    type="text"
                    placeholder="Nhập tên người dùng"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Nhập email người dùng"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                    <option value="">Chọn vai trò</option>
                    <option value="Admin">Quản trị viên</option>
                    <option value="User">Người dùng</option>
                </select>
                <button onClick={handleSubmit}>
                    {editingUser ? 'Cập nhật' : 'Thêm người dùng'}
                </button>
                {editingUser && (
                    <button onClick={resetForm} style={{ background: '#6c757d' }}>
                        Hủy sửa
                    </button>
                )}
            </div>

            <ul className="user-list">
                {users.map(user => (
                    <li key={user.id} className="user-item">
                        <span>{user.name} ({user.email}) - {user.role}</span>
                        <div className="edit-container">
                            <button onClick={() => handleEdit(user)}>Sửa</button>
                            <button onClick={() => handleDelete(user.id)}>Xóa</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
