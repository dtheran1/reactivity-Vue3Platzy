class DanielReactive {
    deps = new Map();
    constructor(options) {
        this.origen = options.data();

        const self = this;
        // Destino
        this.$data = new Proxy(this.origen, {
            get(target, name) {
                if (Reflect.has(target, name)) {
                    self.track(target, name)
                    return Reflect.get(target, name)
                }
                console.log('la Propiedad', name, 'no existe');
                return ''
            },
            set(target, name, value) {
                Reflect.set(target, name, value)
                self.trigger(name)
            }
        })

    }

    track(target, name) {
        if (!this.deps.has(name)) {
            const effect = () => {
                document.querySelectorAll(`*[d-text=${name}]`).forEach(el => {
                    this.dText(el, target, name)
                })
            }
            this.deps.set(name, effect)
        }
    };

    trigger(name) {
        const effect = this.deps.get(name);
        effect();
    };

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