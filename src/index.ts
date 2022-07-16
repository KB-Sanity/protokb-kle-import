import { ProtoPlugin } from "@kb-sanity/proto-kb-types";
import { ProtoAPI } from "@kb-sanity/proto-kb-types/api";
import { KLERows, parseData } from "./kle";

export default class ImportKLEPlugin implements ProtoPlugin {
  public static title = "KLE Import";
  public static description = "Proto KB plugin that allow to import KLE layouts";
  public static id = "com.protokb.kle_import";

  constructor(public api: ProtoAPI) {
    api.toolbar.registerButtons(this, [
      {
        name: 'Import KLE layout',
        icon: 'Download',
        onClick: this._handleImportKleLayout,
      }
    ])
  }

  private _handleImportKleLayout = () => {
    this.api.utils.pickFile('application/JSON').then((file) => {
      const fileReader = new FileReader();
      fileReader.onload = (event: ProgressEvent) => {
        const reader = event.target as FileReader;
        if (reader.result) {
        const rows: KLERows = JSON.parse(reader.result as string);
        for (const key of parseData(rows)) {
          if ('position' in key) {
          this.api.layoutEditor.getKeyboard().addKeyCap({
            position: key.position,
            size: key.size,
            pivot: key.pivot,
            angle: key.angle,
            legends: key.legends,
            color: key.color,
          });
          } else {
          this.api.layoutEditor.getKeyboard().setMetadata(key);
          }
        }
        }
      };
      fileReader.readAsText(file);
    });
  }
}
