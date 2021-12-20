let quote_storage = [];

function add_quote(msg){
    quote_to_add = msg.toString().replace('!add', '');
    quote_storage.push(quote_to_add);
    console.log(`quote storred`);
    return `quote: "${quote_to_add}" has been storred`;
}

function read_quote(){
    if (quote_storage.length > 0){
        randomQuote = Math.floor(Math.random() * quote_storage.length);
        console.log(`quote read: ${quote_storage[randomQuote]}`);
        return quote_storage[randomQuote].toString();
    }
    return "no quotes storred";
};

module.exports = { add_quote, read_quote };