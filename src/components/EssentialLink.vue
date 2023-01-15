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
        anchor="center right" self="center start"
        class="q-menu-my q-menu-right"
      >
        
      </q-menu>
    </q-btn>

    <q-btn class="q-btn-nav btn-settings">
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
