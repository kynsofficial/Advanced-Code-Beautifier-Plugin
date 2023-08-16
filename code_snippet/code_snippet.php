<?php
class CodeSnippetTinyMCE
{
    public function __construct()
    {
        // Hook into the 'init' action to ensure it's applied to all instances
        add_action('init', array($this, 'aptlearn_register_code_snippet_button'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_styles'));
    }

    public function aptlearn_register_code_snippet_button()
    {
        // Check user permissions
        if (!current_user_can('edit_posts') && !current_user_can('edit_pages')) {
            return;
        }

        // Check if WYSIWYG is enabled
        if (get_user_option('rich_editing') == 'true') {
            add_filter('mce_external_plugins', array($this, 'aptlearn_add_code_snippet_plugin'));
            add_filter('mce_buttons', array($this, 'aptlearn_add_code_snippet_button_ui'));
        }

        // Register and Enqueue the CSS file for custom code snippet styles and Prism highlighting
        wp_register_style('aptlearn-code-snippet', plugin_dir_url(__FILE__) . 'code_snippet.css', false, '1.0.0');
        wp_enqueue_style('aptlearn-code-snippet');

        // Enqueue Prism CSS and JS for syntax highlighting
        wp_enqueue_style('prism-css', 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/themes/prism.min.css');
        wp_enqueue_script('prism-js', 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.24.1/prism.min.js');
    }

    public function aptlearn_add_code_snippet_plugin($plugin_array)
    {
        $plugin_array['code_snippet'] = plugin_dir_url(__FILE__) . 'code_snippet.js';
        return $plugin_array;
    }

    public function aptlearn_add_code_snippet_button_ui($buttons)
    {
        array_push($buttons, 'code_snippet');
        return $buttons;
    }

    public function enqueue_admin_styles() {
    }
}



// Instantiate the class
$codeSnippetTinyMCE = new CodeSnippetTinyMCE();
?>
