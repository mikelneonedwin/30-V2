const { createApp, ref, reactive, computed } = Vue;
window.addEventListener('DOMContentLoaded', () => {
    createApp({
        setup(){
            const text = ref('');
            const adn = i => text.value += i;
            const ctx = computed(() => {
                return String(text.value).split(' ').map(val => {
                    if(!val.length) return ' ';
                    if(val.includes('.')) return val;
                    if(val.length < 3) return val;
                    return (String(val).split('').reverse().join('').match(/.{1,3}/g) || []).map(part => part.split('').reverse().join('')).reverse().join(',') ;
                }).join(' ');
            })

            function sym(x){
                if(text.value.charAt(text.value.length - 1) == " ") return;
                return text.value += ` ${x} `;
            }

            function dot(){
                if(text.value.charAt(text.value.length - 1) == '.') return;
                return text.value += '.';
            }

            const theme = ref((() => {
                if(localStorage.getItem("theme")) return JSON.parse(localStorage.getItem("theme"));
                localStorage.setItem("theme", false);
                return false;
            })());
            const ax = document.documentElement.classList;
            theme.value ? ax.add("dark") : ax.remove("dark");

            function cxl(){
                localStorage.setItem("theme", theme.value);
                return theme.value ? ax.add("dark") : ax.remove("dark");
            }

            return { text, adn, ctx, sym, dot, eval, theme, cxl }
        }
    }).mount('body');
})