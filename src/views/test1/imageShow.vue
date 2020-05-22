<template>
  <div>
    <img :src="imageUrl" alt height="300px" width="300px"/>
  </div>
</template>
<script>
export default {
  props: ["imageUrl"]
};
</script>