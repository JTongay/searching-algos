const expect = require('chai').expect
const Node = require('../node');
const arrayToNode = require('../array_to_node');
const objectToNode = require('../object_to_node');
const depthFirst = require('../depth_first');



//AddChild
describe('Node', function() {
  describe('addChild', function() {
    it("sets the child node's to itself", function () {
      var node = new Node('root');
      var child = new Node('child');

      node.addChild(child);

      expect(child.parent).to.deep.equal(node);
    });

    it("adds the child to the parents children array", function () {
      var node = new Node('root');
      var child = new Node('child');

      node.addChild(child);

      expect(node.children).to.contain(child);
    });
  });
});

//Array to node
describe('arrayToNode', function() {

  it("returns nodes with a name property containing the first value of the input array", function () {
    var input = [
      'a',
      []
    ];
    var rootNode = arrayToNode(input);
    expect(rootNode).to.have.property('name');
  });

  it("returns nodes with a children property, which is an array", function () {
    var input = [
      'a',
      []
    ];
    var rootNode = arrayToNode(input);
    expect(rootNode).to.have.property('children');
    expect(rootNode.children).to.be.a('array');
  })

  it("turns a two-element array into a node", function () {
    var input = [
      'a',
      []
    ];
    var rootNode = arrayToNode(input);
    console.log(rootNode);
    expect(rootNode.name).to.deep.equal('a');
    expect(rootNode.children).to.deep.equal([]);
  });

  it("turns nested arrays into child nodes with references to their parents", function () {
    var input = [
      'a',
      [
        [
          'b',
          []
        ],
        [
          'c',
          []
        ]
      ]
    ];
    var rootNode = arrayToNode(input);
    expect(rootNode.name).to.deep.equal('a');
    expect(rootNode.children[0].name).to.deep.equal('b');
    expect(rootNode.children[0].parent).to.deep.equal(rootNode);
    expect(rootNode.children[1].name).to.deep.equal('c');
    expect(rootNode.children[1].parent).to.deep.equal(rootNode);
  });

  it("handles deeply nested nodes", function () {
    var input = [
      'a',
      [
        [
          'b',
          [
            [
              'c',
              [
                [
                  'd',
                  []
                ]
              ]
            ]
          ]
        ]
      ]
    ];
    var rootNode = arrayToNode(input);
    expect(rootNode.name).to.deep.equal('a');
    expect(rootNode.children[0].name).to.deep.equal('b');
    expect(rootNode.children[0].parent).to.deep.equal(rootNode);
    expect(rootNode.children[0].children[0].name).to.deep.equal('c');
    expect(rootNode.children[0].children[0].parent).to.deep.equal(rootNode.children[0]);
    expect(rootNode.children[0].children[0].children[0].name).to.deep.equal('d');
    expect(rootNode.children[0].children[0].children[0].parent).to.deep.equal(rootNode.children[0].children[0]);
  });
});

//Object to node
describe('objectToNode', function() {

  it("turns a plain javascript object into a Node", function () {
    var input = {
      name: 'a',
      children: []
    };
    var rootNode = objectToNode(input);
    expect(rootNode.name).to.deep.equal('a');
    expect(rootNode).to.be.an.instanceof(Node);
  });

  it("handles deeply nested objects", function () {
    var input = {
      name: 'a',
      children: [
        {
          name: 'b',
          children: [
            {
              name: 'c',
              children: [
                {
                  name: 'd',
                  children: []
                }
              ]
            }
          ]
        }
      ]
    };
    var rootNode = objectToNode(input);
    expect(rootNode.name).to.deep.equal('a');
    expect(rootNode).to.be.an.instanceof(Node);
    expect(rootNode.children[0].name).to.deep.equal('b');
    expect(rootNode.children[0]).to.be.an.instanceof(Node);
    expect(rootNode.children[0].children[0].name).to.deep.equal('c');
    expect(rootNode.children[0].children[0]).to.be.an.instanceof(Node);
    expect(rootNode.children[0].children[0].children[0].name).to.deep.equal('d');
    expect(rootNode.children[0].children[0].children[0]).to.be.an.instanceof(Node);
  });

  it("handles deeply nested objects with more than one child", function () {
    var input = {
      name: 'a',
      children: [
        {
          name: 'b',
          children: [
            {
              name: 'c',
              children: [
                {
                  name: 'd',
                  children: []
                },
                {
                  name: '3',
                  children: []
                }
              ]
            },
            {
              name: '2',
              children: []
            }
          ]
        },
        {
          name: '1',
          children: []
        }
      ]
    };
    var rootNode = objectToNode(input);
    expect(rootNode.name).to.deep.equal('a');
    expect(rootNode).to.be.an.instanceof(Node);
    expect(rootNode.children[0].name).to.deep.equal('b');
    expect(rootNode.children[1].name).to.deep.equal('1');
    expect(rootNode.children[0]).to.be.an.instanceof(Node);
    expect(rootNode.children[0].children[0].name).to.deep.equal('c');
    expect(rootNode.children[0].children[1].name).to.deep.equal('2');
    expect(rootNode.children[0].children[0]).to.be.an.instanceof(Node);
    expect(rootNode.children[0].children[0].children[0].name).to.deep.equal('d');
    expect(rootNode.children[0].children[0].children[1].name).to.deep.equal('3');
    expect(rootNode.children[0].children[0].children[0]).to.be.an.instanceof(Node);
  });
});

//Depth First
describe.only('depth first search', function() {
  describe('given a tree', function() {
    before(function() {
      const d = new Node('D');
      const e = new Node('E');
      const b = new Node('B', d, e);
      const c = new Node('C');
      this.a = new Node('A', b, c);
    })

    it('returns values ordered by depth first search, pre-order', function() {
      console.log(depthFirst.preOrder(this.a));
      expect(depthFirst.preOrder(this.a)).to.deep.equal(
        ['A', 'B', 'D', 'E', 'C']
      );
    });

    it('returns values ordered by depth first search, in-order', function() {
      expect(depthFirst.inOrder(this.a)).to.deep.equal(
        ['D', 'B', 'E', 'A', 'C']
      );
    });

    it('returns values ordered by depth first search, post-order', function() {
      expect(depthFirst.postOrder(this.a)).to.deep.equal(
        ['D', 'E', 'B', 'C', 'A']
      );
    });
  });
});
