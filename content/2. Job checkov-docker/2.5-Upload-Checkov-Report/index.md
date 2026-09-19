- name: Upload Checkov report
  uses: actions/upload-artifact@v4
  with:
    name: checkov-docker-report
    path: checkov-docker-report.json
    if-no-files-found: warn

Lưu report thành artifact checkov-docker-report để xem lại sau.
