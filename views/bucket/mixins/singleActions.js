export default {
  created () {
    this.singleActions = [
      {
        label: '同步状态',
        permission: 'server_perform_syncstatus',
        action: (row) => {
          this.onManager('batchPerformAction', {
            id: row.id,
            managerArgs: {
              action: 'sync',
            },
          }).then(() => {
            this.$message.success('操作成功')
          })
        },
      },
      {
        label: `更改${this.$t('dictionary.project')}`,
        permission: 'buckets_perform_change_owner',
        action: row => {
          this.createDialog('ChangeOwenrDialog', {
            name: '存储桶',
            data: [row],
            columns: this.columns,
            onManager: this.onManager,
            refresh: this.refresh,
          })
        },
      },
      {
        label: '更多',
        actions: row => {
          return [
            {
              label: '设置上限',
              permission: 'buckets_perform_limit',
              action: obj => {
                this.createDialog('BucketUpdateBucketLimitDialog', {
                  title: '设置上限',
                  data: [row],
                  columns: this.columns,
                  onManager: this.onManager,
                  refresh: this.refresh,
                })
              },
            },
            {
              label: '删除',
              permission: 'buckets_delete',
              action: row => {
                this.createDialog('DeleteResDialog', {
                  data: [row],
                  columns: this.columns,
                  title: '删除',
                  name: '存储桶',
                  onManager: this.onManager,
                  refresh: this.refresh,
                })
              },
              meta: (row) => this.$getDeleteResult(row),
            },
          ]
        },
      },
    ]
  },
}