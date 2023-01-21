<template>
  <q-tabs
    v-model="tab"
    class="mob-navigation mb-visible q-tabs-mine"
  >

    <q-tab name="settings" class="q-btn-nav btn-settings">
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

    <q-tab name="cirl" class="q-btn-nav">
      <q-icon
        size="23px"
        name="svguse:icons/allIcons.svg#cirl"
      />
      <q-menu
        anchor="top middle" self="bottom middle"
        class="q-menu-my q-menu-nav"
      >
        <q-tabs
          v-model="tabNav"
          class="essential-link q-tabs-mine"
        >
          <q-tab name="line" class="q-btn-nav">
            <q-icon
              size="20px"
              name="svguse:icons/allIcons.svg#line"
            />
          </q-tab>
          <q-tab name="circleline" class="q-btn-nav">
            <q-icon
              size="18px"
              class="q-icon-fill"
              name="svguse:icons/allIcons.svg#circleline"
            />
          </q-tab>
          <q-tab name="pouring" class="q-btn-nav">
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
          <q-tab name="pencil" class="q-btn-nav">
            <q-icon
              size="21px"
              name="svguse:icons/allIcons.svg#pencil"
            />
          </q-tab>
          <q-tab name="rectangle" class="q-btn-nav">
            <q-icon
              size="23px"
              class="q-icon-fill"
              name="svguse:icons/allIcons.svg#rectangle"
            />
          </q-tab>
          <q-tab name="circle" class="q-btn-nav">
            <q-icon
              size="20px"
              class="q-icon-fill"
              name="svguse:icons/allIcons.svg#circle"
            />
          </q-tab>
          <q-tab name="back" class="q-btn-nav">
            <q-icon
              size="23px"
              name="svguse:icons/allIcons.svg#back"
            />
          </q-tab>
          
        </q-tabs>
      </q-menu>
    </q-tab>

    <q-tab name="lastik" class="q-btn-nav">
      <q-icon
        size="23px"
        name="svguse:icons/allIcons.svg#lastik"
      />
    </q-tab>

  </q-tabs>

  <div class="pdd-mob">
    <div class="mini-dashboard">
      <div class="item">
        <div class="title">Количество фигур:</div>
        <ul>
          <li>Элемент 1</li>
          <li>Элемент 1</li>
          <li>Элемент 1</li>
          <li>Элемент 1</li>
          <li>Элемент 1</li>
          <li>Элемент 1</li>
        </ul>
      </div>
      <div class="item">
        <div class="title">Площади фигур:</div>
        <ul>
          <li>S1=80 м2</li>
          <li>S1=80 м2</li>
          <li>S1=80 м2</li>
          <li>S1=80 м2</li>
          <li>S1=80 м2</li>
          <li>S1=80 м2</li>
        </ul>
      </div>
      <div class="item">
        <div class="title">Объемы фигур:</div>
        <ul>
          <li>V1=80 м3</li>
          <li>V1=80 м3</li>
          <li>V1=80 м3</li>
          <li>V1=80 м3</li>
          <li>V1=80 м3</li>
          <li>V1=80 м3</li>
        </ul>
      </div>
    </div>
  </div>
  
</template>

<script>
import { ref, defineComponent, onMounted } from 'vue'

export default defineComponent({
  name: 'MiniDashboard',
  components: {
    
  },
  setup() {
    const tab = ref()
    const tabNav = ref()

    function clickOut() {
      document.onclick = function (e) {
        const arr = e.composedPath()
        let bool = false
        arr.forEach((el) => {
          if (el.classList) {
            if(el.classList.contains('q-btn-nav')) {
              bool = true
            }
          }
        })
        if (!bool) {
          tab.value = ''
        }
      }
    }

    onMounted(() => {
      clickOut()
    })

    return {
      tab,
      tabNav,
      clickOut
    }
  }
})
</script>