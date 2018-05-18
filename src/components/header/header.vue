<template>
  <header>
    <slot>

    </slot>
    <img style="height: 16px;position: fixed;top: 14px;left:12px;" src="./../../../static/img/Back.png"/>
  </header>
</template>
<style>
  header{
    height: 45px;
    background:#285FB1;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    width: 100%;
    text-align: center;
    color: #fff;
    font-size: 1.8rem;
    line-height: 45px;
  }
</style>
