Mục tiêu

Quét toàn bộ repo để phát hiện secret (API key, password, token...) bị lộ trong code.

Thực hiện
bash
docker run --rm \
  -v "${{ github.workspace }}:/repo" \
  zricethezav/gitleaks:latest detect \
  --source=/repo \
  --report-format=json \
  --report-path=/repo/gitleaks-report.json \
  --redact \
  --exit-code 0
--source=/repo: quét toàn bộ thư mục repo đã checkout.
--redact: che nội dung nhạy cảm trong report, tránh lộ secret thật ngay trong file kết quả.
--exit-code 0: job không fail dù phát hiện secret — hiện chỉ mang tính báo cáo.
