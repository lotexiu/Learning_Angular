import { ObjectUtils } from "./object-utils"

const Clipboard = navigator.clipboard

class ClipboardUtils {
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Clipboard/read) */
    static read(): Promise<ClipboardItems>{
      return Clipboard.read()
    }
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Clipboard/readText) */
    static readText(): Promise<string>{
      return Clipboard.readText()
    }
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Clipboard/write) */
    static write(data: ClipboardItems): Promise<void>{
      return Clipboard.write(data)
    }
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/Clipboard/writeText) */
    static writeText(data: string): Promise<void>{
      return Clipboard.writeText(data);
    }
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener) */
    static addEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: AddEventListenerOptions | boolean): void{
      Clipboard.addEventListener(type, callback, options)
    }
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent) */
    static removeEventListener(type: string, callback: EventListenerOrEventListenerObject | null, options?: EventListenerOptions | boolean): void{
      Clipboard.removeEventListener(type, callback, options)
    }
    /** [MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/removeEventListener) */
    static dispatchEvent(event: Event): boolean{
      return Clipboard.dispatchEvent(event)
    }
}

const {
  clipAddEventListener,
  clipDispatchEvent,
  clipRead,
  clipReadText,
  clipRemoveEventListener,
  clipWrite,
  clipWriteText,
} = ObjectUtils.concatStrIntoFunctions(ClipboardUtils,'clip');

export {
  clipAddEventListener, 
  Clipboard,
  ClipboardUtils, 
  clipDispatchEvent,
  clipRead,
  clipReadText,
  clipRemoveEventListener,
  clipWrite,
  clipWriteText,
}