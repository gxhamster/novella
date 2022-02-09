<template>
  <div class="flex flex-col pl-20 text-center mb-2">
    <span class="text-white laptop:text-3xl desktop:text-5xl">{{ count_pad }}</span>
    <span class="text-white laptop:text-1xl desktop:text-2xl font-light">{{ title }}</span>
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