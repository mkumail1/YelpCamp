var mongoose=require('mongoose');
var Campgrounds=require("./models/campground");
 var Comment=require("./models/comment");
var data=[
{
name:"MountEverest",
image:"https://ichef.bbci.co.uk/news/624/cpsprodpb/203A/production/_107105280_488f082d-e3bf-4f7f-b6d2-d3aa0998facb.jpg",
description:"Reaching 29,029 feet (8,848 meters) above sea level, Mount Everest is the highest mountain on Earth. Located in the Mahalangur section of the Himalayas, the mountain's summit straddles the border separating China and Nepal. The mountain's height was first determined in 1856.",
location:"Solukhumbu District, in  Nepal and China."
},
{ 
name:"Peer Chanasi",
image:"https://learnonlineschool.com/wp-content/uploads/2019/08/Peer-Chanasi.jpg",
description:"Pir Chinasi. Pir Chinasi (also spelled as Peer Chinasi) is a shrine and a tourist destination located about 30 kilometers (19 mi) east of Muzaffarabad, the capital city of Azad Kashmir administered by Pakistan. It is located on the top of hills at the height of 2,900 metres (9,500 ft).",
location:"Muzaffarabad District, Azad Kashmir, Pakistan"
},
{
name:"Naran Valley",
image:"https://www.youlinmagazine.com/articles/silk-road-route-naran-valley-1.jpg",
description:"Naran – Kaghan Valley. Naran is a medium sized town situated in upper kaghan valley which is a part of Khyber Pakhtun khwa province of Pakistan. It is one of the most beautiful part of northern areas in pakistan which is elevated 2500 meters above sea level.",
location:"Mansera District,Khyber Pakhtunkhwa, Pakistan. "
},
{
name:"Shogran Hotel",
image:"https://www.akinternational.com/images/hotels/hotel_-1_rxcu6idqz1tmv37fuyyu.jpg",
description:"Shogran (Urdis a hill station situated on a green plateau in the Kaghan Valley, northern Pakistan at a height of 2,362 metres (7,749 ft) above sea level. Shogran is located at a distance of 34 kilometres (21 mi) away from Balakot.",
location:"Mansera District,Khyber Pakhtunkhwa, Pakistan. "
},
{
name:"Nathia Gali",
image:"https://capitaltravels.net/wp-content/uploads/2019/02/Nathia-Gali-Pakistan-4.jpg",
description:"Nathia Gali  is a mountain resort town or hill station in Abbottabad District of Khyber Pakhtunkhwa, Pakistan. It is located at the center of the Galyat range, where several hill-stations are situated, closely connected to each other, and with their names mostly ending in 'Gali'.",
location:"Abbottabad District, Khyber Pakhtunkhwa ,Pakistan."
},
{
name:"Swat Valley",
image:"https://media-cdn.tripadvisor.com/media/photo-m/1280/19/67/88/93/swat-valley.jpg",
description:"Swat is a valley and an administrative district in the Khyber Pakhtunkhwa Province, close to the Afghan-Pakistan border. The capital of Swat is Saidu Sharif, but the main town in the Swat valley is Mingora. It was a princely state until it was dissolved in 1969.",
location:"Swat valley ,Khyber Pakhtunkhu ,Pakistan."
},
{
name:"Kalam Valley",
image:"https://ichef.bbci.co.uk/news/624/cpsprodpb/203A/production/_107105280_488f082d-e3bf-4f7f-b6d2-d3aa0998facb.jpg",
description:"Kalam is a valley located at distance of 99 kilometres (62 mi) from Mingora in the northern upper reaches of Swat valley along the bank of Swat River in Khyber Pakhtunkhwa province of Pakistan.Kalam is surrounded by lush green hills, thick forests and bestowed with mesmeric lakes, meadows and waterfalls which are worth seen features of the landscape. It is the birthplace of Swat river which forms with confluence of two major tributaries of Gabral river and Ushu river.",
location:"Khyber Pakhtunkhwa, Pakistan"
},
{
name:"NeelamValley",
image:"https://steemitimages.com/DQmcjpXP6tk3v3paAe6sPr2do91yCaFUeNCDTxr6r5Zf3hC/DQmcjpXP6tk3v3paAe6sPr2do91yCaFUeNCDTxr6r5Zf3hC.jpg",
description:"Neelum Valley, is the northernmost district of Azad Kashmir, Pakistan. Taking up the larger part of the Neelam Valley, the district has a population of 191,000 (as of 2017). It was badly affected by the 2005 Kashmir earthquake.",
location:"Azad Kashmir ,Pakistan"
}
]


function seedDB(){
    Campgrounds.remove({},function(err){
    if(err)
    {
    console.log(err);
    }
    else
    {
    console.log("all Campgounds removed!!")
    Comment.remove({},function(err){
    if(err)
    {
        console.log(err)
    }
    else
    {
     console.log("all comments removed!!")
     //To add all campgrounds
  
    }
    })
    }
});
   
}

module.exports=seedDB;