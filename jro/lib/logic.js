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

