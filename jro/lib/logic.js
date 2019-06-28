'use strict';
/**
 * Write your transction processor functions here
 */

/**
* Create a research object and emit a WalletEvent on creation.
* @fires org.jro.WalletEvent
* @param {org.jro.Add} createROData
* @transaction
*/
async function createResearchOJ(createROData) {
	
    const factory = getFactory(); 
    // Modify RO
    const roj = factory.newResource('org.jro','ROJ',createROData.rojId);
    roj.node=createROData.node; // Populate the node value in the asset

    if (typeof roj.contributors == 'undefined') { // Check if the array is empty
          roj.contributors = new Array();
          roj.contributors[0] = createROData.creator;
    } 
    else {
          roj.contributors.push(createROData.creator);
    }

    // Update the asset registry
    let assetRegistry = await getAssetRegistry('org.jro.ROJ');
    await assetRegistry.add(roj);

    // Modify participants Wallet
    const balance = createROData.creator.wallet;
    createROData.creator.wallet=balance+roj.reward;

    // Update Researcher registry
    let participantRegistry = await getParticipantRegistry('org.jro.Researcher');
    await participantRegistry.update(createROData.creator);
  
    let event = getFactory().newEvent('org.jro','WalletEvent');
    event.claimer = createROData.creator;
    event.oldBalance = balance;
    event.newBalance = balance + roj.reward; // This needs to be verified!
    emit(event);
}


/**
* Add metadata to research object after it is created
* @fires org.jro.WalletEvent
* @param {org.jro.Enrich} updateROData
* @transaction
*/
async function UpdateResearchOJ(updateROData) {
    
    // Add characteristics to RO
    let roj = updateROData.rojId;
    roj.description = updateROData.description;
    roj.typeRO = updateROData.typeRO;
    let contributors = roj.contributors;

    let contributorexists=0;
    for(let i=0;i<contributors.length;i++){
          if(contributors[i]==updateROData.creator){
          contributorexists=1;
        }
    }
  
    if(contributorexists==0){
        contributors.push(updateROData.creator);
    }

    // Update the asset registry
    let assetRegistry = await getAssetRegistry('org.jro.ROJ');
    await assetRegistry.update(updateROData.rojId);

    // Modify participants Wallet
    const balance = updateROData.creator.wallet;
    updateROData.creator.wallet=balance+roj.reward;
  
    // Update Researcher registry
    let participantRegistry = await getParticipantRegistry('org.jro.Researcher');
    await participantRegistry.update(updateROData.creator);

    let event = getFactory().newEvent('org.jro','WalletEvent');
    event.claimer = updateROData.creator;
    event.oldBalance = balance;
    event.newBalance = balance + roj.reward; // This needs to be verified!
    emit(event);
}
