/*
  Given the root of the following tree...
       A
      /\
    B   C
   /\
  D E
  Write a recursive algorithm that returns its values as an array, ordered using a depth first search, pre-order strategy.
*/
module.exports.preOrder = function(root) {

  // I'm extremely confused on how to get left and right.....

  var data = [];
  var current = root;
  console.log(root);

  var search = function(node){

    data.push(node.name)

    if(node.parent === current.name){
      return search(node.children)
    }

    // if(node.right){
    //   search(node.right)
    // }

  }

  search(current);
  return data;

};

/*
  Given the root of the following tree...
       A
      /\
    B   C
   /\
  D E
  Write a recursive algorithm that returns its values as an array, ordered using a depth first search, in-order strategy.
*/
module.exports.inOrder = function(root) {

};

/*
  Given the root of the following tree...
       A
      /\
    B   C
   /\
  D E
  Write a recursive algorithm that returns its values as an array, ordered using a depth first search, post-order strategy.
*/
module.exports.postOrder = function(root) {

};
