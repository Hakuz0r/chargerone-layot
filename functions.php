<?php
/**
 * ChargerOne Theme functions and definitions
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 */
function chargerone_setup() {
	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	// Let WordPress manage the document title.
	add_theme_support( 'title-tag' );

	// Enable support for Post Thumbnails on posts and pages.
	add_theme_support( 'post-thumbnails' );

	// Switch default core markup for search form, comment form, and comments to output valid HTML5.
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Add WooCommerce support
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
}
add_action( 'after_setup_theme', 'chargerone_setup' );

/**
 * Enqueue scripts and styles.
 */
function chargerone_scripts() {
	// Подключаем основной стиль темы (style.css - метаданные)
	wp_enqueue_style( 'chargerone-style', get_stylesheet_uri(), array(), _S_VERSION );

	// Подключаем скомпилированный CSS (main.min.css)
	wp_enqueue_style( 'chargerone-main-style', get_template_directory_uri() . '/assets/css/main.min.css', array(), _S_VERSION );

	// Подключаем JS
	wp_enqueue_script( 'chargerone-scripts', get_template_directory_uri() . '/assets/js/main.js', array('jquery'), _S_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'chargerone_scripts' );

/**
 * WooCommerce Specific Functions
 */
// Remove default WooCommerce styles (optional, enable if you want full control)
// add_filter( 'woocommerce_enqueue_styles', '__return_false' );
