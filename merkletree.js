//require for unit tests of applications
const assert = require('assert');

const crypto = require('crypto');

//package require for merkle tree implementation
const MerkleTree = require('@garbados/merkle-tree')

class merkleTree{
constructor(digestFn,data){

// assert(['string','function'].includes(typeof digestFn),'a merkle tree require a digest function.');

// assert(data instanceof Array, 'A Merkle tree requires an array of values.');

if (typeof digestFn === 'string') {

    this.digestFn = MerkleTree.digestFn.bind(null, digestFn);

  } 
  else {
    this.digestFn = digestFn;
  }

  const leaves = data.map(this.digestFn);
  this._levels = [leaves].concat(this._derive(leaves));//defination of  _drive function given below 
}

//Convenience wrapper around NodeJS' built-in crypto.
//it takes two parameter one for the type of algorithm use for cryptography and other is data that converted to the hash 
// digestFn function always return hash value(string)
static digestFn (hashType, data) {

    if (typeof data !== 'string') data = JSON.stringify(data);
    const hash = crypto.createHash(hashType);
    hash.update(data);
    return hash.digest('hex');
  }



//derive hash to intermediate node form hash of leaf node

  _derive (data) {
    let level = []
    // successively hash arbitrary elements

    for (let i = 0; i < data.length; i += 2) {
      const left = data[i]
      const right = (i + 1 === data.length)
        ? left
        : data[i + 1]
      const node = JSON.stringify([left, right])
      level.push(this.digestFn(node))
    }
    

    if (level.length > 1) {
      // keep deriving among the middle nodes
      return [level].concat(this._derive(level))
    } else {
      // found root node
      return [level]
    }

  }

  //function to get the root of merkle tree
  get root () {
    return this.levels[this.levels.length - 1][0];
  }

 //function to get the number of levels in merkle tree
  get levels () {
    return this._levels;
  }

  //function to get the hash of each leaves 
  get leaves () {
    return this.levels[0];
  }

}

// let a=1;
// let c=2;
// let d=3;
// let e=5;

// const tree = new merkleTree('sha256', [a, c, d, e])
//   console.log(tree.root);

// const tree = new merkleTree('sha256', [1, 2, 3, 4, 5, 6])
//   console.log(tree.root);




// const one = merkleTree.digestFn('sha256','helloworld');
// console.log(one);

const tree = new MerkleTree('sha256', [1, 2, 3, 4, 5, 6,7,8,9,10])

    console.log("the depth of tree");
    console.log(tree.depth);

    console.log("hash at every lavel of tree");
    console.log(tree.levels);


    console.log("root of merkle tree is"+"  "+tree.root);


    console.log("all the hash of leaf node are");
    console.log(tree.leaves);

 

