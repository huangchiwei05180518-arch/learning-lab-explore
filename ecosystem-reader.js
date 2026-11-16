(() => {
  const source = document.querySelector('[data-book-source]');
  const stage = document.querySelector('[data-book-stage]');
  const controls = document.querySelector('[data-book-controls]');
  if (!source || !stage || !controls) return;

  const prev = controls.querySelector('[data-prev]');
  const next = controls.querySelector('[data-next]');
  const picker = controls.querySelector('select');
  const counter = document.querySelector('[data-book-number]');
  const spreads = Array.from(source.querySelectorAll('[data-spread]'));
  const ruler = document.createElement('section');
  ruler.className = 'book-slide book-ruler';
  ruler.setAttribute('aria-hidden', 'true');
  ruler.inert = true;
  let pages = [];
  let current = 0;
  let visible;
  let frame;

  function render(page, target, measuring = false) {
    const content = page.blocks.map(block => block.cloneNode(true));
    if (measuring) {
      for (const block of content) {
        if (block.matches('details')) block.open = true;
        for (const radio of block.querySelectorAll('input[type="radio"]')) {
          radio.removeAttribute('name');
        }
        for (const node of block.querySelectorAll('[id]')) node.removeAttribute('id');
        if (block.matches('[id]')) block.removeAttribute('id');
      }
    }
    target.replaceChildren(page.title.cloneNode(true), ...content);
  }

  function fits(page) {
    render(page, ruler, true);
    return ruler.offsetHeight <= stage.clientHeight;
  }

  function buildPages() {
    const result = [];
    for (const spread of spreads) {
      const [title, ...children] = spread.children;
      const blocks = children.filter(block => !block.matches('.field-jump'));
      if (!title || !blocks.length) continue;
      let page = { key: spread.dataset.spread, title, first: 0, blocks: [] };
      for (const [index, block] of blocks.entries()) {
        const candidate = { ...page, blocks: [...page.blocks, block] };
        if (!page.blocks.length || fits(candidate)) {
          page = candidate;
          continue;
        }
        result.push(page);
        page = { ...page, first: index, blocks: [block] };
      }
      result.push(page);
    }
    return result;
  }

  function requestedPage() {
    const hash = location.hash.slice(1);
    if (hash === 'habitats') return { key: 'habitats', first: 0 };
    const match = /^page=([a-z\d-]+)(?:\.(\d+))?$/.exec(hash);
    return match && { key: match[1], first: Number(match[2] || 0) };
  }

  function locate(position) {
    if (!position) return 0;
    const index = pages.findLastIndex(page => page.key === position.key && page.first <= position.first);
    return Math.max(0, index);
  }

  function show(index, write = false) {
    current = Math.min(Math.max(index, 0), pages.length - 1);
    const page = pages[current];
    if (!page) return;
    if (!visible) {
      visible = document.createElement('section');
      visible.className = 'book-slide book-visible';
      stage.append(visible);
    }
    render(page, visible);
    stage.classList.toggle('book-overflow', !fits(page));
    ruler.replaceChildren();
    stage.scrollTop = 0;
    prev.disabled = current === 0;
    next.disabled = current === pages.length - 1;
    picker.value = String(current);
    counter.textContent = `${current + 1} / ${pages.length}`;
    if (write) {
      const hash = page.key === 'habitats' && page.first === 0 ? 'habitats' : `page=${page.key}${page.first ? '.' + page.first : ''}`;
      history.replaceState(history.state, '', '#' + hash);
    }
  }

  function repaginate() {
    const position = pages[current] || requestedPage();
    const heightRatio = stage.clientHeight < 310 ? 0.28 : 0.38;
    stage.style.setProperty('--book-photo-height', `${Math.round(stage.clientHeight * heightRatio)}px`);
    pages = buildPages();
    picker.replaceChildren(...pages.map((page, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = `${index + 1} · ${page.title.textContent}`;
      return option;
    }));
    show(locate(position));
  }

  prev.addEventListener('click', () => show(current - 1, true));
  next.addEventListener('click', () => show(current + 1, true));
  picker.addEventListener('change', () => show(Number(picker.value), true));
  window.addEventListener('hashchange', () => show(locate(requestedPage())));
  document.addEventListener('keydown', event => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.target.closest?.('button, select, summary, input, textarea, [contenteditable]')) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowLeft' ? -1 : 1), true);
    }
  });

  source.remove();
  stage.hidden = false;
  controls.hidden = false;
  counter.hidden = false;
  document.body.classList.add('book-ready');
  stage.append(ruler);
  repaginate();
  new ResizeObserver(() => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(repaginate);
  }).observe(stage);
})();
