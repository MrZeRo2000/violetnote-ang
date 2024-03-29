import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faCheckCircle,
  faClone, faEllipsisH,
  faFileExport,
  faLock,
  faPen,
  faPlusCircle,
  faSave, faSearch,
  faSignInAlt,
  faSignOutAlt, faSpinner, faTimes,
  faTrash, faWindowClose,
  faFilter,
  faClipboard,
  faUser,
  faKey,
  faGears
} from '@fortawesome/free-solid-svg-icons';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FontAwesomeModule
  ],
  exports: [
    FontAwesomeModule
  ]
})
export class FontAwesomeIconsModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faLock, faSignInAlt, faSignOutAlt, faSave, faFileExport, faPlusCircle, faTrash, faPen, faClone, faSpinner, faSearch,
      faCheckCircle, faWindowClose, faEllipsisH, faTimes, faFilter, faClipboard, faUser, faKey, faGears);
  }
}
