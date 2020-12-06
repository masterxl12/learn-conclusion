import {computed, withModifiers, inject} from 'vue'


export default {
    name: 'UiTreeNode',
    props: {
        data: {
            type: Object,
            default: {}
        }
    },
    setup(props) {
        let data = props.data;

        const {treeMethods} = inject("TREE_PROVIDER");

        // 是否显示箭头
        let showArrow = computed(() => {
            return data.children && data.children.length > 0;

        });

        // 计算节点的样式  无叶子节点时不添加箭头
        const classes = computed(() => [
            'ui-tree-node',
            !showArrow.value && 'ui-tree-node-expand'
        ]);

        // ---------------------方法-----------------------
        const methods = {
            handleExpand() {
                data.expand = !data.expand;
            },

            handleCheck() {
                data.checked = !data.checked;
                treeMethods.updateTreeUp(data, data.checked);
                treeMethods.updateTreeDown(data, data.checked);
            }
        };

        return () => (
            <div class={classes.value}>
                <div class="ui-tree-label" onClick={methods.handleExpand}>
                    <ui-icon icon="arrow"></ui-icon>
                    <input type="checkbox" checked={data.checked}
                           onClick={withModifiers(methods.handleCheck, ['stop'])}/>
                    <span>{data.name}</span>
                </div>
                {/* 有children 再次渲染children节点 */}
                <div class="ui-tree-list" vShow={data.expand}>
                    {data.children && data.children.map(child => <ui-tree-node data={child}></ui-tree-node>)}
                </div>
            </div>
        );
    }
}