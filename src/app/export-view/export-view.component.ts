import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {DownloadUtils} from '../utils/download-utils';
import {PassDataService} from '../services/pass-data.service';
import {PassNoteExport} from '../model/pass-note-export';


enum ExportScope {
  ES_CATEGORY,
  ES_ALL
}

enum ExportFormat {
  EF_JSON,
  EF_CSV
}

@Component({
    selector: 'app-export-view',
    templateUrl: './export-view.component.html',
    styleUrls: ['./export-view.component.scss'],
    standalone: false
})
export class ExportViewComponent implements OnInit {
  ExportScope = ExportScope;
  ExportFormat = ExportFormat;

  title = 'Export';
  exportBtnName = 'Export';
  closeBtnName = 'Close';

  exportScope: ExportScope = ExportScope.ES_CATEGORY;
  exportFormat: ExportFormat = ExportFormat.EF_JSON;

  constructor(public bsModalRef: BsModalRef, private passDataService: PassDataService) { }

  ngOnInit(): void {
  }

  onExportButtonClick(event: any) {
    event.preventDefault();

    // export data
    let exportData: Array<PassNoteExport> = [];
    let exportName = '';

    switch (this.exportScope) {
      case ExportScope.ES_CATEGORY:
        exportData =  this.passDataService.getSelectedPassCategory().noteList
          .map(value => new PassNoteExport(this.passDataService.getSelectedPassCategory().categoryName, value));
        exportName = this.passDataService.getSelectedPassCategory().categoryName;
        break;
      case ExportScope.ES_ALL:
        this.passDataService.getPassData().categoryList.forEach(
          passCategory => exportData.push(...passCategory.noteList.map(passNote => new PassNoteExport(passCategory.categoryName, passNote)))
        );
//        exportData = [...this.passDataService.getPassData().getPassNoteList()];
        exportName = 'All';
        break;
    }

    if (exportData) {
//      const exportObj = exportData.map(v => JSON.parse(JSON.stringify(v)));
//      exportObj.forEach(v => v.passCategory = v.passCategory.categoryName);

      const exportObj = exportData;

      switch (this.exportFormat) {
        case ExportFormat.EF_JSON:
          DownloadUtils.downloadObjectAsJSON(exportObj, `data_${exportName}.json`);
          break;
        case ExportFormat.EF_CSV:
          DownloadUtils.downloadObjectAsCSV(exportObj, `data_${exportName}.csv`);
          break;
      }
    }

  }

}
