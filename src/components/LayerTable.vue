<template>
  <el-table
    class="layer-table"
    :data="layer"
    border
    :fit=true
    @row-click="handleRowClick">
    <el-table-column
      prop="id"
      label="ID"
      width="200">
    </el-table-column>
    <el-table-column
      prop="name"
      label="JOB名字">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      width="150">
      <template slot-scope="scope">
        <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
        <el-tag :type="scope.row.status| transStatusToTag">{{scope.row.status}}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'LayerTable',
    props: ['layer'],
    data() {
      return {}
    },
    computed: {
      table() {
        return this.$store.state;
      }
    },
    methods: {
      handleRowClick(row, event, column) {
        console.log('handleRowClick(', row, event, column, ')');
        this.$emit('rowClick',row.id);
      }
    }
  }
</script>

<style scoped>
  .layer-table {
    width: 100%;
    height: 100%;
  }

  .layer-table.el-table tr.el-table__row.done-row {
    background-color: #28a745;
  }

  .layer-table.el-table tr.el-table__row.running-row {
    background-color: #007bff;
  }

  .layer-table.el-table tr.el-table__row.error-row {
    background-color: #dc3545;
  }

  .layer-table.el-table tr.el-table__row.pending-row {
    background-color: #ffc107;
  }
</style>
