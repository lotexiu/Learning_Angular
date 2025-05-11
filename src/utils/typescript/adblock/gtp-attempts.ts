function BruteAdBlockPopup(){
  document.addEventListener('click', evt => {
    const a = evt.target.closest('a[href]');
    if (a) {
      evt.preventDefault();
      chrome.tabs.create({url: a.href, active: false});
    }
  });

  Object.defineProperty(window, 'open', {
      configurable: false,
      writable: false,
      value: function(...args) {
          const url = args[0];
          console.warn('Tentativa de abrir janela bloqueada:', url);
      }
  });

  if ($) {
    $(document).on('click', 'a', function(event) {
        const href = $(this).attr('href');
        const target = $(this).attr('target');
  
        if (target === '_blank' && href && !href.includes('meusite.com')) {
            event.preventDefault();
            event.stopImmediatePropagation();
            console.warn('Bloqueado link suspeito:', href);
        }
    });
  }
}