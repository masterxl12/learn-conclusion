import treeNode from "./tree-node"
import {getCurrentInstance, provide} from 'vue'
import {flattenTree} from "./util";


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

        let flatMap = flattenTree(data);

        function renderNode(data) {
            if (data && data.length === 0) return <div>暂无数据.</div>

            return data.map(item => <ui-tree-node data={item}></ui-tree-node>)
        }

        const methods = {
            getCheckNodes() {
                // 对拍平后的数组 获取选中的节点
                return Object.values(flatMap).filter(item => item.node.checked);
            },

            // 父节点选中时，通知下面所有的子节点都选中
            updateTreeDown(node, checked) {
                if (node.children) {
                    node.children.forEach(child => {
                        child.checked = checked;
                        methods.updateTreeDown(child, checked)
                    })
                }
            },

            // 通知上面父亲节点选中
            updateTreeUp(node, checked) {
                let parent = flatMap[node.key].parent; // 获取当前节点的父节点
                if (!parent) return;
                if (checked) {
                    parent.checked = parent.children.every(node => node.checked);
                } else {  // 自己没有选中父亲就没有选中
                    parent.checked = false;
                }
                methods.updateTreeUp(parent, checked);
            }
        };

        provide("TREE_PROVIDER", {treeMethods: methods});

        const instance = getCurrentInstance();
        instance.ctx.getCheckNodes = methods.getCheckNodes;

        return () => {
            return <div class="ui-tree">
                {renderNode(data)}
            </div>
        }
    }
}