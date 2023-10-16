import styles from './scss/outer.scss?css-url';

if (import.meta.hot) {
  import.meta.hot.accept('./scss/outer.scss?css-url', (module: any) => {
    const styles = module.default;

    if (typeof styles !== "string") {
      import.meta.hot?.invalidate();
      return;
    }

    updateBody(styles);
  })
}

async function updateBody(styles: string) {
  let response = await fetch(styles);
  let content = await response.text();

  document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <p>The bundled CSS content is</p>
  <pre>${content}</pre>
  `
}

updateBody(styles);
