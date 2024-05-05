<template>
  <div class="container">
    <article class="article">
      <section v-for="list in lists" :key="list.id">
        <div style="display: flex; gap: 10px">
          <button :id="list.id" @click="toggleItems">
            {{ list.open ? "˃" : "˅" }}
          </button>
          <input
            :checked="list.value"
            type="checkbox"
            :id="list.id"
            name="checkbox"
            @input="updateList($event)"
            :class="{
              checkbox:
                list.items.length !==
                list.items.filter((el) => el.value === true).length,
            }"
          />
          <p>{{ list.name }}</p>
        </div>
        <section v-if="list.open">
          <div
            v-for="item in list.items"
            :key="item.id"
            style="
              display: flex;
              gap: 10px;
              margin: 5px 50px;
              align-items: center;
              justify-content: space-between;
            "
          >
            <div style="display: flex; gap: 10px">
              <input
                :checked="item.value"
                :id="item.id"
                :data-parentId="list.id"
                @input="updateCheckbox($event)"
                type="checkbox"
                name="checkbox"
              />
              <p>{{ item.name }}</p>
            </div>
            <div style="display: flex; gap: 10px">
              <input
                :value="item.count"
                :id="item.id"
                :data-parentId="list.id"
                type="number"
                name="number"
                min="0"
                @input="updateCount($event)"
                style="width: 40px"
              />
              <input
                :value="item.color"
                :id="item.id"
                :data-parentId="list.id"
                @input="updateColor($event)"
                type="color"
                name="color"
                style="padding: 0; border: none; background: none; width: 27px"
              />
            </div>
          </div>
        </section>
      </section>
    </article>

    <article class="article">
      <section v-for="list in lists" class="section" style="position: relative">
        <p>{{ list.name }}</p>

        <div
          v-for="item in list.items.filter((el) => el.value === true)"
          v-if="list.sorted"
          style="display: flex; gap: 5px; flex-wrap: wrap"
        >
          <div
            v-for="count in item.count"
            :style="{ 'background-color': item.color }"
            style="height: 10px; width: 10px"
          ></div>
        </div>
        <div v-else style="display: flex; flex-wrap: wrap; gap: 5px">
          <div
            v-for="item in randomItems(list.id).value"
            :style="{ 'background-color': item.color }"
            style="height: 10px; width: 10px"
          ></div>
        </div>
        <button
          :id="list.id"
          @click="toggleSort"
          style="position: absolute; right: 5px"
        >
          {{ list.sorted ? "Перемешать" : "Сортировать" }}
        </button>
      </section>
    </article>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

var store = useStore();
var lists = computed(() => store.state.lists);

var randomItems = (id) => computed(() => store.getters.randomItems(id));

var toggleSort = (e) => {
  store.commit("toggleSort", e.target.id);
};

var toggleItems = (e) => {
  store.commit("toggleItems", e.target.id);
};

var updateCheckbox = (e) => {
  store.commit("updateCheckbox", {
    value: e.target.checked,
    id: e.target.id,
    parentId: e.target.dataset.parentid,
  });
};

var updateCount = (e) => {
  store.commit("updateCount", {
    value: +e.target.value,
    id: e.target.id,
    parentId: e.target.dataset.parentid,
  });
};

var updateColor = (e) => {
  store.commit("updateColor", {
    value: e.target.value,
    id: e.target.id,
    parentId: e.target.dataset.parentid,
  });
};

var updateList = (e) => {
  store.commit("updateList", {
    value: e.target.checked,
    id: e.target.id,
  });
};
</script>

<style scoped>
* {
  margin: 0;
}

.checkbox {
  -webkit-appearance: initial;
  appearance: initial;
  width: 13px;
  height: 15px;
  position: relative;
  border: 1px solid rgb(133, 133, 133);
  border-radius: 3px;
}

.checkbox:checked:after {
  content: "■";
  position: absolute;
  left: 50%;
  top: 40%;
  -webkit-transform: translate(-50%, -50%);
  -moz-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.container {
  display: flex;
  justify-content: space-around;
  margin-top: 40px;
}

.article {
  border: solid 1px black;
  padding: 20px 10px;
  width: 35vw;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section {
  display: flex;
  gap: 10px;
  flex-direction: column;
  border: solid 2px black;
  padding: 5px;
}
</style>
