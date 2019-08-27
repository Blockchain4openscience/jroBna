# Journal of Research Objetcs

The project is curretly in development using frameworks and tools from Hyperledger, in particular [Fabric](https://hyperledger-fabric.readthedocs.io/en/release-1.1/) and [Composer](https://hyperledger.github.io/composer/latest/introduction/introduction)  


The business network is designed to capture the interactions between researchers within the academic community as well as participants from outside of the academia. The interactions involve digital research objetcs, that are shared and traded as assets accross a network. Some examples of digital research objects are: documents, presentations, datasets, code, among other object considered as valuable in the process of creating knowledge in a disciple onr accross many disicplines. A basic setup of a business network involves the digital research objets as `assets` and researchers and institutions as `participants`. These `participants` exchange the `assets` using different types of `smart contracts`. The business network may be used to register interactions among `participants`, provide tractability for the value creation process in science and it may include a system of `tokens` to reward interactiosn among participants.     

We will be posting updates on different versions of the business network `jro` that can be used both in the [Composer Playground](https://composer-playground.mybluemix.net/) or can be deployed locally in Fabric. The individual files that make up the business network archive are in the directory `jro` of the repository.

## Fabric Network Design

This step

The [jro](https://github.com/Blockchain4openscience/jroBna/tree/master/jro) folder contains the bussines network definition and a bussiness network archive called __jro@0.0.1.bna__ generated from this definition . If you wish, you can generate a business network archive with:

```
composer archive create -t dir -n .
```

After creating the .bna file, the business network can be deployed to the instance of Hyperledger Fabric, [bootstrap a simple fabric network](https://hyperledger.github.io/composer/latest/tutorials/deploy-to-fabric-single-org). 

For the next steps you must have the name of the __PeerAdmin__ card created in previous steps. 

Deploying a business network to the Hyperledger Fabric requires the Hyperledger Composer business network to be installed on the peer, then the business network can be started, and a new participant, identity, and associated card must be created to be the network administrator. Finally, the network administrator business network card must be imported for use, and the network can then be pinged to check it is responding.


0. import the business network card for the Hyperledger Fabric administrator,
`````
composer card import -f PeerAdmin@fabric-network.card
`````

1. To install the business network:

```
composer network install --card PeerAdmin@fabric-network --archiveFile jro@0.0.3.bna
```

If __PeerAdmin__ card name is different to PeerAdmin@hlfv1 replace this value

2. To start the business network:

```
composer network start --networkName jro --networkVersion 0.0.3 --networkAdmin admin --networkAdminEnrollSecret adminpw --card PeerAdmin@fabric-network 
```

This command generate a file for the admin network card __admin@jro.card__ 

1. To import the network administrator identity as a usable business network card:

```
composer card import --file admin@jro.card
```

4. To check that the business network has been deployed successfully, run the following command to ping the network:

```
composer network ping --card admin@jro
```

## Generating a REST server

Hyperledger Composer can generate a bespoke REST API based on a business network. For developing a web application, the REST API provides a useful layer of language-neutral abstraction.

1. To create the REST API, navigate to the bforos directory and run the following command:

```
composer-rest-server
```

2. Enter admin@jro as the card name.
3. Select __never use namespaces__ when asked whether to use namespaces in the generated API.
4. Select __No__ when asked whether to secure the generated API.
5. Select __Yes__ when asked whether to enable event publication.
6. Select __No__ when asked whether to enable TLS security.

or just type the following command

```
composer-rest-server -c admin@jro -n never -w true
```

The generated API is connected to the deployed blockchain and business network.

## Composer Rest Server

Launch your browser and go to the URL given [http://localhost:3000/explorer](http://localhost:3000/explorer) for interacting with it. Rest server generates an endpoint for each participant, asset and transaction of the business network definition. Go to the [business model](https://github.com/Blockchain4openscience/jroBna/tree/master/jro) to review all operations in the rest server. yo can use a api environment tool (e.g. [Postman](https://www.getpostman.com/)) to send Http Request to Hypeledger. 

Additionally you can run hyperledger playground to see easily the changes in the components of the business model. 

```
composer-playground
```

## Destroy a previous set up
After testing the bna desgined with Composer and deployed onto Fabric it is important to tidy up by stopping fabric. Navigate to the folder where you initially started the Hyperledger Fabric network.

`````
./stopFabric.sh
./teardownFabric.sh
`````
delete the composer cards
`````
composer card delete -c name
`````
delete the file sytem card store
`````
rm -fr ~/.composer
`````
and clear the docker cointainers.

`````
./teardownAllDocker.sh
`````
Select option 1- Kill and remove only the containers. Then delete the images created, 
`````
docker rmi $(docker images dev-* -q)
`````