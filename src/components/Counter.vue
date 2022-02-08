<template>
  <div class="flex flex-col pl-20 text-center mb-2">
    <span class="text-white text-5xl">{{ count_pad }}</span>
    <span class="text-white  text-2xl">{{ title }}</span>
  </div>
</template>

<script>
export default {
    props: {
        title: String
    },
    data() {
        return {
            count: 0
        }
    },
    computed: {
        count_pad: function() {
            var s = "000000000" + this.count;
        return s.substr(s.length-3);
        }
    }
}

</script>