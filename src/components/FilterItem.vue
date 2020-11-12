<template>
  <div>
    <label class="filter-label">
      <input :id="id" type="radio" name="filter-products" :value="id">
      <span>{{name}}</span>
    </label>
  </div>
</template>

<script>
export default {
  name: "FilterItem",
  props: {
    id: String,
    name: String,
  }
}
</script>

<style scoped>
.filter-label > input {
  position: absolute;
  z-index: -1;
  opacity: 0;
}

.filter-label {
  display: flex;
  align-items: center;
}

.filter-label > span {
  display: flex;
  align-items: center;
  font-size: 12px;
  text-transform: uppercase;
  width: 200px;

  margin: 10px 12px;
  user-select: none;
}

.filter-label > span::before {
  border-radius: 40px;
  content: '';
  display: inline-block;
  padding: 5px;
  width: 26px;
  height: 12px;
  margin-right: 0.5em;
  background-color: #f2f2f2;
  background-repeat: no-repeat;
  background-position: 20% 50%;

  background-image: url('../assets/radio.png');
  transition: .1s linear;
}

.filter-label > input:checked + span::before {
  background-color: #7bb899;
  background-position: 80% 50%;
}
</style>