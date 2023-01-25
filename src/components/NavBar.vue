<template>
  <div class="nav-bar">
    <div class="section-btn">
      
      <q-btn class="q-btn-nav">
        <q-icon
          size="24px"
          name="svguse:icons/allIcons.svg#formwork"
        />
        <q-tooltip
          anchor="bottom middle"
          self="top middle"
          class="tooltip-bottom bg-orange text-grey"
        >
          Опалубка
        </q-tooltip>
        <q-menu
          anchor="bottom middle" self="top middle"
          class="q-menu-my q-menu-bottom q-menu-formwork"
        >
          <div class="q-menu-container">
            <div class="field-group">
              <q-checkbox
                left-label
                v-model="left"
                label="Опалубка"
                color="rgba(0,0,0,0)"
                class="my-checkbox text-grey-11"
              />
            </div>
            <div class="field-group">
              <div class="title">Сетка</div>
              <q-select 
                outlined 
                v-model="model" 
                :options="options"
                class="my-select" 
                dropdown-icon="svguse:icons/allIcons.svg#arrow"
              />
            </div>
            <div class="field-group">
              <div class="title">Толщина доски</div>
              <q-select 
                outlined 
                v-model="model2" 
                :options="options2"
                class="my-select" 
                dropdown-icon="svguse:icons/allIcons.svg#arrow"
              />
            </div>
          </div>
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
    <q-select 
      outlined 
      v-model="modelSelect" 
      :options="optionsSelect"
      class="my-select mb-visible" 
      dropdown-icon="svguse:icons/allIcons.svg#arrow"
    />
  </div>

</template>

<script>
import { ref, defineComponent } from 'vue'

export default defineComponent({
  name: 'NavBar',
  components: {
    
  },
  setup() {
    const left = ref(true)
    const model = ref(
      {
        label: '200х200',
        value: '200х200'
      }
    )
    const options = ref([
      {
        label: '100х100',
        value: '100х100'
      },
      {
        label: '200х200',
        value: '200х200'
      },
      {
        label: '300х300',
        value: '300х300'
      },
    ])
    const model2 = ref(
      {
        label: '30 мм',
        value: '30'
      },
    )
    const options2 = ref([
      {
        label: '10 мм',
        value: '10'
      },
      {
        label: '20 мм',
        value: '20'
      },
      {
        label: '30 мм',
        value: '30'
      },
    ])

    const modelSelect = ref(
      {
        label: 'Миллиметры',
        value: 'mm'
      }
    )
    const optionsSelect = ref([
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
      model,
      options,
      model2,
      options2,
      left,
      modelSelect,
      optionsSelect,
    }
  }
})
</script>
