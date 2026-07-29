import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {MatIconButton} from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {TooltipUtils} from '../../utils/tooltip-utils';

@Component({
  selector: 'app-copy-user-password-panel',
    imports: [
        MatIconModule,
        MatTooltipModule,
        MatIconButton,
    ],
  templateUrl: './copy-user-password-panel.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './copy-user-password-panel.scss'
})
export class CopyUserPasswordPanel {
  @Input()
  user?: string

  @Input()
  password?: string;

  buttonCopyToClipboard = TooltipUtils.buttonCopyToClipboard;
}
