3.7-Upload-Trivy-Report-Table
yaml
- name: Upload Trivy report (Table)
  uses: actions/upload-artifact@v4
  with:
    name: trivy-${{ matrix.target }}-report-table
    path: trivy-${{ matrix.target }}-report.table.txt
    if-no-files-found: warn
