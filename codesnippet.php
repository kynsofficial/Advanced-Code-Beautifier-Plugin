<?php
/**
 * Plugin Name:       Advanced Code Beautifier
 * Plugin URI:        https://www.aptlearn.io
 * Description:       Transform your code snippets into stunning visual pieces with Advanced Code Beautifier! Easily insert, edit, and highlight code snippets in both TinyMCE and block editors. Supports syntax highlighting across various languages, code copying, attractive styling, and enhanced readability. Whether you're a developer, educator, or tech writer, make your code shine with this professional tool. Made with love for the coding community.
 * Version:           1.0
 * Requires at least: 5.2
 * Requires PHP:      7.2
 * Author:            Agba Akin
 * Author URI:        https://www.akinolaakeem.com
 * Text Domain:       advanced-code-beautifier
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */


// Exit if accessed directly
if (!defined('ABSPATH')) {
    exit;
}

// Include the main file for the code snippet functionality
require_once plugin_dir_path(__FILE__) . 'code_snippet/code_snippet.php';
require_once plugin_dir_path(__FILE__) . 'frontend/copy-code.php';
require_once plugin_dir_path(__FILE__) . 'block_editor_compatibility/block-editor-code-snippet.php';

// Add footer link to the plugin page
function aptlearn_code_snippet_plugin_meta_links($links, $file) {
    $plugin = plugin_basename(__FILE__);
    if ($file == $plugin) {
        $links[] = 'Made with love by <a href="https://akinolaakeem.com" target="_blank">Agba Akin</a>. If you love this plugin, follow or give me a shout on <a href="https://twitter.com/kynsofficial" target="_blank">Twitter</a>.';
    }
    return $links;
}
add_filter('plugin_row_meta', 'aptlearn_code_snippet_plugin_meta_links', 10, 2);
