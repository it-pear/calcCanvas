<template>
  <div class="nav-bar">
    <div class="section-btn">
      <q-btn class="q-btn-nav">
        <q-icon
          size="24px"
          name="svguse:icons/allIcons.svg#formwork"
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
          size="24px"
          name="svguse:icons/allIcons.svg#net"
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
          size="23px"
          name="svguse:icons/allIcons.svg#triangle"
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
    </div>

    <div class="section-btn">
      <q-btn class="q-btn-nav">
        <q-icon
          size="24px"
          name="svguse:icons/allIcons.svg#triangle2"
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
          size="24px"
          name="svguse:icons/allIcons.svg#square"
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
          size="23px"
          name="svguse:icons/allIcons.svg#markup"
          class="q-icon-fill"
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
    </div>

    <div class="section-btn section-btn-func">
      <q-btn class="q-btn-nav">
        <q-icon
          size="24px"
          name="svguse:icons/allIcons.svg#save"
        />
      </q-btn>
      <q-btn class="q-btn-nav">
        <q-icon
          size="24px"
          name="svguse:icons/allIcons.svg#printer"
        />
      </q-btn>
      <q-btn class="q-btn-nav">
        <q-icon
          size="23px"
          name="svguse:icons/allIcons.svg#del"
        />
      </q-btn>
    </div>
  </div>

</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'NavBar',
  components: {
    
  },
  setup() {
    
    return {
      
    }
  }
})
</script>
