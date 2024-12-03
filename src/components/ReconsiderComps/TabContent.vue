<template>
  <div>
    <table>
     <thead>
        <tr>
          <slot></slot>
        </tr>
      </thead>>
      <tbody>
        <tr
          v-for="(content, index) in tableContent"
          :key="content.id"
        >
          <td>{{ index + 1 }}</td>
          <td>Horse {{ content.number }}</td>
          <td :style="{ backgroundColor: content.color }">{{ content.color }}</td>
          <td>{{ content.performancePoint }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
defineProps({
  tableContent: Object,
});
</script>
