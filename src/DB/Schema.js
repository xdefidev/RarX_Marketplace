import { Polybase } from "@polybase/client";

const db = new Polybase({
  defaultNamespace: "rarx",
});

const Schema = await db.applySchema(`

    @public
    collection NFT{
        id: string;
        tokenId: string;
        name: string;
        image: string;
        description: string;
        collection: Collection;
        properties: [{type: string, value: string}]; 
        ownerWallet: string
        owner: User

        constructor(
            id: string;
            tokenId: string,
            name: string,
            image: string,
            description: string,
            collection: string,
            properties: [string],
            ownerWallet: string,
            user: User
        ){
            this.id = id;
            this.tokenId = tokenId;
            this.name = name;
            this.image = image;
            this.description = description;
            this.collection = collection;
            this.properties = properties;
            this.ownerWallet = ownerWallet;
            this.owner = user;
        }
    }

    @public
    collection Collection{
        id: string;
        collectionId: string;
        name: string;
        logo: string;
        coverImage: string;
        symbol: string;
        description: string;
        owner: User

        constructor(
            id: string,
            collectionId: string,
            name: string,
            logo: string,
            coverImage: string,
            symbol: string,
            description: string,
            owner: User
        ){
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
    collection User{
        id: string;
        username: string;
        profileImage: string;
        coverImage: string;
        bio: string;
        email: string;
        wallet: string;
        socials: [{platform: string, link: string}];
    }

    constructor(
        id: string;
        username: string;
        profileImage: string;
        coverImage: string;
        bio: string;
        email: string;
        wallet: string;
    ){
        this.id = id;
        this.username = username;
        this.profileImage = profileImage;
        this.coverImage = coverImage;
        this.bio = bio;
        this.email = email;
        this.wallet = wallet;
    }

    setSocials

`);
