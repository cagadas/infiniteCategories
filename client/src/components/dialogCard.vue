<template>
  <div v-show="show" class="overlay">
    <div class="dialog">
      <div class="dialog__content">
        <h2 v-text="title"></h2>
        <p v-text="description" class="dialog__p"></p>
      </div>
      <slot></slot>
      <hr style="margin-top: 1.25rem" />
      <div class="dialog__footer">
        <button @click="cancel" class="dialogBtn cancel">Cancel</button>
        <button @click="confirm" class="dialogBtn save">Save</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dialogCard",
  props: ["show", "title", "description", "cancel", "confirm"],
};
</script>

<style>
.overlay {
  background-color: rgba(0, 0, 0, 0.5);
  height: 100%;
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  width: 100%;
  z-index: 10;
}
.dialog {
  background-color: rgba(255, 255, 255, 1);
  margin-left: auto;
  margin-right: auto;
  margin-top: 2.5rem;
  max-width: 100%;
  max-width: 30rem;
}
.dialog__content {
  padding: 1rem 0.75rem 0.25rem 0.75rem;
}
.dialog__footer {
  display: flex;
  justify-content: flex-end;
  padding: 0rem 0.5rem 1rem 0;
}
.dialog__p {
  width: inherit;
  white-space: pre-wrap;
}
.dialogBtn {
  box-shadow: black 2px 3px;
  border: 1px solid black;
  padding: 4px 8px 3px 8px;
  margin-right: 3px;
  font-size: 15px;
}
.dialogBtn:active {
  transform: translateY(3px);
}
.save {
  color: white;
  background-color: #27ae60;
}
.cancel {
  color: white;
  background-color: #c0392b;
}
</style>