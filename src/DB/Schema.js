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
    nftCollection: Collection;
    properties: string[];
    ownerWallet: string;
    owner: User;

    constructor(
        id: string,
        tokenId: string,
        chainId: string,
        tokenURI: string,
        user: User,
        nftCollection: Collection,
        properties: string[],
        name: string,
        image: string,
        description: string,
        nftCollection: string,
        ownerWallet: string
        
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
