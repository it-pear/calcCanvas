<template>
  <div class="essential-link">
    <q-btn class="q-btn-nav active">
      <q-icon
        size="18px"
        name="svguse:icons/allIcons.svg#cursor"
      />
    </q-btn>
    <q-btn class="q-btn-nav">
      <q-icon
        size="20px"
        name="svguse:icons/allIcons.svg#line"
      />
    </q-btn>
    <q-btn class="q-btn-nav">
      <q-icon
        size="18px"
        class="q-icon-fill"
        name="svguse:icons/allIcons.svg#circleline"
      />
    </q-btn>
    <q-btn class="q-btn-nav">
      <q-icon
        size="21px"
        name="svguse:icons/allIcons.svg#pencil"
      />
    </q-btn>
    <q-btn class="q-btn-nav">
      <q-icon
        size="23px"
        class="q-icon-fill"
        name="svguse:icons/allIcons.svg#rectangle"
      />
    </q-btn>
    <q-btn class="q-btn-nav">
      <q-icon
        size="20px"
        class="q-icon-fill"
        name="svguse:icons/allIcons.svg#circle"
      />
    </q-btn>
    <q-btn class="q-btn-nav">
      <q-icon
        size="24px"
        name="svguse:icons/allIcons.svg#pointer"
      />
    </q-btn>
    <q-btn class="q-btn-nav">
      <q-icon
        size="23px"
        name="svguse:icons/allIcons.svg#back"
      />
    </q-btn>
    <q-btn class="q-btn-nav">
      <q-icon
        size="24px"
        name="svguse:icons/allIcons.svg#pouring"
      />
      <q-menu
        anchor="top right"
        self="top left"
      >
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup>
            <q-item-section>anchor="top right"</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>self="top left"</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <q-btn class="q-btn-nav btn-settings">
      <q-icon
        size="23px"
        name="svguse:icons/allIcons.svg#settings"
      />
      <q-menu
        anchor="top right"
        self="top left"
      >
        <q-list style="min-width: 100px">
          <q-item clickable v-close-popup>
            <q-item-section>anchor="top right"</q-item-section>
          </q-item>
          <q-item clickable v-close-popup>
            <q-item-section>self="top left"</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>

    <q-btn class="q-btn-nav">
      <q-icon
        size="20px"
        name="svguse:icons/allIcons.svg#close"
      />
    </q-btn>
  </div>
  
</template>

<script>
import { ref, defineComponent } from 'vue'
// import comp from 'components/comp'

export default defineComponent({
  name: 'EssentialLink',
  components: {
    
  },
  setup() {
    
    return {
      
    }
  }
})
</script>
