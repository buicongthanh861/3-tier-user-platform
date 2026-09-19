CI Pipeline — 3-Tier User Platform

Trang này tóm tắt toàn bộ giai đoạn CI (Continuous Integration) của pipeline, định nghĩa tại .github/workflows/qa-cicd.yaml. Pipeline được kích hoạt khi có push vào nhánh qa với thay đổi trong client/, server/ hoặc chính file workflow.

Giai đoạn CD (build/push Docker image lên ECR, cập nhật GitOps manifest) được trình bày ở phần riêng.

Pipeline gồm 6 job chạy tuần tự/song song: git-leaks chạy đầu tiên, sau đó checkov-docker và trivy-scan chạy song song, tiếp theo là lint-client/lint-server và testcase-client/testcase-server, cuối cùng là client-build.

1-GitLeaks-Secret-Scan

Quét toàn bộ repo để phát hiện secret (API key, password, token) bị commit nhầm. Chạy image zricethezav/gitleaks:latest, redact nội dung nhạy cảm trong report. Gồm 3 bước: Checkout → Run scan → Upload report (gitleaks-report.json). --exit-code 0 nên job hiện chỉ mang tính báo cáo, chưa chặn pipeline.

2-Checkov-Docker-Scan

Quét Dockerfile bằng Checkov để phát hiện misconfiguration bảo mật trước khi build image. Gồm 5 bước: Checkout → Setup Python → Install Checkov → Run scan (--framework dockerfile) → Upload report. Chạy kèm || true nên không chặn pipeline. Hiện chưa có Checkov cho Terraform/Kubernetes.

3-Trivy-Filesystem-Scan

Quét lỗ hổng dependency (CVE) mức CRITICAL/HIGH cho cả client và server, chạy song song theo matrix. Gồm 7 bước: Checkout → Install Trivy → Verify → Scan JSON → Scan Table → Upload JSON → Upload Table. Bỏ qua lỗ hổng chưa có bản vá (--ignore-unfixed), không chặn pipeline.

4-Lint

Kiểm tra coding convention cho cả frontend và backend (lint-client, lint-server). Gồm 4 bước: Checkout → Setup Node.js 20 → Install dependencies (npm ci) → Run lint (npm run lint --if-present). Hiện package.json chưa khai báo script lint nên bước này tự động bị bỏ qua.

5-Testcase

Chạy unit test cho cả frontend và backend (testcase-client, testcase-server). Gồm 4 bước tương tự Lint, kết thúc bằng npm test --if-present. Cũng đang bị bỏ qua vì chưa có script test.

6-Client-Build

Build bundle production cho React frontend, chuẩn bị cho bước build Docker image ở giai đoạn CD. Gồm 4 bước: Checkout → Setup Node.js 20 → Install dependencies → Build (npm run build --if-present). Server không có job build riêng trong CI — image backend được build trực tiếp ở job CD.

Ghi chú

Job sonarqube-scan hiện đang comment out hoàn toàn, chưa hoạt động. Các bước scan bảo mật (GitLeaks, Checkov, Trivy) đều đang chạy ở chế độ báo cáo (--exit-code 0 / || true), chưa chặn pipeline khi phát hiện lỗi — có thể siết chặt thêm sau này. Lint và Test hiện chưa có tác dụng thực tế do package.json chưa khai báo script tương ứng.
