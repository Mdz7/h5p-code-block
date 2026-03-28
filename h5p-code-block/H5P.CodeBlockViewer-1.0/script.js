(function (H5P) {
  function CodeBlockViewer(params, contentId) {
    this.params = params;
    this.contentId = contentId;
  }

  CodeBlockViewer.prototype.attach = function ($container) {
    const code = this.sanitize(this.params.code || "");
    const language = this.params.language || "plaintext";

    const wrapper = document.createElement("div");
    wrapper.className = "h5p-code-wrapper";

    const button = document.createElement("button");
    button.className = "copy-btn";
    button.innerText = "Copiar";

    button.addEventListener("click", () => {
      navigator.clipboard.writeText(code);
      button.innerText = "Copiado!";
      setTimeout(() => (button.innerText = "Copiar"), 1500);
    });

    const pre = document.createElement("pre");
    const codeEl = document.createElement("code");

    codeEl.className = `language-${language}`;
    codeEl.textContent = code;

    pre.appendChild(codeEl);

    wrapper.appendChild(button);
    wrapper.appendChild(pre);

    $container.get(0).appendChild(wrapper);

    if (window.hljs) {
      window.hljs.highlightElement(codeEl);
    }

    if (this.params.showLineNumbers) {
      this.addLineNumbers(pre, code);
    }
  };

  CodeBlockViewer.prototype.sanitize = function (input) {
    return input
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  CodeBlockViewer.prototype.addLineNumbers = function (pre, code) {
    const lines = code.split("\n");
    const lineNumbers = document.createElement("div");
    lineNumbers.className = "line-numbers";

    lines.forEach((_, i) => {
      const line = document.createElement("span");
      line.innerText = i + 1;
      lineNumbers.appendChild(line);
    });

    pre.classList.add("with-lines");
    pre.insertBefore(lineNumbers, pre.firstChild);
  };

  H5P.CodeBlockViewer = CodeBlockViewer;
})(H5P);