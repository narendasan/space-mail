//prepositions = Meteor.npmRequire("prepositions");
Tags.insert({
    name: "All Mail",
    regex: []
});

function init_level_one() {

    Emails.find().forEach(function(data) {
        var from = data.from;
        from = from.substring(0, from.indexOf('.'));
        from = from.substring(from.indexOf('@') + 1);
        console.log(from);
        var newTag = {
             name: from,
             regex: []
        };
        Emails.update({content: data.content}, {$set : {tag: from}});
        newTag.regex.push(data.from);
        console.log(newTag);
        Tags.insert(newTag);
    });
    Emails.find().forEach(function(data) {
        console.log(data.tag);
    });
}



function level_two(){
    var pool = [" "];
    Emails.find().forEach(function(data) {
         pool.push.apply(pool,data.subject.split(" "));
    });
    console.log(pool);

    var l = pool.length, i, tmp = {}, ret = [];
    for( i=0; i<l; i++) {
        if( !tmp[pool[i]]) tmp[pool[i]] = 0;
        tmp[pool[i]]++;
    }
    for( i in tmp) {
        if( tmp.hasOwnProperty(i)) {
            ret.push({
                word: i,
                count: tmp[i]
            });
        }
    }

    ret.sort(function(a, b){
        return -1 * (a.count - b.count) //causes an array to be sorted numerically and ascending
    });
    console.log(ret);
    console.log("top word",ret[0].word,ret[0].count);


    if(ret[0].count !== 1){
        var regex = "*" + ret.word + "*";
        var name;
        var mail = Emails.find({ subject: regex});
        console.log(mail);
        name = mail[0].from
        console.log(name);
    }
    else {
        Emails.find().forEach(function(data) {
             /*data.set({
                 "tag" : "All Mail"
             })*/
        });
        console.log("All Mail");
    }
}

init_level_one();
