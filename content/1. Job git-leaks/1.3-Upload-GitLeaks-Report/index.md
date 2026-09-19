Mục tiêu

Lưu lại kết quả scan làm artifact để tham khảo/audit sau này.

Thực hiện
yaml
- name: Upload GitLeaks report
  uses: actions/upload-artifact@v4
  with:
    name: gitleaks-report
    path: gitleaks-report.json
    if-no-files-found: warn

if-no-files-found: warn giúp job không fail nếu vì lý do nào đó file report không được tạo ra.

Kết quả

Artifact gitleaks-report.json xuất hiện trong tab Artifacts của GitHub Actions run, có thể tải về xem chi tiết.
