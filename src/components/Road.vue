<template>
  <!-- more on expansion panels (and more examples): https://vuetifyjs.com/en/components/expansion-panels -->
  <!-- this is the example I copied: https://vuetifyjs.com/en/components/expansion-panels#expand -->
  <v-expansion-panel
    v-model="visibleList"
    expand
  >
    <!-- v-for index in N starts at 1... -->
    <!-- FYI can't use key as prop: https://stackoverflow.com/questions/47783396/access-key-from-child-component-in-vue -->
    <semester
      v-for="index in numSems"
      :key="index-1"
      :index="index-1"
      :selected-subjects="selectedSubjects"
      :semester-subjects="selectedSubjects[index-1]"
      :road-i-d="roadID"
      :is-open="visibleList[index-1]"
      :adding-from-card="addingFromCard"
      :dragging-over="dragSemesterNum===index-1"
      @open-change-year-dialog="changeYearDialog = true"
    />
    <v-dialog v-model="changeYearDialog" max-width="600">
      <v-card>
        <v-btn icon flat style="float:right" @click="changeYearDialog = false">
          <v-icon>close</v-icon>
        </v-btn>
        <v-card-title>
          <h1>I am a...</h1>
        </v-card-title>
        <v-card-text>
          <v-select
            v-model="year"
            :items="[{value: 0,text:'First Year/Freshman'},{value: 1,text:'Sophomore'},{value:2,text:'Junior'},{value:3,text:'Senior'},{value:4,text:'Super Senior'}]"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn flat @click="changeYearDialog = false">
            Cancel
          </v-btn>
          <v-btn color="primary" @click="$emit('change-year',year); changeYearDialog = false;">
            Submit
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-expansion-panel>
</template>

<script>
import Semester from './Semester.vue';

export default {
  name: 'Semester',
  components: {
    'semester': Semester
  },
  props: {
    selectedSubjects: {
      type: Array,
      required: true
    },
    roadID: {
      type: String,
      required: true
    },
    addingFromCard: {
      type: Boolean,
      required: true
    },
    dragSemesterNum: {
      type: Number,
      required: true
    }
  },
  data: function () {
    const defaultOpen = [false, true, false, true, true, false, true, true, false, true, true, false, true];
    const numSemesters = 16;
    return {
      visibleList: numSemesters >= 13 ? defaultOpen.concat([true, false, true]) : defaultOpen,
      changeYearDialog: false,
      numSems: numSemesters
    };
  },
  computed: {
    year: {
      get: function () {
        return this.$store.getters.userYear;
      },
      set: function (newYear) {
        this.$emit('change-year', newYear);
      }
    }
  }
};
</script>
