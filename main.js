const root = document.querySelector(".root");
const body = document.querySelector('body');

function alertMessage(msg){
    root.style.margin="0"
    const msgLabelBody= document.createElement("div");
    msgLabelBody.classList.add("msgLabelBody");
    msgLabelBody.textContent=msg
    body.insertBefore(msgLabelBody,root)

    setTimeout(() => {
        msgLabelBody.remove()
        root.style.marginTop="10%"
    }, 3000);

}


const enterNumberBody = document.createElement('div');
enterNumberBody.classList.add("enterNumberBody");
root.appendChild(enterNumberBody)

const numberOfGroupTotalHeading=document.createElement("p");
numberOfGroupTotalHeading.textContent="Enter number of Groups"
numberOfGroupTotalHeading.classList.add("numberOfGroupTotalHeading")
enterNumberBody.appendChild(numberOfGroupTotalHeading)

const numberOfGroupInput = document.createElement("input")
numberOfGroupInput.classList.add("numberOfGroupInput")
numberOfGroupInput.setAttribute("type","number")
enterNumberBody.appendChild(numberOfGroupInput)







const continueButton_1 = document.createElement("button");
continueButton_1.classList.add("continueButton_1")
continueButton_1.textContent="continue";
body.appendChild(continueButton_1)

continueButton_1.addEventListener("click",()=>{
   if(body.children[0].classList!="msgLabelBody"){
    alertMessage("pass")
   }
})