<?php
function aptlearn_enqueue_block_editor_code_snippet() {
    // Correct path to the JavaScript file
    $script_path = plugin_dir_url(__DIR__) . 'block_editor_compatibility/code-snippet-block.js';

    // Register the block editor script
    wp_register_script(
        'aptlearn-code-snippet-block-editor',
        $script_path, // Using the correct path
        array('wp-plugins', 'wp-edit-post', 'wp-element', 'wp-components', 'wp-data', 'wp-blocks'), // Dependencies
        '1.0.0', // Version number
        true // Load in the footer
    );

    // Enqueue the script in the block editor
    wp_enqueue_script('aptlearn-code-snippet-block-editor');
}

add_action('enqueue_block_editor_assets', 'aptlearn_enqueue_block_editor_code_snippet');

function enqueue_prism_assets() {
  wp_enqueue_script('prism-js', 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/prism.min.js', array(), null, true);
  wp_enqueue_style('prism-css', 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.25.0/themes/prism.min.css', array(), null);
}
add_action('wp_enqueue_scripts', 'enqueue_prism_assets');



?>
