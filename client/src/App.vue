<template>
  <div id="app">
    <div class="scroll">
      <div class="row">
        <c-card
          :categoryData="categoryContent"
          @onNext="onNext"
          @onDelete="onDelete"
        >
        </c-card>
        <c-card
          v-for="(data, index) in subCategory"
          :key="index"
          :categoryData="data"
          :header="'Sub - Categories'"
          @onNext="onNext"
          @onDelete="onDelete"
        />
      </div>
    </div>
  </div>
</template>

<script>
//Models
import Category from "./models/Category";

//Components
import CCard from "./components/card";

export default {
  name: "App",
  data() {
    return {
      CategoryModel: new Category(),
      //Array
      categoryContent: [],
      subCategory: [],
    };
  },
  components: { CCard },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.CategoryModel.find({ parent: 0 }).then((res) => {
        res.forEach((c) => {
          c.active = false;
          c.disable = false;
          this.categoryContent.push(c);
        });
      });
    },
    onNext(val) {
      if (val !== null) {
        this.CategoryModel.find({ parent: val.id })
          .then((res) => {
            if (this.subCategory.length > 0) {
              if (
                this.subCategory[this.subCategory.length - 1].findIndex(
                  (e) => e.id === res[0].parentId
                ) !== -1
              ) {
                this.subCategory.push(res);
              } else {
                this.$notify.show({
                  header: "Category Selected",
                  text: "Another main category selected. Reload The Page.",
                  backgroundColor: "#bf471f",
                });
              }
            } else {
              this.subCategory.push(res);
            }
            val.isArrow = true;
          })
          .catch(() => {
            this.$notify.show({
              header: "No Sub Category",
              text: "There are no subcategories for " + val.categoryName,
              backgroundColor: "#bf471f",
            });
          });
      } else {
        this.$notify.show({
          text: "Select a category.",
          backgroundColor: "#bf471f",
        });
      }
    },
    onDelete(val) {
      val.disable = true;
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Jost:wght@400&display=swap");
* {
  font-family: "Jost", sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  scrollbar-color: var(#90a4ae);
}
.row {
  display: flex;
  flex-wrap: no-wrap;
  padding: 10px;
}

.scroll {
  width: auto;
  border: 1px solid black;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}
</style>
