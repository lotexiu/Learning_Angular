import { copy } from "../natives/object/object-utils";

class HTMLUtils {
  
  static focusUntilSuccess(element: HTMLElement|string, maxAttempts: number = 5): void {
    setTimeout(()=>{
      let el: HTMLElement;
      if (typeof element === 'string') {
        el = document.querySelector(element)!
      } else {
        el = element;
      }
      if (el) {
        el.focus();
      }
      if (document.activeElement !== el && maxAttempts > 0) {
        HTMLUtils.focusUntilSuccess(el, maxAttempts - 1);
      }
    })
  }
}

export {
  HTMLUtils,
}

const {
  focusUntilSuccess
} = copy(HTMLUtils)

export {
  focusUntilSuccess
}