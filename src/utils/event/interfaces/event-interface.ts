import { KeyboardEventData } from "../event-utils";

type onKeyboardEvent = (evt: KeyboardEvent) => void;

type EventInputType = 
  "insertText"
  |"insertReplacementText"
  |"insertLineBreak"
  |"insertParagraph"
  |"insertOrderedList"
  |"insertUnorderedList"
  |"insertHorizontalRule"
  |"insertFromYank"
  |"insertFromDrop"
  |"insertFromPaste"
  |"insertTranspose"
  |"insertCompositionText"
  |"insertFromComposition"
  |"insertLink"
  |"deleteByComposition"
  |"deleteCompositionText"
  |"deleteWordBackward"
  |"deleteWordForward"
  |"deleteSoftLineBackward"
  |"deleteSoftLineForward"
  |"deleteEntireSoftLine"
  |"deleteHardLineBackward"
  |"deleteHardLineForward"
  |"deleteByDrag"
  |"deleteByCut"
  |"deleteByContent"
  |"deleteContentBackward"
  |"deleteContentForward"
  |"historyUndo"
  |"historyRedo"
  |"formatBold"
  |"formatItalic"
  |"formatUnderline"
  |"formatStrikethrough"
  |"formatSuperscript"
  |"formatSubscript"
  |"formatJustifyFull"
  |"formatJustifyCenter"
  |"formatJustifyRight"
  |"formatJustifyLeft"
  |"formatIndent"
  |"formatOutdent"
  |"formatRemove"
  |"formatSetBlockTextDirection"
  |"formatSetInlineTextDirection"
  |"formatBackColor"
  |"formatFontColor"
  |"formatFontName"

interface _InputEvent extends InputEvent {
  readonly EventinputType: EventInputType;
}

export {
  onKeyboardEvent,
  EventInputType,
  _InputEvent as InputEvent
}