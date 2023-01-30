<template>
   <el-container id="home-view">
    <el-header>
      <div id="home-view-head">
        Phantom Library Manage System
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu router id="home-view-menu">
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="1">
            <template #title>
              <el-icon><Document /></el-icon>
              表格管理
            </template>
            <el-menu-item index="/gameInfo">游戏信息</el-menu-item>
            <el-menu-item index="1-2">item two</el-menu-item>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="4">
            <el-icon>
              <setting />
            </el-icon>
            <span>Navigator Four</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// 撑满
html,
body,
#app {
  height: 100%;
  margin: 0;
}

#home-view {
  height: 100%;

  #home-view-menu{
    height: 100%;
  }

  #home-view-head {
    font-size: 20px;
    height: 100%;
    line-height: var(--el-header-height);
  }
}
</style>
