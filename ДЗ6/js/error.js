Vue.component("errordiv",{
    template: `<div class="errorDiv" v-if="$root.error">Получен следующий текст ошибки: {{ $parent.errortext }}</div>`
})