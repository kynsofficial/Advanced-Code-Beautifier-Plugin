(function() {
  // Function to add Prism.js and its stylesheet
  function addPrism() {
    var prismScript = document.createElement('script');
    prismScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js';
    document.head.appendChild(prismScript);

    var prismStylesheet = document.createElement('link');
    prismStylesheet.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism.min.css';
    prismStylesheet.rel = 'stylesheet';
    document.head.appendChild(prismStylesheet);
  }

  function applyPrismStyles(editor) {
    var prismStyles = `
      code {
        font-family: Monaco, Consolas, "Andale Mono", "DejaVu Sans Mono", monospace !important;
        font-size: 0.95rem;
        color: #696cff !important;
        font-weight: bold !important;
        background-color: #d6d8ff !important;
      }
      code[class*="language-"], pre[class*="language-"] {
        color: #e2950f !important;
        text-shadow: none !important;
      }
      :not(pre) > code[class*="language-"], pre[class*="language-"]{
        background: #1c2333 !important;
        border: 5px !important;
      }
      .token.tag{
        color: #ed7c97 !important;
      }
      pre.language-markup > code, pre.language-javascript > code,
      pre.language-css > code,pre.language-bash > code {
        background-color: #1c2333 !important;
      }
      .token.punctuation {
        color: #999 !important;
      }
      .token.atrule, .token.attr-value, .token.keyword {
        color: #07a !important;
      }
      .token.selector, .token.attr-name, .token.string, .token.char, .token.builtin, .token.inserted {
        color: #690 !important;
      }
      .token.property, .token.tag, .token.boolean, .token.number, .token.constant, .token.symbol, .token.deleted {
        color: #905 !important;
      }
      .token.comment, .token.prolog, .token.doctype, .token.cdata {
        color: slategray !important;
      }
      .token.operator, .token.entity, .token.url, .language-css .token.string, .style .token.string {
          color: #a67f59;
	  background: hsl(0deg 0% 100% / 0%);
       }
      .token.function {
        color: #DD4A68 !important;
      }
    `;

    var styleTag = document.createElement('style');
    styleTag.type = 'text/css';
    styleTag.innerHTML = prismStyles;
    editor.getDoc().head.appendChild(styleTag);
  }

  tinymce.create('tinymce.plugins.code_snippet', {
    init: function(editor, url) {
      // Apply Prism styles on editor initialization
      editor.on('init', function() {
        applyPrismStyles(editor);
      });

     // Double-click event listener
editor.on('dblclick', function(e) {
  // Find the closest parent element with the class 'code-snippet-container'
  var container = e.target.closest('.code-snippet-container');

  // Check if the closest container is found
  if (container) {
    // Extract the code content from the container
    var codeContent = container.querySelector('code').innerText;
  
      // Extract the language class (e.g., "language-javascript")
    var languageClass = container.querySelector('code').className.match(/language-(\w+)/);

    // Extract the language from the class (e.g., "javascript" from "language-javascript")
    var language = languageClass ? languageClass[1] : null;

  
          // Reopen the modal window with the extracted code for editing
          editor.windowManager.open({
            title: 'Edit Code Snippet',
            width: 800,
            height: 500,
            body: [
              {
                type: 'listbox',
                name: 'language',
                label: 'Language',
                values: [
                  { text: 'HTML', value: 'markup' },
                  { text: 'CSS', value: 'css' },
                  { text: 'JavaScript', value: 'javascript' },
                  { text: 'PHP', value: 'php' },
                  { text: 'Python', value: 'python' },
                  { text: 'C', value: 'c' },
                  { text: 'C++', value: 'cpp' },
                  { text: 'C#', value: 'csharp' },
                  { text: 'Ruby', value: 'ruby' },
                  { text: 'Java', value: 'java' },
                  { text: 'Go', value: 'go' },
                  { text: 'Bash', value: 'bash' },
                  { text: 'Swift', value: 'swift' },
                  { text: 'TypeScript', value: 'typescript' },
                  { text: 'Kotlin', value: 'kotlin' },
                  { text: 'Rust', value: 'rust' },
                  { text: 'SQL', value: 'sql' },
                  { text: 'Perl', value: 'perl' }
                ],
                        value: language // Set the selected language

              },
              {
                type: 'textbox',
                name: 'code',
                multiline: true,
                minWidth: 550,
                minHeight: 400,
                value: codeContent // Pre-populate the dialog with the code content
              }
            ],
            buttons: [
              {
                text: 'Would like your user to run the code within your content instead?',
                onclick: function() {
                  window.open('https://playground.aptlearn.io/code/web', '_blank');
                },
                tooltip: 'Create a CodePen Here'
              },
              {
                text: 'OK',
                subtype: 'primary',
                onclick: 'submit'
              },
              {
                text: 'Cancel',
                onclick: 'close'
              }
            ],
            onsubmit: function(e) {
              // ... Prepare and replace the code snippet as before
              var code = e.data.code;
              var languageClass = 'language-' + e.data.language;
              var formattedCode = '<pre class="' + languageClass + '"><code class="' + languageClass + '">' + Prism.highlight(code, Prism.languages[e.data.language]) + '</code></pre>';
              var nonEditableContainer = '<div contentEditable="false" class="code-snippet-container">' + formattedCode + '</div>';
              editor.insertContent(nonEditableContainer);

              // Apply Prism highlighting to the TinyMCE editor's content
              Prism.highlightAllUnder(editor.getDoc());
              Prism.highlightAll();
            }
          });
        }
      });

      editor.addButton('code_snippet', {
        title: 'Insert Code Snippet',
        image: url + '/icon.png',
        onclick: function() {
          var selectedNode = editor.selection.getNode();
          var codeNode = selectedNode.tagName === 'CODE' ? selectedNode : editor.dom.getParent(selectedNode, 'code');

          if (codeNode) {
            editor.dom.remove(codeNode, true);
            return;
          }

          var selectedText = editor.selection.getContent({ format: 'text' });
          if (selectedText) {
            editor.insertContent('<code>' + selectedText + '</code>');
            return;
          }

          // Rest of the onclick function code
          editor.windowManager.open({
            title: 'Insert Code Snippet',
            width: 800,
            height: 500,
            body: [
              {
                type: 'listbox',
                name: 'language',
                label: 'Language',
                values: [
                  { text: 'HTML', value: 'markup' },
                  { text: 'CSS', value: 'css' },
                  { text: 'JavaScript', value: 'javascript' },
                  { text: 'PHP', value: 'php' },
                  { text: 'Python', value: 'python' },
                  { text: 'C', value: 'c' },
                  { text: 'C++', value: 'cpp' },
                  { text: 'C#', value: 'csharp' },
                  { text: 'Ruby', value: 'ruby' },
                  { text: 'Java', value: 'java' },
                  { text: 'Go', value: 'go' },
                  { text: 'Bash', value: 'bash' },
                  { text: 'Swift', value: 'swift' },
                  { text: 'TypeScript', value: 'typescript' },
                  { text: 'Kotlin', value: 'kotlin' },
                  { text: 'Rust', value: 'rust' },
                  { text: 'SQL', value: 'sql' },
                  { text: 'Perl', value: 'perl' }
                ]
              },
              {
                type: 'textbox',
                name: 'code',
                multiline: true,
                minWidth: 550,
                minHeight: 400
              }
            ],
            buttons: [
              {
                text: 'Would like your user to run the code within your content instead?',
                onclick: function() {
                  window.open('https://playground.aptlearn.io/code/web', '_blank');
                },
                tooltip: 'Create a CodePen Here'
              },
              {
                text: 'OK',
                subtype: 'primary',
                onclick: 'submit'
              },
              {
                text: 'Cancel',
                onclick: 'close'
              }
            ],
            onsubmit: function(e) {
              var code = e.data.code;
              var languageClass = 'language-' + e.data.language;
              var formattedCode = '<pre class="' + languageClass + '"><code class="' + languageClass + '">' + Prism.highlight(code, Prism.languages[e.data.language]) + '</code></pre>';
              var nonEditableContainer = '<div contentEditable="false" class="code-snippet-container">' + formattedCode + '</div>';
              editor.insertContent(nonEditableContainer);

              // Apply Prism highlighting to the TinyMCE editor's content
              Prism.highlightAllUnder(editor.getDoc());
              Prism.highlightAll();
            }
          });
        }
      });
    },

    createControl: function(n, cm) {
      return null;
    },
    getInfo: function() {
      return {
        longname: 'Code Snippet Button',
        author: 'Aptlearn',
        version: '1.0'
      };
    }
  });

  tinymce.PluginManager.add('code_snippet', tinymce.plugins.code_snippet);
})();

addPrism(); // Call the function to add Prism.js and its stylesheet

