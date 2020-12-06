export const flattenTree = (data) => {
    let key = 0;

    function flat(data, parent) {
        return data.reduce((obj, currentNode) => {
            currentNode.key = key;  // 给每个节点添加一个标识
            obj[key] = {
                parent,
                node: currentNode
            };
            key++;
            if (currentNode.children) {
                obj = {...obj, ...flat(currentNode.children, currentNode)}
            }
            return obj;
        }, {})

    }

    return flat(data)
};
