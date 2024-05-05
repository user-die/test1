import { createStore } from "vuex";

export default createStore({
  state: {
    lists: [
      {
        name: "List1",
        value: true,
        id: 1,
        sorted: true,
        open: true,
        items: [
          { name: "item1", value: true, count: 1, color: "#ff0000", id: 11 },
          { name: "item2", value: true, count: 4, color: "#8deb00", id: 12 },
          { name: "item3", value: false, count: 5, color: "#fbff00", id: 13 },
          { name: "item4", value: false, count: 4, color: "#2b00ff", id: 14 },
        ],
      },
      {
        name: "List2",
        value: false,
        id: 2,
        sorted: true,
        open: true,
        items: [
          { name: "item1", value: false, count: 7, color: "#2b00ff", id: 22 },
          { name: "item2", value: false, count: 2, color: "#ff0000", id: 23 },
          { name: "item3", value: false, count: 5, color: "#8deb00", id: 24 },
        ],
      },
      {
        name: "List3",
        value: false,
        id: 3,
        sorted: true,
        open: false,
        items: [
          { name: "item1", value: true, count: 1, color: "#ff0000", id: 31 },
          { name: "item2", value: true, count: 4, color: "#8deb00", id: 32 },
          { name: "item3", value: false, count: 5, color: "#fbff00", id: 33 },
          { name: "item4", value: false, count: 4, color: "#2b00ff", id: 34 },
        ],
      },
      {
        name: "List4",
        value: false,
        id: 4,
        sorted: true,
        open: false,
        items: [
          { name: "item1", value: true, count: 1, color: "#ff0000", id: 41 },
          { name: "item2", value: true, count: 4, color: "#8deb00", id: 42 },
          { name: "item3", value: false, count: 5, color: "#fbff00", id: 43 },
          { name: "item4", value: false, count: 4, color: "#2b00ff", id: 44 },
        ],
      },
      {
        name: "List5",
        value: false,
        id: 5,
        sorted: true,
        open: false,
        items: [
          { name: "item1", value: true, count: 1, color: "#ff0000", id: 51 },
          { name: "item2", value: true, count: 4, color: "#8deb00", id: 52 },
          { name: "item3", value: false, count: 5, color: "#fbff00", id: 53 },
          { name: "item4", value: false, count: 4, color: "#2b00ff", id: 54 },
        ],
      },
    ],
  },

  getters: {
    randomItems: (state) => (id) => {
      return state.lists
        .find((el) => el.id == id)
        .items.filter((item) => item.value === true)
        .reduce((acc, element) => {
          for (var i = element.count; i > 0; i--) {
            acc.push({ count: 1, color: element.color, id: element.id + i });
          }
          return acc.sort(() => Math.random() - 0.5);
        }, []);
    },
  },

  mutations: {
    toggleSort(state, payload) {
      state.lists.find((el) => el.id == payload).sorted = !state.lists.find(
        (el) => el.id == payload
      ).sorted;
    },

    toggleItems(state, payload) {
      state.lists.find((el) => el.id == payload).open = !state.lists.find(
        (el) => el.id == payload
      ).open;
    },

    updateCheckbox(state, payload) {
      state.lists
        .find((el) => el.id == payload.parentId)
        .items.find((el) => el.id == payload.id).value = payload.value;
    },

    updateCount(state, payload) {
      state.lists
        .find((el) => el.id == payload.parentId)
        .items.find((el) => el.id == payload.id).count = payload.value;
    },

    updateColor(state, payload) {
      state.lists
        .find((el) => el.id == payload.parentId)
        .items.find((el) => el.id == payload.id).color = payload.value;
    },

    updateList(state, payload) {
      state.lists
        .find((el) => el.id == payload.id)
        .items.map((el) => (el.value = payload.value));
    },
  },
});
