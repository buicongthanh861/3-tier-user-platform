trivy fs ./${{ matrix.target }} \
  --format table \
  --severity CRITICAL,HIGH \
  --ignore-unfixed \
  --exit-code 0 > trivy-${{ matrix.target }}-report.table.txt

Chạy lại scan với format bảng, dễ đọc trực tiếp trong log/artifact hơn JSON.
