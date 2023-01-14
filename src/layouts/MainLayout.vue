<template>
  <q-layout view="hHh lpR fFf">

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left">
      <EssentialLink />
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right">
      <q-btn 
        outline style="color: grey;" 
        label="Назад в калькулятор" 
        class="btn-back"
      />
      <div class="section-btn">

      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="bg-dark text-white my-footer">
      <q-toolbar>
        <q-btn 
          style="background: goldenrod;" 
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

export default {
  components: {
    EssentialLink
  },
  setup () {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },

      rightDrawerOpen,
      toggleRightDrawer () {
        rightDrawerOpen.value = !rightDrawerOpen.value
      }
    }
  }
}
</script>