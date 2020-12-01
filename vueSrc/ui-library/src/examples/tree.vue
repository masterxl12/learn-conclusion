<template>
    <ui-tree :data="treeData"></ui-tree>
</template>

<script>
    import {reactive, toRefs} from 'vue'

    export default {
        name: "tree",
        setup(props) {

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

            return {
                ...toRefs(state)
            }

        }
    }
</script>