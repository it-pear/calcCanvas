<template>
  <q-layout view="hHh lpR fFf">

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" :breakpoint="772">
      <EssentialLink />
    </q-drawer>

    

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" :breakpoint="0">
      <div class="header">
        <q-btn 
          outline style="color: grey;" 
          label="Назад в калькулятор" 
          class="btn-back"
        />
        <q-btn 
          class="bg-orange btn-message mb-visible"
        >
          <q-icon
            color="grey"
            size="16px"
            name="svguse:icons/allIcons.svg#message"
          />
        </q-btn>
        <q-btn 
          outline style="color: white;"
          class="btn-play mb-visible" 
        >
          <q-icon
            color="grey"
            size="14px"
            name="svguse:icons/allIcons.svg#play"
          />
        </q-btn>
      </div>
      <NavBar />
      <div class="content mb-visible"></div>
      <MiniDashboard />
      <q-select 
        outlined 
        v-model="model" 
        :options="options"
        class="my-select lg-visible" 
        dropdown-icon="svguse:icons/allIcons.svg#arrow"
      />
    </q-drawer>

    <q-footer class="bg-dark text-white my-footer">
      <q-toolbar>
        <q-btn 
          class="bg-orange"
        >
          <q-icon
            color="grey"
            size="18px"
            name="svguse:icons/allIcons.svg#mail"
          />
          <span class="block text-grey">онлайн помощник</span>
        </q-btn>
        <q-btn 
          outline style="color: white;" 
          label="Как работать с калькулятором?" 
        />
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import { ref } from 'vue'
import EssentialLink from 'components/EssentialLink'
import NavBar from 'components/NavBar'
import MiniDashboard from 'components/MiniDashboard'

export default {
  components: {
    EssentialLink,
    NavBar,
    MiniDashboard
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    const model = ref(
      {
        label: 'Миллиметры',
        value: 'mm'
      }
    )
    const options = ref([
      {
        label: 'Миллиметры',
        value: 'mm'
      },
      {
        label: 'Сантиметры',
        value: 'cm'
      },
      {
        label: 'Метры',
        value: 'm'
      },
    ])

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      },
      model,
      options
    }
  }
}
</script>