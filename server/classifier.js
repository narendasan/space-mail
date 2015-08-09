//prepositions = Meteor.npmRequire("prepositions");


this.init_level_one = function () {



    Emails.find().forEach(function(data) {
        if(Tags.findOne({name: "All Mail"})){
    
        }
        else{
            Tags.insert({
                name: "All Mail",
                regex:[],
                 uid: data.user_id
            });
            SubTags.insert({
                name:"",
                 uid: data.user_id
            });
        }
        var from = data.from;
        if (!data.from) {
            return;
        }
        from = from.substring(0, from.indexOf('.'));
        if(from.indexOf('<') !== -1){
            from = from.substring(0, from.indexOf('<'));
        }
        if(from.indexOf('\"') !== -1){
            from = from.substring(0, from.indexOf('\"'));
        }
        from = from.substring(from.indexOf('@') + 1);
        from = from.substring(0,from.length - 1);
        if(from === ""){
            from = "All Mail";
        }
        console.log(from);
        var newTag = {
             name: from,
             regex: [],
             uid: data.user_id
        };
        Emails.update({content: data.content}, {$set : {tag: from}});
        newTag.regex.push(data.from);
        console.log(newTag);
        if(Tags.findOne({name: newTag.name})){
            console.log("Already Have This")
            if (isInArray(newTag.regex, Tags.findOne({name: newTag.name}).regex) === -1){
                Tags.findOne({name: newTag.name}).regex.push(newTag.regex);
            }
        }
        else{
            Tags.insert(newTag);
        }
    });
    Emails.find().forEach(function(data) {
        console.log(data.tag);
    });
}

function isInArray(value, array) {
  return array.indexOf(value) > -1;
}

this.kickstarter_project = function (){
    Emails.find().forEach(function(data) {
        if((data.tag === "kickstarter") && (data.subject.indexOf("Project") !== -1)){
            subClass = data.subject.substring(data.subject.indexOf(':') + 2);
            Emails.update({content: data.content}, {$set : {subtag: subClass}});

            if(SubTags.findOne({name: subClass})){
                //console.log("Already Have This");
            }
            else{
                SubTags.insert({name: subClass, uid: data.user_id});
                console.log(subClass);
            }
        }
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
