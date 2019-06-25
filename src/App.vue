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


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;  margin-top: 60px;
}
</style>
