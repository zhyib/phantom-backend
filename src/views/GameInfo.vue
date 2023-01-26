<template>
  <el-table
    :data="pageData.tableData">
    <el-table-column prop="gameId" label="gameId" />
    <el-table-column prop="titleEn" label="titleEn" />
    <el-table-column prop="titleCn" label="titleCn" />
    <el-table-column prop="rate" label="rate" />
    <el-table-column prop="completed" label="completed">
      <template #default="scope">
        {{ scope.row.completed }}
      </template>
    </el-table-column>
    <el-table-column prop="isDeleted" label="isDeleted" />
    <el-table-column prop="" label="Operation">
      <template #default="scope">
        <el-button
          text
          bg
          @click="handleClickEdit(scope.row.gameId)">
          编辑
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-dialog
    v-model="pageData.dialogVisible"
    title="编辑">
    <el-form
      label-width="auto">
      <el-form-item label="中文名">
        <el-input v-model="pageData.editData.titleCn" />
      </el-form-item>
      <el-form-item label="英文名">
        <el-input v-model="pageData.editData.titleEn" />
      </el-form-item>
      <el-form-item label="游玩平台">
        <el-radio-group v-model="pageData.editData.platform">
          <el-radio-button label="PC" />
          <el-radio-button label="STEAM" />
          <el-radio-button label="XBOS" />
          <el-radio-button label="PS" />
          <el-radio-button label="NS" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="评分">
        <el-input-number v-model="pageData.editData.rate" />
      </el-form-item>
      <el-form-item label="开发商">
        <el-input v-model="pageData.editData.developer" />
      </el-form-item>
      <el-form-item label="发行商">
        <el-input v-model="pageData.editData.publisher" />
      </el-form-item>
      <el-form-item label="短评">
        <el-input type="textarea" v-model="pageData.editData.commentLine" />
      </el-form-item>
      <el-form-item label="长评">
        <el-input type="textarea" v-model="pageData.editData.commentText" />
      </el-form-item>
      <el-form-item label="游玩时间">
        <el-input-number v-model="pageData.editData.playedTime" />
      </el-form-item>
      <el-form-item label="游玩日期">
        <el-date-picker
          v-model="pageData.editData.playDate"
          type="date" />
      </el-form-item>
      <el-form-item label="发行日期">
        <el-date-picker
          v-model="pageData.editData.publishDate"
          type="date" />
      </el-form-item>
      <el-form-item label="是否删除">
        <el-radio-group v-model="pageData.editData.isDeleted">
          <el-radio :label="false">否</el-radio>
          <el-radio :label="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="pageData.dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleClickConfirm">
          Confirm
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts" setup>
import axiosUtil from '@/utils/axiosUtil';
import { onMounted, reactive } from 'vue';
import Game from '@/model/Game';
import { ElMessage } from 'element-plus';

interface GameTableData extends Game {
  completed?: string,
}

const pageData = reactive<{
  // data to display in table
  tableData: GameTableData[],
  // data editing
  editData: Game,
  // edit dialog
  dialogVisible: boolean
}>({
  tableData: [],
  editData: new Game(),
  dialogVisible: false,
});

/**
 * queryTable
 */
function queryTable() {
  axiosUtil.get<unknown, Game[]>('/queryGameInfoByTitle', {
    params: {
      title: '',
    },
  })
    .then((data) => {
      const dataArr: GameTableData[] = [];
      data.forEach((game: Game) => {
        let num = 0;
        let sum = 0;
        Object.keys(game).forEach((key) => {
          if (key !== 'isDeleted' && key !== 'titleCn') {
            if (game[key]) {
              num += 1;
            }
            sum += 1;
          }
        });
        dataArr.push(game);
        dataArr[dataArr.length - 1].completed = `${num}/${sum}`;
      });
      pageData.tableData = dataArr;
    });
}

/**
 * edit dialog
 */
function handleClickEdit(gameId: number) {
  axiosUtil.get<unknown, Game[]>('/queryGameInfoById', {
    params: {
      id: gameId,
    },
  })
    .then((data) => {
      pageData.editData = new Game(data[0]);
      pageData.dialogVisible = true;
    });
}

function handleClickConfirm() {
  axiosUtil.post('/updateGameInfoById', pageData.editData)
    .then(() => {
      ElMessage.success('成功');
      pageData.dialogVisible = false;
      queryTable();
    });
}

onMounted(() => {
  queryTable();
});
</script>
