import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace: "rarx",
});

const Schema = await db.applySchema(`
@public
collection NFT {
    id: string;
    tokenId: string;
    chainId: string;
    tokenURI: string;
    name: string;
    image: string;
    description: string;
    isListed: boolean;
    listingPrice: string;
    chain_block: string;
    chain_image: string;
    chain_symbol: string;
    ipfsURL: string;
    nftCollection: Collection;
    properties: string;
    ownerWallet: string;
    owner: User;
    marketAddress: string;

    constructor(
        id: string,
        tokenId: string,
        chainId: string,
        tokenURI: string,
        user: User,
        nftCollection: Collection,
        properties: string,
        name: string,
        image: string,
        description: string,
        isListed: boolean,
        ownerWallet: string,
        chain_block: string,
        chain_image: string,
        chain_symbol: string,
        ipfsURL: string,
        listingPrice: string
    ) {
        this.id = id;
        this.tokenId = tokenId;
        this.chainId = chainId;
        this.tokenURI = tokenURI;
        this.name = name;
        this.image = image;
        this.description = description;
        this.nftCollection = nftCollection;
        this.properties = properties;
        this.ownerWallet = ownerWallet;
        this.owner = user;
        this.isListed = isListed;
        this.chain_block = chain_block;
        this.chain_image = chain_image;
        this.chain_symbol = chain_symbol;
        this.ipfsURL = ipfsURL;
        this.listingPrice = listingPrice;
    }

  cancel_listing(){
    this.isListed = false;
    this.listingPrice = "0";
}

  listNFT(price: string, chainId: string, marketAddress: string) {
    this.isListed = true;
    this.listingPrice = price;
    this.marketAddress = marketAddress;
  }

  executeSale(address: User) {
    this.owner = address;
    this.isListed = false;
    this.listingPrice = "0";
  }
  
}

@public
collection Collection {
    id: string;
    collectionId: string;
    name: string;
    logo: string;
    coverImage: string;
    symbol: string;
    description: string;
    owner: User;

    constructor(
        id: string,
        collectionId: string,
        name: string,
        logo: string,
        coverImage: string,
        symbol: string,
        description: string,
        owner: User
    ) {
        this.id = id;
        this.collectionId = collectionId;
        this.name = name;
        this.logo = logo;
        this.coverImage = coverImage;
        this.symbol = symbol;
        this.description = description;
        this.owner = owner;
    }
}

@public
collection User {
    id: string;
    username: string;
    profileImage: string;
    coverImage: string;
    bio: string;
    email: string;
    wallet: string;
    socials: string[];
    isArtist?: boolean;

    constructor(
        id: string,
        username: string,
        profileImage: string,
        coverImage: string,
        bio: string,
        email: string,
        wallet: string,
        isArtist?: boolean
    ) {
        this.id = id;
        this.username = username;
        this.profileImage = profileImage;
        this.coverImage = coverImage;
        this.bio = bio;
        this.email = email;
        this.wallet = wallet;
        this.socials = [];
        this.isArtist = isArtist;
    }

    setSocials(socials: string[]) {
        assert(msg.sender == this.id, "Only the owner of the account can set socials");
        this.socials = socials;
    }
}



`);
