Mục tiêu

Lấy toàn bộ source code của repo về runner để GitLeaks có dữ liệu quét.

Thực hiện
yaml
- name: Checkout source code
  uses: actions/checkout@v4

Sử dụng action chính thức actions/checkout@v4, mặc định checkout đúng commit vừa push.
