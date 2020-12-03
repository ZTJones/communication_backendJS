const { CommunicationIdentityClient, PhoneNumberAdministrationClient } = require("@azure/communication-administration");
const { AzureCommunicationUserCredential, CommunicationUser } = require("@azure/communication-common");
const { userInfo } = require("os");


//Consts
// Configure your endpoint as a system variable, then use that here.
// You can find more information here: https://docs.microsoft.com/en-us/azure/communication-services/quickstarts/create-communication-resource?tabs=windows&pivots=platform-azp#store-your-connection-string
const CONNECTION_STRING = process.env['COMMUNICATION_SERVICES_CONNECTION_STRING'];

// const numberClient = new CommunicationIdentityClient(CONNECTION_STRING);

const main = async () => {
    console.log("Azure Communication Services - Access Tokens Quickstart");

    //Quickstart code goes here
    // This code demonstrates how to fetch your connection string
    // from an environment variable.
    //const connectionString = process.env["COMMUNICATION_SERVICES_CONNECTION_STRING"];

    //iNSTANTIATE THE IDENTITY CLIENT
    const identityClient = new CommunicationIdentityClient(CONNECTION_STRING); // Normally would hold line 14's connection string
    // const phoneClient = new PhoneNumberAdministrationClient(CONNECTION_STRING);

    // I think this goes here
    let identityResponse = await identityClient.createUser();
    console.log(`\nCreated an identity with ID: ${identityResponse.communicationUserId}`);
    
    let tokenResponse = await identityClient.issueToken(identityResponse, ["voip"]);
    const { token, expiresOn } = tokenResponse;
    console.log(`\nIssued an access token with "voip" scope that expires at ${expiresOn}:`);
    console.log(token);
    
    // Setting timeout to test refreshing tokens.
    setTimeout( async () => {

        // "fetch" the user  from a database
        // create new user instance
        let newIdentity = new CommunicationUser(identityResponse.communicationUserId);
        console.log("new user id");
        console.log(newIdentity.communicationUserId);

        
        // First revoking current token
        await identityClient.revokeTokens(identityResponse);
        // Then issuing a new token, overwriting the previous tokenResponse.
        tokenResponse = await identityClient.issueToken(identityResponse, ["voip"]);

        // Output expiration date, and token
        console.log(tokenResponse.expiresOn);
        console.log(tokenResponse.token);
        
    }, 3000);
    // identityResponse

    // Value existingIdentity represents identity of Azure Communication Services stored during identity creation
    // identityResponse = new CommunicationUser(identityResponse.communicationUserId);

    // console.log("Line 41");
    // console.log(tokenResponse.expiresOn);
    
    //Now the real fun begins
    // let allNums = await phoneClient.listPhoneNumbers({skip:0, take:10})
    // console.log(phoneClient.listPhoneNumbers.;
    // console.log(typeof(allNums));
    // console.log(await allNums.next()
        // .then(result => result.value.phoneNumber));
    

    // while(true){
    //     console.log(tokenResponse.expiresOn);
    // }
}

async function refreshToken(user, client){
    return client.issueToken(user, ["voip"]);
}

async function revokeTokenX(user, client){
    // console.log("Revoking tokens here.");
    client.revokeTokens(user).then(() => {
        console.log("TESTING")
    })
}

main().catch((error) => {
    console.log("Encountered an error");
    console.log(error);
});