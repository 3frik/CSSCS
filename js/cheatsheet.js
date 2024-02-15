//object with info about what to show
class atributeCard {
    constructor(key,values,jsName){
        this.attribute=key;
        this.values=values;
        this.jsName=jsName;
    }

    activeValueIndex=0; //index in the values array with the current active value

    createElement(){
        //The box
        var area = document.createElement("div");
        //give style and functionality to the box
        area.setAttribute("class","attributeCard");
        area.setAttribute("style","display:flex;")

        //The attribute button
        var attributeBtn = document.createElement("button");
        //give style and functionality to the btn
        attributeBtn.innerText=this.attribute;
        attributeBtn.setAttribute("onclick", "selectAttribute('"+this.attribute+"','"+this.jsName+"')");
        

        //The value dropdown menu
        var valueBtn = document.createElement("button");
        valueBtn.setAttribute("class","btn btn-secondary dropdown-toggle");
        valueBtn.setAttribute("type","button");
        valueBtn.setAttribute("data-bs-toggle","dropdown");
        valueBtn.setAttribute("aria-haspopup","true");
        valueBtn.setAttribute("aria-expanded","false");
        valueBtn.setAttribute("id",this.attribute+"Menu");
        valueBtn.innerText="Choose Value";
        var optionsBtn = document.createElement("div");
        optionsBtn.setAttribute("class","dropdown-menu");
        optionsBtn.setAttribute("aria-labelledby","dropdownMenuLink");
        //Create and add the different values
        for(var i=0; i<this.values.length;i++){
            var newValue = document.createElement("p")
            //give style and functionality to the btn
            newValue.setAttribute("class","dropdown-item")
            newValue.setAttribute("aria-labelledby",this.attribute+"Menu");
            console.log()
            newValue.innerText=this.values[i];
            newValue.setAttribute("onclick","selectValue(this.innerText)");
            optionsBtn.appendChild(newValue);
        }

        //Build the area element with the other parts
        area.appendChild(attributeBtn);
        area.appendChild(valueBtn);
        area.appendChild(optionsBtn);
        return area;
    }

    addElement(objectiveElement){
//code to create the html element, including a dropdown menu with all values and an onclick element with correct js.
        const child = this.createElement();
        objectiveElement.appendChild(child);
    }
}

//Global variables
var activeAttribute;
var activeValue;
var activeElement;

//Arrays with all properties and behaviours
const textProperties=[
    new atributeCard("font-size",["10px","20px","30px","2rem","3rem"],"fontSize"),
    new atributeCard("color",["red","blue","black"],"color"),
    new atributeCard("font-weight",["lighter","normal","bold"],"fontWeight"),//font-weight
    new atributeCard("font-style",["normal","italic","oblique"],"fontStyle")//style
];
const borderProperties=[
    new atributeCard("border-color",["red","blue","black"],"borderColor"),
    new atributeCard("border-style",["solid","dotted","dashed"],"borderStyle"),
    new atributeCard("border-radius",["5px","10%","0px"],"borderRadius")//radius
];
const backgroundProperties=[
    new atributeCard("background-color",["orange","blue","lightgrey"],"backgroundColor"),//bg.color
    new atributeCard("background-image",["none","url(picture.webp)"],"backgroundImage")//bg-image
]
const displayProperties=[
    new atributeCard("display",["flex;flexdirection:row","flex;flex-direction:column","block","grid;grid-template-column:auto auto"],"display")    //flex&direction
    //grid&columns
];

////POINTERS TO HTML ELEMENTS
const col1 = document.getElementById("textDiv");
const col2 = document.getElementById("borderDiv");
const col3 = document.getElementById("positionDiv");
const col4 = document.getElementById("displayDiv");
const colM = document.getElementById("backgroundDiv");
const elementDisplay = document.getElementById("activeElementDisplay");
const valueDisplay = document.getElementById("activeValueDisplay");
const attributeDisplay = document.getElementById("activeAttributeDisplay");
const displayDiv = document.getElementById("attributeAndValueDisplay");

var activeElement;  //pointer to the active element


////FUNCTIONS TO UPDATE THE EXAMPLES VIEW
function selectElement(element){ //changes teh active attribute to be modified
    activeElement=element;
    console.log("active element: "+element);
    elementDisplay.setAttribute("element",element);
    elementDisplay.innerText=element.getAttribute("selector");
}

function selectAttribute(attribute, jsattribute){
    //code that runs when this attribute is clicked on
    // update active attribute
    console.log("active attribute: "+attribute +" or "+jsattribute);
    //Show active attribute
    attributeDisplay.setAttribute("jsName",attribute);
    attributeDisplay.innerText=attribute;
}

selectAttribute("font-size","fontSize");

function selectValue(newValue){
    //code that runs when a value is clicked on
    //upate active value
    activeValue=newValue;
    console.log("active value: "+activeValue);
    //show active Value
    valueDisplay.setAttribute("value",newValue);
    valueDisplay.innerText=activeValue;
}

function updateView() {
    console.log("So long so good");
    var attributeName=attributeDisplay.getAttribute("jsname");
    var valueValue=valueDisplay.getAttribute("value");
    
    const allAttributes = activeElement.getAttribute("style")
    console.log("style= "+allAttributes)
    activeElement.setAttribute("style",allAttributes+";"+attributeName+":"+valueValue);
}


document.addEventListener("DOMContentLoaded", function () {
    for(let i=0;i<textProperties.length;i++){
        textProperties[i].addElement(col1);
    }
    for(let i=0;i<borderProperties.length;i++){
        borderProperties[i].addElement(col2);
    }
    for(let i=0;i<backgroundProperties.length;i++){
        backgroundProperties[i].addElement(colM);
    }
    for(let i=0;i<displayProperties.length;i++){
        displayProperties[i].addElement(col4);
    }
})

//buildColumns();
