var H5P = H5P || {};

H5P.CodeBlock = (function ($) {
  function C(options, id) {
    this.options = options;
    this.id = id;
  }

  C.prototype.attach = function ($container) {
    const codeWrapper = document.createElement('div');
    codeWrapper.className = 'h5p-code-block-wrapper';

    // Inyectamos la estructura estándar compatible con highlight.min.js
    // this.options.codeText viene de semantics.json
    codeWrapper.innerHTML = `
      <pre>
        <code class="language-${this.options.language}">
          ${this.options.codeText}
        </code>
      </pre>
    `;

    // Añadir al contenedor
    $container.addClass('h5p-code-block').html('').append(codeWrapper);

    // Activamos HighlightJS para que procese el código recién añadido
    if (window.hljs) {
      window.hljs.highlightAllUnder(codeWrapper);
    } else {
      console.error("H5P.CodeBlock: 'hljs' (HighlightJS) no se cargó correctamente.");
    }
  };

  return C;
})(H5P.jQuery);