<template>
  <TableTool>
    <template #left>
      <el-form style="display: flex">
        <el-form-item label="Title">
          <el-input v-model="pageData.searchTitle" @keyup.enter="handleClickSearch"></el-input>
        </el-form-item>
        <el-button @click="handleClickSearch">Search</el-button>
      </el-form>
    </template>
    <template #right>
      <el-button @click="handleClickAdd">Add</el-button>
    </template>
  </TableTool>
  <el-table
    :data="pageData.tableData">
    <el-table-column prop="gameId" label="gameId" />
    <el-table-column prop="titleEn" label="titleEn" />
    <el-table-column prop="titleCn" label="titleCn" />
    <el-table-column prop="rate" label="rate" />
    <el-table-column prop="completed" label="completed">
      <template #default="scope">
        {{ isCompleted(scope.row.completed) }}
      </template>
    </el-table-column>
    <el-table-column prop="isDeleted" label="isDeleted" />
    <el-table-column prop="" label="Operation">
      <template #default="scope">
        <el-button
          text
          bg
          @click="handleClickEdit(scope.row.gameId)">
          Edit
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
import { onMounted, reactive } from 'vue';
import { ElMessage } from 'element-plus';

import axiosUtil from '@/utils/axiosUtil';

import Game from '@/model/Game';
import TableTool from '@/components/TaleTool.vue';
import { fa } from 'element-plus/es/locale';

interface GameTableData extends Game {
  completed?: string,
}

const pageData = reactive<{
  // data to display in table
  tableData: GameTableData[],
  // data editing
  editData: Game,
  // edit dialog
  dialogVisible: boolean,
  // search param
  searchTitle: string,
  // edit mode
  isEdit: boolean,
}>({
  tableData: [],
  editData: new Game(),
  dialogVisible: false,
  searchTitle: '',
  isEdit: false,
});

/**
 *
 * @param completed Game.isCompleted
 */
function isCompleted(completed: string) {
  const arr = completed.split('/');
  return arr[0] === arr[1] ? 'Finished' : completed;
}

/**
 * queryTable
 * @param param 参数列表 默认 {}
 */
function queryTable(param: Record<string, string> = {}) {
  axiosUtil.post<unknown, Game[]>('/queryGameInfo', param)
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

function handleClickSearch() {
  queryTable({
    titleCn: pageData.searchTitle,
    titleEn: pageData.searchTitle,
  });
}

/**
 * edit dialog
 */
function handleClickEdit(gameId: number) {
  pageData.isEdit = true;
  axiosUtil.post<unknown, Game[]>('/queryGameInfo', {
    gameId,
  })
    .then((data) => {
      pageData.editData = new Game(data[0]);
      pageData.dialogVisible = true;
    });
}

/**
 * add dialog
 */
function handleClickAdd() {
  pageData.isEdit = false;
  pageData.editData = new Game();
  pageData.dialogVisible = true;
}

/**
 * dialog's confirm
 */
function handleClickConfirm() {
  if (pageData.isEdit) {
    axiosUtil.post('/updateGameInfo', pageData.editData)
      .then(() => {
        ElMessage.success('成功');
        pageData.dialogVisible = false;
        queryTable();
      });
  } else {
    axiosUtil.post('/createGameInfo', pageData.editData)
      .then(() => {
        ElMessage.success('成功');
        pageData.dialogVisible = false;
        queryTable();
      });
  }
}

onMounted(() => {
  queryTable();
});
</script>
