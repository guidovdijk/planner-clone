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
	$link: red;
	
	@import '~bulma';

</style>


<style lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	img {
		margin: auto;
		margin-top: 60px;
		display: block;
	}
}
</style>
