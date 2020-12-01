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

        return () => (
            <div class="ui-tree-node">
                <div class="ui-tree-label">{data.name}</div>
                {/* 有children 再次渲染children节点 */}
                <div class="ui-tree-list">
                    {data.children && data.children.map(child => <ui-tree-node data={child}></ui-tree-node>)}
                </div>
            </div>
        )

    }
}