# Journal of Research Objects

description of project

This business network defines:

 **Participant**
`Researcher`

**Asset**
`ROJ`

**Transaction**
`Add`
`Enrich`

**Event**
`WalletEvent`
`CountEvent`

## Resercher Objects

A reserach objetc (`ROJ`) asset is an intermidiate input in the research cycle (document, code, database, presentation, image, etc..) that is made accesible and findable through IPFS. In addition to basic information (id, url, type), the `ROJ` asset has reward, cost and a count of the times it is accessed. A `ROJ` can be added to a local IPFS node and enriched with metadata. 

## Researcher

`Reasearcher` participant is able to `Add` a research object `ROJ` asset onto a IPFS node. Initially the `ROJ` is added to registry and the `Reasearcher` recieves a reward from the creation of a `ROJ`. This reward will be reflected in his personal wallet using the smart contract `Add` that generates an event `WalletEvent` that indicates that the wallet has been updated. Additionally, the smart contract `Add` assigns as contributor of the asset to the `Reasearcher`.

`Reasearcher` participant is able to `Enrich` a research object `ROJ` asset that has been created in IPFS. The `Researcher` will include metadata to the registry regarding the information on the research object.

To test this Business Network Definition in the **Test** tab:

Create two `Researcher` participant:

```json
{
  "$class": "org.jro.Researcher",
  "researcherId": "0000-0001-6812-2176",
  "email": "John.Smith@gmail.com",
  "name": "John Smith",
  "ipfsId": "Q.IPFS.PublicKey",
  "institution": {
    "$class": "org.jro.afiliation",
    "name": "School of Life",
    "address": "memory lane",
    "Iurl": "https://www.theschooloflife.com/"
  },
  "correspAuth": true,
  "wallet": 10
}
```

Create a `ROJ` asset. 

1. The research objects can be created directly. With this method you can create a research object without contributors: 

```json
{
  "$class": "org.jro.ROJ",
  "rojId": "Q.IPFS.ObjectHash",
  "typeRO": "other",
  "node": "",
  "description": "",
  "reward": 1,
  "cost": 1,
  "countAccess": 0,
  "contributors": ["resource:org.jro.Researcher#0000-0001-6812-2176"],
  "hash": ""
}
```

2. The research objects can be created by the smart contract `Add`. 

```json
{
  "$class": "org.jro.Add",
  "rojId": "",
  "node": "",
  "creator": "resource:org.jro.Researcher#4656"
}```

Unlike the first method, this method generate a wallet event for `0000-0001-6812-2176` that creates the researcher object an assigns as contributor

```json
```

Submit a `Enrich` transaction:

```json
{
  "$class": "org.jro.Enrich",
  "rojId": "resource:org.jro.ROJ#Q.IPFS.ObjectHash",
  "typeRO": "notebook",
  "description": "AtlasReader, a Python interface for generating coordinate tables and region labels from statistical MRI images",
  "creator": "resource:org.jro.Researcher#0000-0001-6812-2176"
}
```

This transaction has registered ... the research objet; additionally it rewards x points to `0000-0001-6812-2176`. This reward will be reflected in the new state of his wallet; the change in the state of the wallet is recorded as an event.

```json
{
}
```