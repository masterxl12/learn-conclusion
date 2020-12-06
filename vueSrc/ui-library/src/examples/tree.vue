<template>
    <ui-tree :data="treeData" ref="tree"></ui-tree>

    <ui-button @click="getCheckNodes">获取选中内容</ui-button>
</template>

<script>
    import {reactive, toRefs, ref} from 'vue'

    export default {
        name: "tree",
        setup(props) {
            const tree = ref(null);

            const state = reactive({
                treeData: [
                    {
                        id: 1,
                        name: '菜单1',
                        children: [{
                            id: '1-1',
                            name: '菜单 1-1',
                            children: [{
                                id: '1-1-1',
                                name: '菜单 1-1-1'
                            }]
                        }]
                    },
                    {
                        id: 2,
                        name: '菜单2',
                        children: [{
                            id: '2-1',
                            name: '菜单 2-1',
                            children: [{
                                id: '2-1-1',
                                name: '菜单 2-1-1'
                            }]
                        }, {
                            id: '2-2',
                            name: '菜单 2-2',
                            children: [{
                                id: '2-2-1',
                                name: '菜单 2-2-1'
                            }]
                        }]
                    }
                ]
            });

            function getCheckNodes() {
                // 外层组件中获取当前组件的方法
                console.log(tree.value.getCheckNodes());  // 获取当前组件的实例
            }


            return {
                ...toRefs(state),
                tree,
                getCheckNodes
            }

        }
    }
</script>