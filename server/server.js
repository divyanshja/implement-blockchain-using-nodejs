const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
var SHA256 = require("crypto-js/sha256");
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 8000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
   
    text: 'welcome here '
   
  });

  socket.on('createMessage', (message) => {
   
    console.log(SHA256(message.text));
/////////////////////////////////////////////////////////////////////////////////////////////////
    
class Block {
  constructor(index, timestamp, data, previousHash = '') {
      this.index = index;
      this.previousHash = previousHash;
      this.timestamp = timestamp;
      this.data = data;
      this.hash = this.calculateHash();
  }

  //create function to calculate the hash of particular block
  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
  }
}
class Blockchain{
  constructor() {
      this.chain = [this.createGenesisBlock()];
  }
  //fucntion to create initial block of blockchain
  createGenesisBlock() {
      
      return new Block(0, "01/01/2017","genesis block", "0");
  }

  
  getLatestBlock() {
      return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {

      newBlock.previousHash = this.getLatestBlock().hash;
      newBlock.hash = newBlock.calculateHash();
      this.chain.push(newBlock);
  }
  

  //for conformation of block of particular blockchain
  isChainValid() {

      for (let i = 1; i < this.chain.length; i++){
          const currentBlock = this.chain[i];
          const previousBlock = this.chain[i - 1];

          if (currentBlock.hash !== currentBlock.calculateHash()) {
              return false;
          }

          if (currentBlock.previousHash !== previousBlock.hash) {
              return false;
          }
      }

      return true;
  }
 
}
let Coin = new Blockchain();
Coin.addBlock(new Block(1, "20/07/2017", {text: message.text}));
//Coin.addBlock(new Block(1, "20/07/2017", {text: message.text}));
console.log(JSON.stringify(Coin, null, 4));
////////////////////////////////////////////////////////////////////////////
  });

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});
