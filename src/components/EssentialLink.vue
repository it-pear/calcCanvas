<template>

  <q-tabs
    v-model="tab"
    class="essential-link q-tabs-mine"
    @click="customCurrentFunction"
  >
    <q-tab name="cursor" class="q-btn-nav">
      <q-tooltip
        anchor="center end"
        self="center start"
        class="tooltip-right bg-orange text-grey"
      >
        Произвольная линия
      </q-tooltip>
      <q-icon
        size="18px"
        name="svguse:icons/allIcons.svg#cursor"
      />
    </q-tab>

    <q-tab name="line" class="q-btn-nav">
      <q-tooltip
        anchor="center end"
        self="center start"
        class="tooltip-right bg-orange text-grey"
      >
        прямая линия
      </q-tooltip>
      <q-icon
        size="20px"
        name="svguse:icons/allIcons.svg#line"
      />
    </q-tab>

    <q-tab name="circleline" class="q-btn-nav">
      <q-tooltip
        anchor="center end"
        self="center start"
        class="tooltip-right bg-orange text-grey"
      >
        дуга 
      </q-tooltip>
      <q-icon
        size="18px"
        class="q-icon-fill"
        name="svguse:icons/allIcons.svg#circleline"
      />
    </q-tab>

    <q-tab name="pencil" class="q-btn-nav">
      <q-tooltip
        anchor="center end"
        self="center start"
        class="tooltip-right bg-orange text-grey"
      >
        Произвольная линия
      </q-tooltip>
      <q-icon
        size="21px"
        name="svguse:icons/allIcons.svg#pencil"
      />
    </q-tab>

    <q-tab name="rectangle" class="q-btn-nav">
      <q-tooltip
        anchor="center end"
        self="center start"
        class="tooltip-right bg-orange text-grey"
      >
        Прямоугольник
      </q-tooltip>
      <q-icon
        size="23px"
        class="q-icon-fill"
        name="svguse:icons/allIcons.svg#rectangle"
      />
    </q-tab>

    <q-tab name="circle" class="q-btn-nav">
      <q-tooltip
        anchor="center end"
        self="center start"
        class="tooltip-right bg-orange text-grey"
      >
        круг
      </q-tooltip>
      <q-icon
        size="20px"
        class="q-icon-fill"
        name="svguse:icons/allIcons.svg#circle"
      />
    </q-tab>

    <q-tab name="pointer" class="q-btn-nav">
      <q-tooltip
        anchor="center end"
        self="center start"
        class="tooltip-right bg-orange text-grey"
      >
        Переместить объект
      </q-tooltip>
      <q-icon
        size="24px"
        name="svguse:icons/allIcons.svg#pointer"
      />
    </q-tab>

    <q-tab name="back" class="q-btn-nav">
      <q-tooltip
        anchor="center end"
        self="center start"
        class="tooltip-right bg-orange text-grey"
      >
        Повернуть объект
      </q-tooltip>
      <q-icon
        size="23px"
        name="svguse:icons/allIcons.svg#back"
      />
    </q-tab>

    <q-tab name="pouring" class="q-btn-nav">
      <q-tooltip
        anchor="center end"
        self="center start"
        class="tooltip-right bg-orange text-grey"
      >
        Заливка цветом
      </q-tooltip>
      <q-icon
        size="24px"
        name="svguse:icons/allIcons.svg#pouring"
      />
      <q-menu
        anchor="center right" self="center start"
        class="q-menu-my q-menu-right q-menu-colors"
      >
        <q-list class="q-menu-container">
          <q-item
            clickable
            v-close-popup 
            v-for="color in colors"
            :key="color"
            :style="`background: ${color}`"
          />
        </q-list>
      </q-menu>
    </q-tab>

    <q-tab name="settings" class="q-btn-nav btn-settings">
      <q-tooltip
        anchor="center end"
        self="center start"
        class="tooltip-right bg-orange text-grey"
      >
        габариты простой опалубки
      </q-tooltip>
      <q-icon
        size="23px"
        name="svguse:icons/allIcons.svg#settings"
      />
      <q-menu
        anchor="center right" self="center start"
        class="q-menu-my q-menu-right q-menu-settings"
      >
        <div class="q-menu-container">
          <div class="field-group">
            <div class="title">Длина, м</div>
            <q-input v-model="text" class="my-input" /> 
          </div>
          <div class="field-group">
            <div class="title">Ширина, м</div>
            <q-input v-model="text" class="my-input" /> 
          </div>
          <div class="field-group">
            <div class="title">Высота, м</div>
            <q-input v-model="text" class="my-input" /> 
          </div>
        </div>
      </q-menu>
    </q-tab>

    <q-tab name="height" class="q-btn-nav">
      <q-tooltip
        anchor="center end"
        self="center start"
        class="tooltip-right bg-orange text-grey"
      >
        Высота фундамента
      </q-tooltip>
      <q-icon
        size="29px"
        name="svguse:icons/allIcons.svg#height"
      />
      <q-menu
        anchor="center right" self="center start"
        class="q-menu-my q-menu-right"
      >
        <div class="q-menu-container" style="max-width: 111px;">
          <div class="field-group">
            <div class="title">Высота</div>
            <q-input v-model="text" class="my-input" /> 
          </div>
        </div>
      </q-menu>
    </q-tab>
  </q-tabs>
  
</template>

<script setup>
  import { ref, onMounted, computed } from 'vue'
  import { useStore } from 'vuex'
  const store = useStore()
  const stateCanvas = computed(() => store.state.canvas)

  const tab = ref()
  const colors = ref([
    '#FFFFFF',
    '#DFDFDF',
    '#BFBFBF',
    '#9F9F9F',
    '#7F7F7F',
    '#5F5F5F',
    '#3F3F3F',
    '#1F1F1F',
    '#000000',
    '#A8EFFF',
    '#B5D0FF',
    '#E0B5FF',
    '#FFB4DE',
    '#FFBCBC',
    '#FFD1B4',
    '#FFEEAA',
    '#FFFF9A',
    '#E4F9C1',
    '#63E1FF',
    '#7BAAFF',
    '#C67AFF',
    '#FF79C2',
    '#FF8888',
    '#FFAC79',
    '#FFE067',
    '#FFFF49',
    '#CEF28F',
    '#2BCFFF',
    '#4A87FF',
    '#AC49FF',
    '#FF48A6',
    '#FF5B5B',
    '#FF8A47',
    '#FFCE2F',
    '#FFFD07',
    '#B6E565',
    '#00BAFE',
    '#2469FF',
    '#9123F3',
    '#F3228A',
    '#FF3737',
    '#FF6C20',
    '#FFBA04',
    '#FFF200',
    '#9DD241',
    '#00A1E7',
    '#074DFF',
    '#7308D3',
    '#D7066F',
    '#FF1B1B',
    '#FF5103',
    '#EEA300',
    '#FAD901',
    '#83B925',
  ])


  // установка текущего инструмента
  const customCurrentFunction = () => {
    store.commit('canvas/currentFunction', tab.value)
  }

  // function clickOut() {
  //   document.onclick = function (e) {
  //     const arr = e.composedPath()
  //     let bool = false
  //     arr.forEach((el) => {
  //       if (el.classList) {
  //         if(el.classList.contains('q-btn-nav')) {
  //           bool = true
  //         }
  //       }
  //     })
  //     if (!bool) {
  //       tab.value = ''
  //     }
  //   }
  // }

  onMounted(() => {
    // clickOut()
  })


</script>
