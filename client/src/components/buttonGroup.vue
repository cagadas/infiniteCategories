<template>
  <div class="buttonGroup">
    <button @click="$emit('onDelete')" class="button delete">Delete</button>
    <button @click="$emit('onEdit')" class="button edit">Edit</button>
    <button @click="$emit('onAdd')" class="button add">Add</button>
    <button @click="$emit('onNext')" class="button next">Next</button>
  </div>
</template>

<script>
export default {};
</script>

<style>
.button {
  box-shadow: 2px 3px;
  border: 1px solid black;
  padding: 4px 3px 3px 3px;
  margin-right: 3px;
}
.button:active {
  transform: translateY(3px);
}
.buttonGroup {
  float: right;
}
.edit {
  background-color: #ffd966;
}
.delete {
  background-color: #ea9999;
}
.add {
  background-color: #6fa8dc;
}
.next {
  background-color: #20bf6b;
}
</style>