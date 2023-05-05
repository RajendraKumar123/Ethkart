// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";
// import "../node_modules/hardhat/console.sol";

contract main{
    // state variable assigning it to public
    bytes public name;
    address owner;

    uint public totalProducts;

   constructor(){
        name="BlockCamp";
        //who is the deploying the contract
        owner=msg.sender;
        
    }

    modifier ownerOnly() {
        require(msg.sender==owner,"You are not the owner");
        _;
    }

    modifier productExists(uint _id){
        require(productById[_id].id==_id,"Product does not exist ,Sry for the incovience");
        _;
    }

     modifier valdateData(address _addr){
        require(_addr!=address(0),"Not a valid address");
        _;
    }

    function changeOwner(address _owner) public ownerOnly valdateData(_owner){
        owner=_owner;
    }

    // modifier payableOnly(){
    //     require(msg.value>0,"You need to pay for the product");
    //     _;
    // }

    struct Product{
        uint id;
        address name;
        uint price;
        uint quantity;
        address owner;
        uint timestamp;
    }

    function setNameofOwner(bytes memory _name) public ownerOnly{
        name=_name;

    }

    // use this to change the ownership of the data 
    function setOwner(address _owner) public ownerOnly{
        owner=_owner;

    }

    function getNameofOwner() public view returns(bytes memory){
        return name;
    }

    function getbalance() public view returns(uint){
        return address(this).balance;
        
    }


    // mapping to store the product by id
    mapping(uint=>Product) public productById;

    mapping(address=>uint) public orderCount;


    event orderPlaced(uint _id,uint _quantity,uint _timestamp);

    event orderUpdated(uint _id,uint _quantity,uint _timestamp);
    
    // to be used later on 
    struct ordering{
       uint Product;
       uint quantity;
       uint timestamp;
    }

    function addProduct(uint _id,address _name,uint _price,uint _quantity) public ownerOnly{
       
        productById[_id]=Product(_id,_name,_price,_quantity,msg.sender,block.timestamp);   
        totalProducts++;
    
    }

    function updateProduct(uint _id,address _name,uint _price,uint _quantity) public ownerOnly{
        productById[_id]=Product(_id,_name,_price,_quantity,msg.sender,block.timestamp);
        // totalProducts--;
    }

    function removeProduct(uint _id) public ownerOnly{
        delete productById[_id];
        totalProducts--;
        
    }


    function buyProduct(uint _id,uint _quantity) public  payable productExists(_id){

        require(productById[_id].quantity>=_quantity,"Not enough quantity");
        

        require(msg.value>=productById[_id].price*_quantity,"Not enough money");

        productById[_id].quantity-=_quantity;

        payable(productById[_id].owner).transfer(msg.value);
    
    }

    function withdraw() public ownerOnly{
        payable(owner).transfer(address(this).balance);
    }

    function getallProducts() public view returns(Product[] memory){
        Product[] memory products=new Product[](totalProducts);
        uint count=0;
        for(uint i=0;i<totalProducts;i++){
            if(productById[i].id!=0){
                products[count]=productById[i];
                count++;
            }
        }
        return products;
    }

    function get_Product(uint _id) public view returns(Product memory){
        return productById[_id];
    }


    

 


    
}