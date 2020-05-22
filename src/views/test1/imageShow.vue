<template>
  <div>
    <img :src="imageUrl" alt height="200px" width="200px"/>
  </div>
</template>
<script>
export default {
  props: ["imageUrl"]
};
</script>