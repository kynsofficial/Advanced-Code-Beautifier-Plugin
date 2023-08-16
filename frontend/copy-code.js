document.addEventListener("DOMContentLoaded", function() {
    setTimeout(function() {
        var codeBlocks = document.querySelectorAll(
            "pre > code[class*='language-'], :not(pre) > code[class*='language-']"
        );

        codeBlocks.forEach(function(block) {
            var language = block.className.match(/language-(\w+)/)[1];
            var preElement = block.parentNode;

            // Create a container to wrap the header and code block
            var container = document.createElement('div');
            container.style.position = 'relative';

            // Create the header
            var header = document.createElement('div');
            header.classList.add('code-header');
            header.style.display = 'flex';
            header.style.justifyContent = 'space-between';
            header.style.backgroundColor = '#343541';
            header.style.color = '#1c2333';
            header.style.padding = '7px';
            header.style.width = '100%';
            header.style.boxSizing = 'border-box';

            var languageIndicator = document.createElement('span');
            languageIndicator.innerHTML = language.toLowerCase();
            languageIndicator.classList.add('language-indicator');
            languageIndicator.style.fontWeight = 'bold';
            languageIndicator.style.color = '#fff';
            languageIndicator.style.fontSize = '0.8rem';
            languageIndicator.style.alignSelf = 'center';

            var button = document.createElement('span');
            button.classList.add('copy-button');
            button.style.background = 'none';
            button.style.setProperty('color', '#ffffff', 'important');
            button.style.cursor = 'pointer';
            button.style.padding = '5px';
            button.style.fontSize = '0.8rem';
            button.style.border = 'none';
            button.style.alignSelf = 'center';

            // Create the Font Awesome icon element for the regular clipboard icon
            var icon = document.createElement('i');
            icon.className = 'far fa-clipboard'; // This class adds the regular clipboard icon

            // Append the icon to the button
            button.appendChild(icon);

            // Create a text span to hold the "Copy code" text
            var textSpan = document.createElement('span');
            textSpan.innerHTML = ' Copy code';
            button.appendChild(textSpan);

            button.addEventListener('click', function() {
                var textArea = document.createElement('textarea');
                textArea.value = block.textContent;
                textArea.setAttribute('readonly', ''); // Make it read-only to be tamper-proof
                textArea.style.position = 'absolute';
                textArea.style.left = '-9999px';
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);

                textSpan.innerHTML = ' Copied!';
                setTimeout(function() {
                    textSpan.innerHTML = ' Copy code';
                }, 2000);
            });

            header.appendChild(languageIndicator);
            header.appendChild(button);

            // Wrap the code block with the container
            preElement.parentNode.insertBefore(container, preElement);
            container.appendChild(preElement);

            // Insert the header inside the container
            container.insertBefore(header, preElement);

            // Apply overflow to the code block only
            preElement.style.overflow = 'auto';
        });
    }, 10);
});
