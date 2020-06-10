export class DownloadUtils {

  public static downloadObjectAsJSON(exportObj, exportName) {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));

    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute('href',     dataStr);
    downloadAnchorNode.setAttribute('download', exportName);

    document.body.appendChild(downloadAnchorNode); // required for firefox

    downloadAnchorNode.click();

    downloadAnchorNode.remove();
  }

  public static downloadObjectAsCSV(exportObj, exportName) {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(exportObj[0]);
    const csv = exportObj.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    const csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], {type: 'text/csv' }),
      url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = exportName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }

}
