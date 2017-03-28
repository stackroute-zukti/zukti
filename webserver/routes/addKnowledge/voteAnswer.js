let getNeo4jDriver = require('./../../neo4j/connection');

module.exports = function(action, type, value, user) {

   let query = ``;
    switch (action) {
        case 'liked':
            query = `MATCH (n:${type})<-[r:answer]-() WHERE n.value=${JSON.stringify(value)}
               SET
               n.likes=(CASE WHEN ANY(user IN n.likes WHERE user='${user}') THEN n.likes ELSE n.likes+'${user}' END),
               n.dislikes=(CASE WHEN ANY(user IN n.dislikes WHERE user<>'${user}') THEN n.dislikes ELSE FILTER(user IN n.dislikes WHERE user<>'${user}') END)`;
            break;
        case 'like reverted':
            query = `MATCH (n:${type})<-[r:answer]-() WHERE n.value=${JSON.stringify(value)}
               SET
               n.likes=FILTER(user IN n.likes WHERE user <> '${user}')`;
            break;
        case 'disliked':
            query = `MATCH (n:${type})<-[r:answer]-() WHERE n.value=${JSON.stringify(value)}
               SET
               n.dislikes=(CASE WHEN ANY(user IN n.dislikes WHERE user='${user}') THEN n.dislikes ELSE n.dislikes+'${user}' END),
               n.likes=(CASE WHEN ANY(user IN n.likes WHERE user<>'${user}') THEN n.likes ELSE FILTER(user IN n.likes WHERE user<>'${user}') END)`;
            break;
        case 'dislike reverted':
            query = `MATCH (n:${type})<-[r:answer]-() WHERE n.value=${JSON.stringify(value)}
               SET
               n.dislikes=FILTER(user IN n.dislikes WHERE user <> '${user}')`;
            break;
        default:
            break;
    }

   let session = getNeo4jDriver().session();
    session.run(query).then(function(result) {
        // Completed!
        session.close();
    }).catch(function(error) {
        console.log(error);
    });
};
