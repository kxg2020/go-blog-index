<template>

</template>

<script>
  export default {
    name: "GetImage"
  }
  function GetQueryString(name) {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    let context = "";
    if (r != null)
      context = r[2];
    reg = null;
    r = null;
    let result = context === null || context === "" || context === "undefined" ? "" : context;
    return result
  }
  window.parent.CKEDITOR.tools.callFunction(GetQueryString("CKEditorFuncNum"),GetQueryString("ImageUrl"),GetQueryString("Message"));
</script>

<style scoped>

</style>