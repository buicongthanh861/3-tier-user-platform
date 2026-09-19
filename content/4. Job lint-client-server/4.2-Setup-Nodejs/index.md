- name: install nodejs
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
    cache-dependency-path: client/package-lock.json

Cài Node.js 20, bật cache npm dựa theo package-lock.json để tăng tốc các lần chạy sau.
