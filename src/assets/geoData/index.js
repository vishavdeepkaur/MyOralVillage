let fs = require('fs');

module.exports = () => {
    let fileData = fs.readFileSync('./world.topo.json', 'utf-8')
    let resultData = fs.readFileSync('./resultData.json', 'utf-8')
    let contentData = JSON.parse(fs.readFileSync('./contentData.json', 'utf-8').replace(/\//g,"\\/"))



    let data = {
        geoData: JSON.parse(fileData),
        surveyData: JSON.parse(resultData),
        categories: contentData.contentData.categories,
        themes: contentData.contentData.themes,
        countries: contentData.contentData.countries,
        contentItems: contentData.contentData.contentItems
    }

    return data
}