<template>
  <q-card class="my-card">
    <q-card-section horizontal>
      <q-img :src="group_image_url" style="width: 200px" />
      <q-card-section style="width: 100%">
        <q-card-section>
          <q-btn
            fab
            color="primary"
            icon="place"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%)"
          />

          <div class="row no-wrap items-center">
            <div class="col text-h6 ellipsis">{{ group_name }}</div>
            <div
              class="col-auto text-grey text-caption q-pt-md row no-wrap items-center"
            >
              <q-icon name="place" />
              250 ft
            </div>
          </div>

          <q-rating
            v-model="starRating"
            :max="group_capacity"
            icon="persons"
            size="24px"
          />
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div class="text-subtitle1">Butler Library</div>
          <div class="text-caption text-grey">
            Looking for people to practice midterm together!
          </div>
        </q-card-section>
      </q-card-section>
    </q-card-section>

    <q-separator />

    <q-card-actions v-if="registered">
      <q-btn flat round icon="cancel" color="red" />
      <q-btn flat color="red"> Cancel </q-btn>
    </q-card-actions>
    <q-card-actions v-else>
      <q-btn flat round icon="check" color="primary" />
      <q-btn flat color="primary">Join</q-btn>
    </q-card-actions>
  </q-card>
</template>

<style lang="sass" scoped>
.my-card
  width: 100%
  margin-top: 30px
</style>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "GroupPost",
  props: {
    group_id: {
      type: Number,
      required: true,
    },
    group_name: {
      type: String,
      required: true,
    },
    group_capacity: {
      type: Number,
      required: true,
    },
    group_image_url: {
      type: String,
      required: false,
    },
    registered: {
      type: Boolean,
      required: false,
    },
  },
  setup: () => {
    return {
      starRating: ref(1),
    };
  },
});
</script>
