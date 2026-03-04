	<footer id="colophon" class="site-footer">
		<div class="container">
            <div class="site-info">
                <a href="<?php echo esc_url( __( 'https://wordpress.org/', 'chargerone' ) ); ?>">
                    <?php
                    /* translators: %s: CMS Name, i.e. WordPress. */
                    printf( esc_html__( 'Proudly powered by %s', 'chargerone' ), 'WordPress' );
                    ?>
                </a>
                <span class="sep"> | </span>
                    <?php
                    /* translators: 1: Theme name, 2: Theme author. */
                    printf( esc_html__( 'Theme: %1$s by %2$s.', 'chargerone' ), 'chargerone', '<a href="#">Artem Zubov</a>' );
                    ?>
            </div><!-- .site-info -->
        </div>
	</footer><!-- #colophon -->
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
