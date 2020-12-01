import treeNode from "./tree-node"

export default {
    name: 'UiTree',
    components: {
        [treeNode.name]: treeNode
    },
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    setup(props) {
        let data = props.data;  // 获取用户传递过来的数据

        function renderNode(data) {
            if (data && data.length === 0) return <div>暂无数据.</div>

            return data.map(item => <ui-tree-node data={item}></ui-tree-node>)
        }

        return () => {
            return <div class="ui-tree">
                {renderNode(data)}
            </div>
        }
    }
}