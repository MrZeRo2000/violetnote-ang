import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {DownloadUtils} from '../utils/download-utils';


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
  styleUrls: ['./export-view.component.scss']
})
export class ExportViewComponent implements OnInit {
  ExportScope = ExportScope;
  ExportFormat = ExportFormat;

  title = 'Export';
  exportBtnName = 'Export';
  closeBtnName = 'Close';

  exportScope: ExportScope = ExportScope.ES_CATEGORY;
  exportFormat: ExportFormat = ExportFormat.EF_JSON;

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  onExportButtonClick(event: any) {
    event.preventDefault();
    // DownloadUtils.downloadObjectAsJSON({name: 'name', value: 22}, 'test.json');
    DownloadUtils.downloadObjectAsCSV([{name: 'name', value: 22}], 'test.csv');
  }

}
