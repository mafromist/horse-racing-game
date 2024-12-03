<!-- <template>
  <div v-if="tabsContent" class="racing-horses">
    <h2>{{ title }}</h2>
    <TabNavigation :navContent="tabsContent" :selectTab="selectTab" />
    <TabContent :tableContent="tabsContent[selectedTab].horses" />
  </div>
</template>

<script setup>
import TabContent from '@/components/Atoms/TabContent.vue';
import TabNavigation from '@/components/Atoms/TabNavigation.vue';
import { defineProps, ref } from 'vue';

defineProps({
  title: String,
  tabsContent: Object,
});

const selectedTab = ref(0);

const selectTab = (index) => {
  selectedTab.value = index;
};
</script> -->
