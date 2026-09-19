- name: install nodejs
  uses: actions/setup-node@v4
  with:
    node-version: '20'
    cache: 'npm'
    cache-dependency-path: server/package-lock.json

setup nodejs
