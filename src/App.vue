<template>
  <div id="app">
    <Container>
      <FormHeader />
    </Container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "./components/HelloWorld.vue";
import FormHeader from "./components/FormHeader.vue";
import Container from "./components/ui/Container.vue";

@Component({
  components: {
    HelloWorld,
    FormHeader,
    Container,
  },
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
