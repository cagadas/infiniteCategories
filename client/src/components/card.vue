<template>
  <div class="c-card">
    <div>
      <div>
        <span style="float: left; padding-top: 12px">{{ header }}</span>
        <button-group
          @onAdd="addCategory"
          @onEdit="updateCategory"
          @onNext="$emit('onNext', selectData)"
          @onDelete="$emit('onDelete', selectData)"
        />
      </div>
      <div class="cardBox">
        <div
          v-for="(data, index) in categoryData"
          :key="index"
          :class="columnColor[index]"
          :style="data.disable ? 'color: #CCC;cursor: not-allowed; ' : ''"
          class="text"
          @click="selectCategory(data)"
        >
          <span>{{ data.categoryName }}</span>
        </div>
      </div>
    </div>
    <span style="margin-left: 10px">>></span>
    <dialog-card
      :show="showDialog"
      :cancel="cancel"
      :confirm="sendData"
      :title="dialogHeader"
      :description="dialogLabel"
    >
      <span style="margin-right: 7px"> Category Name:</span>
      <input type="text" v-model="categoryModel.attributes.categoryName" />
    </dialog-card>
  </div>
</template>

<script>
//models
import CategoryModel from "../models/Category";

//components
import buttonGroup from "./buttonGroup";
import dialogCard from "./dialogCard";

export default {
  data() {
    return {
      categoryModel: new CategoryModel(),
      showDialog: false,
      isEdit: false,
      selectedIndex: 0,
      categoryName: "",
      //Object
      selectData: null,
    };
  },
  props: {
    header: { type: String, default: "Categories" },
    categoryData: { type: Array },
  },
  components: { buttonGroup, dialogCard },
  computed: {
    columnColor() {
      var selectedData;
      var colorArr = [];
      selectedData = this.selectData;
      if (selectedData !== null) {
        this.categoryData.forEach((t) => {
          if (t.id === selectedData.id) {
            colorArr.push("active");
          } else {
            colorArr.push("deActive");
          }
        });
      }
      return colorArr;
    },
    dialogLabel() {
      var label;
      if (this.selectData !== null) {
        if (this.isEdit) {
          label =
            "Are you sure you want to update " + this.selectData.categoryName;
        } else {
          label =
            "Are you sure you want to add a new category to " +
            this.selectData.categoryName;
        }
      } else {
        label = "Do you want to add a new main category?";
      }
      return label;
    },
    dialogHeader() {
      var header;
      header = this.isEdit ? "Update a Category" : "Add a Category";
      return header;
    },
  },
  methods: {
    selectCategory(val) {
      this.categoryData.forEach((t) => {
        t.active = false;
      });
      if (!val.disable) {
        val.active = true;
      }
      this.selectData = val;
    },
    cancel() {
      this.showDialog = false;
    },
    addCategory() {
      this.isEdit = false;
      this.showDialog = !this.showDialog;
    },
    updateCategory() {
      this.isEdit = true;
      this.showDialog = !this.showDialog;
      this.categoryModel.attributes = {};
    },
    sendData() {
      if (!this.isEdit) {
        this.categoryModel.attributes.parentId =
          this.selectData !== null ? this.selectData.id : 0;
        this.categoryModel
          .create()
          .then(() => {
            this.$notify.show({
              header: "Category Added",
              text: "New Category created",
              backgroundColor: "green",
            });
            this.showDialog = false;
          })
          .catch(() => {
            this.$notify.show({
              header: "Error",
              text: "Error",
              backgroundColor: "#bf471f",
            });
          });
      } else {
        if (this.selectData !== null) {
          this.categoryModel
            .update(this.categoryModel.attributes.id)
            .then(() => {
              this.$notify.show({
                header: "Category Editted",
                text:
                  "Selected category updated as " +
                  this.selectData.categoryName,
                backgroundColor: "green",
              });
              this.showDialog = false;
            });
        } else {
          this.$notify.show({
            header: "Select A Category",
            text: "How can i update a category without a selection??",
            backgroundColor: "#bf471f",
          });
        }
      }
    },
  },
};
</script>

<style >
.c-card {
  margin-right: 10px;
  display: flex;
  align-items: center;
}
.cardBox {
  display: flex;
  flex-direction: column;
  min-width: 300px;
  min-height: 280px;
  background: white;
  border: 1px solid black;
}
.text {
  padding: 3px 0px 0px 7px;
  text-align: left;
  background: #fff;
  cursor: pointer;
  transition: 0.3s ease;
}
.active {
  background: #95bcf2;
}
.deActive {
  background: #fff;
}
</style>