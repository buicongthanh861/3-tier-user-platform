trivy fs ./${{ matrix.target }} \
  --format json \
  --output trivy-${{ matrix.target }}-report.json \
  --severity CRITICAL,HIGH \
  --ignore-unfixed \
  --exit-code 0

Quét filesystem của target (client hoặc server), chỉ lấy lỗ hổng mức CRITICAL/HIGH, bỏ qua lỗ hổng chưa có bản vá, xuất JSON.
