<template>
  <el-container class="overview">
    <el-main>
      <el-row :gutter="20" type="flex" justify="center">
        <el-col :span="4" v-for="(group, index) in list_of_group" :key="group.title">
          <ChartGauge :height="height"
                             :title="group.label"
                             :id="group.dom_id"
                             :dom_id="group.dom_id"
                             :value="group.completeness">
          </ChartGauge>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import ChartGauge from '@/components/ChartGauge'
  import API from '@/service/api'

  export default {
    name: 'OverView',
    metaInfo: {
      titleTemplate: '%s-概览'
    },
    data() {
      return {
        height: '400px'
      }
    },
    computed: {
      list_of_group () {
        return this.$store.getters.workflows;
      }
    },
    mounted() {
      this.fetchData();
    },
    methods: {
      fetchData() {
        API.getAll().then(res => {
          this.$store.dispatch('buildTree', res);
        }, err => {
          console.log(`err: `, err);
        });
      }
    },
    components: {
      ChartGauge
    }
  }
</script>

<style scoped>
  .overview {
    background-color: antiquewhite;
    min-height: 100%;
    position: relative;
  }
</style>
