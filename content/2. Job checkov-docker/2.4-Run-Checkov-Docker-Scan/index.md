checkov -d . --framework dockerfile --quiet --output json > checkov-docker-report.json || true
-d .: quét toàn bộ thư mục repo.
--framework dockerfile: chỉ quét Dockerfile, bỏ qua các framework khác (Terraform, Kubernetes...).
|| true: đảm bảo job luôn pass dù Checkov phát hiện lỗi hoặc trả về exit code khác 0.
