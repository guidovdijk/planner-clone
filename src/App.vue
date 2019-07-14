<template>
	<div id="app">
		<img src="./assets/logo.png">
		<router-view/>
	</div>
</template>

<script>

export default {
  	name: 'App'
}
</script>

<style lang="scss">
	$fa-font-path: "~@fortawesome/fontawesome-free/webfonts";
	
	@import '~bulma';

	@import "~@fortawesome/fontawesome-free/scss/fontawesome";
	@import "~@fortawesome/fontawesome-free/scss/regular";
	@import "~@fortawesome/fontawesome-free/scss/solid";
	@import "~@fortawesome/fontawesome-free/scss/brands";


</style>


<style lang="scss">
#app {
	img {
		margin: auto;
		margin-top: 60px;
		display: block;
	}
}
</style>
