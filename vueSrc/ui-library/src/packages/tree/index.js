import Tree from "./tree";
import "../../styles/tree.scss"

Tree.install = (app) => {
    app.component(Tree.name, Tree)
};

export default Tree;
