<?php
function code_snippet_enqueue_scripts() {
    // Enqueue Font Awesome for icons
    wp_enqueue_style('font-awesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

    // Enqueue Prism CSS and JS for syntax highlighting
    wp_enqueue_style('prism-css', 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css');
    wp_enqueue_script('prism-js', 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js');

    // Enqueue the custom CSS for the code copy functionality
    wp_enqueue_style('code-snippet-copy-css', plugin_dir_url(__FILE__) . 'copy-code.css');

    // Enqueue the custom JS for the code copy functionality
    wp_enqueue_script('code-snippet-copy-js', plugin_dir_url(__FILE__) . 'copy-code.js', array('jquery'), '1.0.0', true);
}

// Hook into the 'wp_enqueue_scripts' action to load the scripts and styles on the frontend
add_action('wp_enqueue_scripts', 'code_snippet_enqueue_scripts');

// Hook into the 'admin_enqueue_scripts' action to load the scripts and styles in the wp-admin area
add_action('admin_enqueue_scripts', 'code_snippet_enqueue_scripts');
?>
