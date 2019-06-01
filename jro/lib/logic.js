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
 * Sample transaction
 * @param {org.jro.SampleTransaction} sampleTransaction
 * @transaction
 */
async function sampleTransaction(tx) {
    // Save the old value of the asset.
    const oldValue = tx.asset.value;

    // Update the asset with the new value.
    tx.asset.value = tx.newValue;

    // Get the asset registry for the asset.
    const assetRegistry = await getAssetRegistry('org.jro.SampleAsset');
    // Update the asset in the asset registry.
    await assetRegistry.update(tx.asset);

    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.jro', 'SampleEvent');
    event.asset = tx.asset;
    event.oldValue = oldValue;
    event.newValue = tx.newValue;
    emit(event);
}

/**
* Create a research object after it is created
* Recieve a reward on succesefully create Ro's
* @param {org.jro.Add} createROData
* @transaction
*/
async function createResearchOJ(createROData) {

    const factory = getFactory(); 
    const roj = factory.newResource('org.jro','ROJ',createROData.rojId);
    roj.node=createROData.node; // Populate the node value in the asset
    roj.contributors.push(createROData.creator);

    // Update the asset registry
    let assetRegistry = await getAssetRegistry('org.jro.ROJ');
    await assetRegistry.add(roj);

    // Update Researcher registry
    let participantRegistry = await getParticipantRegistry('org.jro.Researcher');
    await participantRegistry.update(createROData.creator);

}

