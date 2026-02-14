<?php get_header(); ?>
	<?php
  remove_filter('the_content', 'wpautop');
	while ( have_posts() ) : the_post();
		the_content();
	endwhile;
	?>
<?php get_footer();
