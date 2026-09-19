- name: Upload Trivy report (JSON)
  uses: actions/upload-artifact@v4
  with:
    name: trivy-${{ matrix.target }}-report
    path: trivy-${{ matrix.target }}-report.json
    if-no-files-found: warn
