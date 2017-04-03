let fs = require('fs');

module.exports = () => {
    let fileData = fs.readFileSync('./world.topo.json', 'utf-8')
    let resultData = fs.readFileSync('./resultData.json', 'utf-8')

    let data = {
        geoData: JSON.parse(fileData),
        surveyData  : JSON.parse(resultData)
    }

    return data
}