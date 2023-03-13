//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import './NFTCollection.sol';
contract CollectionFactory {

    using Counters for Counters.Counter;
    Counters.Counter private _collectionId;
    NFTCollection private nftMarketplace;
    
    address payable owner;

    struct Collection{
        uint256 collectionId;
        string name;
        string description;
        string image;
        string logo;
        address owner;
        NFTCollection collection_address; 
    }

    event CollectionCreated (
        uint256 collectionId,
        string name,
        string description,
        string image,
        string logo,
        address owner,
        NFTCollection collection_address
    );
    
    mapping(address => Collection[]) private userToCollections;
    mapping(uint256 => Collection) private idToCollection;

    constructor(){
        owner = payable(msg.sender);
    }

    function create_collection(
        string memory collection_name,
        string memory collection_symbol,
        string memory collection_image,
        string memory collection_logo,
        string memory collection_description
    ) public {
        uint256 collectionCount = _collectionId.current();
        NFTCollection new_nft_collection = new NFTCollection(
            collection_name,
            collection_symbol
        );

        Collection memory newCollection = Collection(
            collectionCount,
            collection_name,
            collection_description,
            collection_image,
            collection_logo,
            msg.sender,
            new_nft_collection
        );

        userToCollections[msg.sender].push(newCollection);
        idToCollection[collectionCount] = newCollection;
        _collectionId.increment();

        emit CollectionCreated(
            collectionCount,
            collection_name,
            collection_description,
            collection_image,
            collection_logo,
            msg.sender,
            new_nft_collection
            );
    }

    function getAllCollections() public view returns(Collection[] memory) {
        uint256 collectionCount = _collectionId.current();
        Collection[] memory collections = new Collection[](collectionCount);
        for(uint256 i = 0; i < collectionCount; i++){
            Collection storage current_collection = idToCollection[i];
            collections[i] = current_collection;
        }
        return collections;
    }
    
    function getCollectionById(uint256 collection_id) public view returns (Collection memory) {
        return idToCollection[collection_id];
    }

    function getMyCollections() public view returns (Collection[] memory){
        uint256 collectionCount = _collectionId.current();
        uint256 my_collection_count = 0;

        for(uint256 i = 0; i< collectionCount; i++){
            if(idToCollection[i].owner == msg.sender){
                my_collection_count++;
            }
        }

        Collection[] memory collections = new Collection[](my_collection_count);
        for(uint256 i = 0; i < my_collection_count; i++){
            if(idToCollection[i].owner == msg.sender){
            Collection storage collection = idToCollection[i];
            collections[i] = collection;            
            }
        }
        return collections;
    }
}

