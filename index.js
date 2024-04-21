const { OpenAIClient, AzureKeyCredential } = require("@azure/openai"); 
const readline = require('readline');
require('dotenv').config();


const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function makeQuestion(question) {
    return new Promise((resolve) => {
        r1.question(question, (answer) => resolve(answer));
        });
}

async function getAnswer(question) {
    const client = new OpenAIClient(process.env.GPT_ENDPOINT, new AzureKeyCredential(process.env.GPT_KEY),);
    const GetCompletionsOptions =  {
        temperature: 0,
        maxTokens: 50,
    }
    const result = await client.getCompletions(process.env.GPT_MODEL, question, GetCompletionsOptions);
  
    for (const choice of result.choices) {
        console.log('AzureAI: ' + choice.text.trim() + '\n');
    }
} 

(async () => {
    console.log('\nBem vindo à AzureAI!\nDigite "sair" quando quiser encerrar o programa.\n');
        while(true) {
            const userMessage = await makeQuestion(`Usuario: `);
            if (userMessage.toLowerCase() === 'sair'){
                console.log('Volte sempre!');
                process.exit(0);
            }
            const botResponse = await getAnswer(userMessage);
        } 
})();