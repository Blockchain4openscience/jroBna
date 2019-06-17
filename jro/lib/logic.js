/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

    // Update Researcher registry
    let participantRegistry = await getParticipantRegistry('org.jro.Researcher');
    await participantRegistry.update(createROData.creator);
    
    let event = getFactory().newEvent('org.jro','WalletEvent');
    event.claimer = createROData.creator;
    const balance = createROData.creator.wallet;
    event.oldBalance = balance;
    event.newBalance = balance + roj.reward; // This needs to be verified!
    emit(event);
}

/**
* Create a research object after it is created
* Recieve a reward on succesefully create Ro's
* @param {org.jro.Enrich} updateROData
* @transaction
*/
async function UpdateResearchOJ(updateROData) {
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

    // Update Researcher registry
    let participantRegistry = await getParticipantRegistry('org.jro.Researcher');
    await participantRegistry.update(updateROData.creator);

    
}

