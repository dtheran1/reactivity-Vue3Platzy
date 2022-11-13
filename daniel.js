class DanielReactive {
    constructor(options) {
        this.origen = options.data();
        // Destino
        this.$data = new Proxy(this.origen, {
          
        })
    }

    mount() {
        document.querySelectorAll('*[d-text]').forEach(el=> {
            this.dText(el, this.origen, el.getAttribute('d-text'))
        })
    }

    dText(el, target, name) {
        el.innerText = target[name]
    }

    dModel() {}
}

var Daniel = {
    createApp(options) {
        return new DanielReactive(options)
    }
}