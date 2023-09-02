const { createApp, ref, reactive } = Vue;

createApp({
    setup(){
        const imgArray = Array(4).fill(1).map((a,b) => a + b).map(a => ({
            main: `./images/image-product-${a}.jpg`,
            thumbnail: `./images/image-product-${a}-thumbnail.jpg`,
            active: false,
        }));
        imgArray[0].active = true;
        const images = reactive(imgArray);
        const count = ref(0);
        function active(img){
            images.forEach(a => a.active = false);
            img.active = true;
        }
        function n(x){
            const index = images.indexOf(images.find(a => a.active));
            const curr = x == '+' ? images[index + 1] || images[0] : images[index - 1] || images[images.length - 1];
            return active(curr);
        }
        const small = innerWidth <= 1023;
        const cart = reactive([]);
        function calc(){
            if(!count.value) return;
            cart.push(count.value);
            count.value = 0;
        }
        const showCart = ref(false);
        const showNav = ref(innerWidth < 1024 ? false : true);
        const ns = showNav.value;
        function inv(){ if(!ns) showNav.value = !showNav.value; }
        return { images, count, active, n, small, calc, cart, showCart, showNav, inv }
    }
}).mount('main');