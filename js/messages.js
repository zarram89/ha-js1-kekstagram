// js/messages.js
const body = document.body;

function createFromTemplate(id) {
  const tpl = document.querySelector(`#${id}`).content.firstElementChild.cloneNode(true);
  body.append(tpl);
  return tpl;
}

function bindCommonCloseHandlers(root, closeBtnSelector) {
  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      root.remove();
      document.removeEventListener('keydown', onKeyDown);
    }
  };
  document.addEventListener('keydown', onKeyDown);

  // клик вне блока
  root.addEventListener('click', (e) => {
    if (e.target === root) {
      root.remove();
      document.removeEventListener('keydown', onKeyDown);
    }
  });

  // клик по кнопке
  if (closeBtnSelector) {
    const btn = root.querySelector(closeBtnSelector);
    if (btn) btn.addEventListener('click', () => {
      root.remove();
      document.removeEventListener('keydown', onKeyDown);
    });
  }
}

export function showSuccess() {
  const node = createFromTemplate('success');
  bindCommonCloseHandlers(node, '.success__button');
}

export function showError() {
  const node = createFromTemplate('error');
  bindCommonCloseHandlers(node, '.error__button');
}

export function showDataError() {
  const node = createFromTemplate('data-error');
  setTimeout(() => node.remove(), 5000);
}
