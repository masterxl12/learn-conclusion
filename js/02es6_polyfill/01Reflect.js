const vm = {
    msg: 'frontDevelop',
    color: "white",
    showMsg() {
        console.log(this.color)
    }
}

Reflect.ownKeys(vm);

Reflect.has(vm,'msg');

Reflect.set(vm,'gender','female');

