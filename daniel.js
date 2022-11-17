class DanielReactive {
    constructor(options) {
        this.origen = options.data();
        // Destino
        this.$data = new Proxy(this.origen, {
            get(target, name) {
                if (Reflect.has(target, name)) {
                    return Reflect.get(target, name)
                }
                console.log('la Propiedad', name, 'no existe');
                return ''
            },
            set(target, name, value) {
                console.log('Modificando');
                Reflect.set(target, name, value)
            }
        })
    }

    mount() {
        document.querySelectorAll('*[d-text]').forEach(el => {
            this.dText(el, this.$data, el.getAttribute('d-text'))
        })

        document.querySelectorAll('*[d-model]').forEach(el => {
            const name = el.getAttribute('d-model');
            this.dModel(el, this.$data, name);

            el.addEventListener('input', () => {
                Reflect.set(this.$data, name, el.value)
            })
        })
    }

    dText(el, target, name) {
        el.innerText = Reflect.get(target, name);
    }

    dModel(el, target, name) {
        el.value = Reflect.get(target, name);
    }
}

var Daniel = {
    createApp(options) {
        return new DanielReactive(options)
    }
}