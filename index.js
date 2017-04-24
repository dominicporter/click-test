let readline = require('readline');

let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question("What's the econded string (leave blank to run tests)? ", function(answer) {

    if (answer === '') {
        test()
    }
    else {
        let decoded = decodePosition(answer);

        console.log(decoded);
    }
    rl.close();
});

function containsInvalidChars(encoded) {
    for (let c of encoded){
        if (!"rnbqkbnr/pPRNBQKBNR12345678".includes(c)) {
            console.log('Bad: '+c)
            return true
        }
    }

    return false;
}

function isWrongLength(row) {
    let l = 0;
    for (let c of row){
        if ("12345678".includes(c)){
            l+=parseInt(c)
        }
        else l++;
    }
    return l != 8

}

function encodeRow(row) {
    let r = "";
    for (let c of row){
        if ("12345678".includes(c)){

            for (let i = 0; i<parseInt(c); i++){
                r+='.'
            }
            continue;
        }
        r+=c;
    }

    return r+'\n';
}
let decodePosition = (encoded)=>{
    if (containsInvalidChars(encoded)) return 'Invalid encoded position : Unexpected character';

    let rows = encoded.split('/');

    if (rows.length!=8) return 'Invalid encoded position : Wrong number of rows';

    let dec = "";
    for (let row of rows){
        if (isWrongLength(row) ) return 'Invalid encoded position : Wrong number of squares on row';
        dec+=encodeRow(row);
    }

    return dec;
};

let test = ()=>{
    let testdata = [
        {
            encoded: 'r1bk3r/p2pBpNp/n4n2/1p1NP2P/6P1/3P4/P1P1K3/q5b1',
            decoded: 'r.bk...r\np..pBpNp\nn....n..\n.p.NP..P\n......P.\n...P....\nP.P.K...\nq.....b.\n'
        },
        {
            encoded: 'r1bk3/p2pBpNp/n4n2/1p1NP2P/6P1/3P4/P1P1K3/q5b1',
            decoded: 'Invalid encoded position : Wrong number of squares on row'
        },
        {
            encoded: 'r1bk3r/p2pBpNp/n4n2/1p1NP2P/6P1/3P4/P1P1K3',
            decoded: 'Invalid encoded position : Wrong number of rows'
        },
        {
            encoded:'3w4/7p/7p/7p/8/8/8/8',
            decoded:'Invalid encoded position : Unexpected character'
        }
        ];

    for (let data of testdata){
        let res = decodePosition(data.encoded);
        if (res === data.decoded){console.log("PASS")}
        else {console.log("FAIL:"+res + " != "+ data.decoded)}
    }
};