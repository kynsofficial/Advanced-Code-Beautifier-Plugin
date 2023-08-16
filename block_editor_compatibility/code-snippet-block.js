(function(wp) {
  var registerBlockType = wp.blocks.registerBlockType;
  var SelectControl = wp.components.SelectControl;
  var TextareaControl = wp.components.TextareaControl;
  var Button = wp.components.Button;
  var Modal = wp.components.Modal;
  var el = wp.element.createElement;
  var registerFormatType = wp.richText.registerFormatType; // Added for custom format
  var toggleFormat = wp.richText.toggleFormat; // Added for toggling format
  var RichTextToolbarButton = wp.blockEditor.RichTextToolbarButton; // Added for custom toolbar button


  var previewImagePath = '/wp-content/plugins/code_snippet/block_editor_compatibility/preview.png';

  var customIcon = el('svg', { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 178.53 206.09" },
    el('g', { id: "Layer_2", "data-name": "Layer 2" },
      el('g', { id: "Layer_1-2", "data-name": "Layer 1" },
        el('path', { d: "M117.14,35.51a27.88,27.88,0,0,1-55.75,0c.74.06,1.41.15,2,.24a48.21,48.21,0,0,1,23,10,4.33,4.33,0,0,0,5.73,0,49,49,0,0,1,12.64-7.26A45.38,45.38,0,0,1,117.14,35.51Z" }),
        el('polygon', { points: "178.53 121.19 127.86 171.85 127.86 148.05 154.84 121.19 127.86 94.21 127.86 70.4 150.3 92.85 178.53 121.19" }),
        el('polygon', { points: "50.67 94.21 23.69 121.19 50.67 148.05 50.67 171.85 0 121.19 28.23 92.85 50.67 70.4 50.67 94.21" }),
        el('path', { d: "M61.44,88.9v89.41a27.75,27.75,0,0,0,22.44,27.21,27.36,27.36,0,0,0,5.33.57,25,25,0,0,0,3.55-.29Z" }),
        el('path', { d: "M71.3,70.4l34.8,129.89a27.55,27.55,0,0,0,11-22V70.4Z" }),
        el('path', { d: "M61.55,31.08c.3-3.57,1.33-9.95,3-13.28.35-.7.75-.71,1.41-.5,7.26,2.26,14.53,4.49,21.8,6.76a4.83,4.83,0,0,0,3,0c7.27-2.26,14.54-4.48,21.8-6.75a1,1,0,0,1,1.5.65c1.56,3.2,2.55,9.44,2.9,13,.08.79-.1,1.11-.93,1.16a44.79,44.79,0,0,0-13.47,3,48.55,48.55,0,0,0-12.44,7.14,1.16,1.16,0,0,1-1.73,0,47.26,47.26,0,0,0-22.64-9.82c-1.17-.17-2.35-.29-3.53-.38C61.66,32,61.45,31.76,61.55,31.08Z" }),
        el('path', { d: "M121.67,11.43,95.45,19.52C93.81,20,92.17,20.6,90.51,21a4.63,4.63,0,0,1-2.22,0L56.85,11.37c-.32-.1-.67-.11-.69-.65a.79.79,0,0,1,.66-.86C58.49,9.32,79.2,2.92,87.89.23a4.9,4.9,0,0,1,3,0l30.56,9.44c.38.1.83.13.87.7S122.28,11.26,121.67,11.43Z" })
      )
    )
  );


  var languages = [
    { label: 'HTML', value: 'markup' },
    { label: 'CSS', value: 'css' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'PHP', value: 'php' },
    { label: 'Python', value: 'python' },
    { label: 'C', value: 'c' },
    { label: 'C++', value: 'cpp' },
    { label: 'C#', value: 'csharp' },
    { label: 'Ruby', value: 'ruby' },
    { label: 'Java', value: 'java' },
    { label: 'Go', value: 'go' },
    { label: 'Bash', value: 'bash' },
    { label: 'Swift', value: 'swift' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'Kotlin', value: 'kotlin' },
    { label: 'Rust', value: 'rust' },
    { label: 'SQL', value: 'sql' },
    { label: 'Perl', value: 'perl' }
  ];

// Define the custom Prism styles
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
   pre.language-markup > code,
   pre.language-javascript > code,
   pre.language-css > code,
   pre.language-bash > code,
   pre.language-php > code,
   pre.language-python > code,
   pre.language-c > code,
   pre.language-cpp > code,
   pre.language-csharp > code,
   pre.language-ruby > code,
   pre.language-java > code,
   pre.language-go > code,
   pre.language-swift > code,
   pre.language-typescript > code,
   pre.language-kotlin > code,
   pre.language-rust > code,
   pre.language-sql > code,
   pre.language-perl > code
 {
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
        color: #a67f59 !important;
      }
      .token.function {
        color: #DD4A68 !important;
      }  `;

  // Add the custom Prism styles to the block editor
  var styleTag = document.createElement('style');
  styleTag.type = 'text/css';
  styleTag.innerHTML = prismStyles;
  document.head.appendChild(styleTag);


  registerBlockType('code-snippet/code-snippet-block', {
    title: 'Insert Code Snippet',
    description: 'Easily insert code snippets with syntax highlighting into your posts.',
    icon: customIcon,
    category: 'common',
    attributes: {
      codeSnippet: {
        type: 'string',
        default: ''
      }
    },
  
  
   edit: function(props) {
  var [isOpen, setOpen] = wp.element.useState(false);
  var [language, setLanguage] = wp.element.useState('markup');
  var [code, setCode] = wp.element.useState('');

  // Function to handle double click on the block
  function handleDoubleClick() {
    openModal();
  }

  // Function to open the modal with existing code snippet and language
  function openModal() {
    var codeSnippetContainer = document.createElement('div');
    codeSnippetContainer.innerHTML = props.attributes.codeSnippet || '';
    var existingCode = codeSnippetContainer.querySelector('code')?.innerText || '';
    var existingLanguageClass = codeSnippetContainer.querySelector('code')?.className.match(/language-(\w+)/);
    var existingLanguage = existingLanguageClass ? existingLanguageClass[1] : 'markup';

    // Set the state with the existing content and language
    setCode(existingCode);
    setLanguage(existingLanguage);

    // Open the modal
    setOpen(true);
  }

  // Attach the double click event listener to all blocks of the specified type
wp.element.useEffect(() => {
  var blockElements = document.querySelectorAll("[data-type='code-snippet/code-snippet-block']");
  blockElements.forEach((blockElement) => {
    blockElement.addEventListener('dblclick', function() {
      handleDoubleClick(blockElement); // Pass the specific block element to the handler
    });
  });

  return function cleanup() {
    blockElements.forEach((blockElement) => {
      blockElement.removeEventListener('dblclick', function() {
        handleDoubleClick(blockElement); // Pass the specific block element to the handler
      });
    });
  };
}, []);

// Modify the handleDoubleClick function to accept the block element
function handleDoubleClick(blockElement) {
  // Use the specific block element to find the code snippet and language
  var codeSnippetContainer = blockElement.querySelector('.code-snippet-container');
  if (codeSnippetContainer) {
    var codeContent = codeSnippetContainer.querySelector('code').innerText;
    var languageClass = codeSnippetContainer.querySelector('code').className.match(/language-(\w+)/);
    var detectedLanguage = languageClass ? languageClass[1] : null;

    // Set the state with the detected content and language
    setCode(codeContent);
    setLanguage(detectedLanguage || 'markup');

    // Open the modal
    setOpen(true);
  }
}
   
   

  return [
    el(Button, {
      onClick: openModal // Open modal
    }, 'Insert Code Snippet'),
    isOpen && el(
      Modal, {
        title: 'Insert Code Snippet',
        onRequestClose: function() { setOpen(false); },
        style: { width: '750px', height: '700px' } // Custom dimensions
      },
      el(SelectControl, { label: 'Language', value: language, options: languages, onChange: setLanguage }),
      el(TextareaControl, { label: 'Code', value: code, onChange: setCode, style: { height: '380px' } }), // Increased height
      el(Button, {
        isPrimary: true,
        onClick: function() {
          var escapedCode = code.replace(/</g, '<').replace(/>/g, '>');
          var formattedCode = '<pre class="language-' + language + '"><code class="language-' + language + '">' + Prism.highlight(escapedCode, Prism.languages[language]) + '</code></pre>';
          var nonEditableContainer = '<div contentEditable="false" class="code-snippet-container">' + formattedCode + '</div>';
          props.setAttributes({ codeSnippet: nonEditableContainer });
          setOpen(false);
        }
      }, 'Insert Code Snippet'),
      el(Button, {
        isSecondary: true,
        onClick: function() { window.open('https://playground.aptlearn.io/code/web', '_blank'); }
      }, 'Create a CodePen Here')
    ),
    el('div', { dangerouslySetInnerHTML: { __html: props.attributes.codeSnippet || '' } })
  ];
},
  
   save: function(props) {
      // This save function will render the content on the frontend
      return wp.element.createElement('div', { dangerouslySetInnerHTML: { __html: props.attributes.codeSnippet || '' } });
    },
  
    example: {
      attributes: {
        codeSnippet: '<pre class="language-js"><code class="language-js">function greet() { alert("Hello, World!, this is a JavaScript alert function, you can use this plugin to add code to your content."); }</code></pre>'
      }
    },
    preview: {
      image: {
        src: previewImagePath
      }
    }
  });
})(window.wp);

