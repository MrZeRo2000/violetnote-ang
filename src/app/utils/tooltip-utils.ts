import {MatTooltip} from '@angular/material/tooltip';

export class TooltipUtils {
  public static copyToClipboard(value: string | null | undefined, toolTip: MatTooltip) {
    if (value) {
      navigator.clipboard.writeText(value).then(() => {
        toolTip.disabled = false
        toolTip.show()
        setTimeout(() => {
          toolTip.disabled = true
        }, 1000)
      })
    }
  }

  public static buttonCopyToClipboard(event: any, value: string | null | undefined, toolTip: MatTooltip) {
    event.stopPropagation();
    TooltipUtils.copyToClipboard(value, toolTip);
  }
}
