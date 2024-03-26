const root = document.querySelector(".root");
const body = document.querySelector("body");

function alertMessage(msg) {
  if (body.children[0].classList != "msgLabelBody") {
    const msgLabelBody = document.createElement("div");
    msgLabelBody.classList.add("msgLabelBody");
    msgLabelBody.textContent = `Note: ${msg}`;
    body.insertBefore(msgLabelBody, root);

    setTimeout(() => {
      msgLabelBody.remove();
      root.style.marginTop = "10%";
    }, 3000);
  }
}

const enterNumberBody = document.createElement("div");
enterNumberBody.classList.add("enterNumberBody");
root.appendChild(enterNumberBody);

const numberOfGroupTotalHeading = document.createElement("p");
numberOfGroupTotalHeading.textContent = "Enter number of Groups";
numberOfGroupTotalHeading.classList.add("numberOfGroupTotalHeading");
enterNumberBody.appendChild(numberOfGroupTotalHeading);

const numberOfGroupInput = document.createElement("input");
numberOfGroupInput.classList.add("numberOfGroupInput");
numberOfGroupInput.setAttribute("type", "number");
enterNumberBody.appendChild(numberOfGroupInput);

const capacityBody = document.createElement("div");
capacityBody.classList.add("capacityBody");
root.appendChild(capacityBody);

const capacityHeading = document.createElement("p");
capacityHeading.classList.add("capacityHeading");
capacityHeading.textContent = "Enter capacity";
capacityBody.appendChild(capacityHeading);

const capacityInput = document.createElement("input");
capacityInput.classList.add("capacityInput");
capacityInput.setAttribute("type", "number");
capacityBody.appendChild(capacityInput);

const continueButton_1 = document.createElement("button");
continueButton_1.classList.add("continueButton_1");
continueButton_1.textContent = "continue";
body.appendChild(continueButton_1);

let numberOfGroups;
let capacity;
let groups = [];
let lowerBound;

continueButton_1.addEventListener("click", () => {
  if (
    numberOfGroupInput.value.trim() == "" ||
    numberOfGroupInput.value.trim() <= 0
  ) {
    alertMessage("Number of Groups is Empty or Invalid");
  } else if (
    capacityInput.value.trim() == "" ||
    capacityInput.value.trim() <= 0
  ) {
    alertMessage("Capacity is Empty or Invalid");
  } else {
    numberOfGroups = Number(numberOfGroupInput.value);
    capacity = Number(capacityInput.value);

    enterNumberBody.remove();
    capacityBody.remove();
    continueButton_1.remove();

    console.log(`number of groups = ${numberOfGroups}`);
    console.log(`capacity = ${capacity}`);

    const continueButton_2 = document.createElement("button");
    continueButton_2.textContent = "Calculate";
    continueButton_2.classList.add("continueButton_2");
    body.appendChild(continueButton_2);

    for (let i = 1; i <= numberOfGroups; i++) {
      const groupBody = document.createElement("div");
      groupBody.classList.add("groupBody");
      root.appendChild(groupBody);

      const groupBodyHeading = document.createElement("p");
      groupBodyHeading.textContent = `Weight of Group ${i}`;
      groupBody.appendChild(groupBodyHeading);

      const groupInput = document.createElement("input");
      groupInput.classList.add("groupInput");
      groupInput.setAttribute("type", "number");
      groupBody.appendChild(groupInput);
    }
    if(body.children[0].classList=="msgLabelBody"){
      body.children[0].remove()
    }
    alertMessage("Weight should not be more than capacity")
    // here goes main
    continueButton_2.addEventListener("click", () => {
      const groupInputs = document.querySelectorAll(".groupInput");
      let groupInputStatus = [];

      groupInputs.forEach((input) => {
        groupInputStatus.push(input.value.trim() !== "");
      });

      if (groupInputStatus.some((data) => data === false)) {
        alertMessage("Some Group values are empty!");
      } else {
        const temp_vals = [];
        groupInputs.forEach((item) => {
          temp_vals.push(Number(item.value));
        });

        const newStatus = [];
        temp_vals.forEach((item) => {
          if (item <= 0) {
            newStatus.push(false);
          } else newStatus.push(true);

          if (item > capacity) {
            newStatus.push(false);
          } else newStatus.push(true);
        });

        if (newStatus.some((data) => data == false)) {
          alertMessage("Invalid Data Found");
        } else {
          //Here geos all logics for bin packing

          const groupValues = [];
          groupInputs.forEach((value) => {
            groupValues.push(Number(value.value));
          });
          let total = 0;
          groupValues.forEach((num) => {
            total += num;
          });

          groupValues.sort();
          let valuesInDescendingOrder = [];
          for (let i = groupValues.length - 1; i >= 0; i--) {
            valuesInDescendingOrder.push(groupValues[i]);
          }
          console.log(`Values in desc order = ${valuesInDescendingOrder}`);

          lowerBound = Math.ceil(total / capacity);
          console.log(`Lower Bound = ${lowerBound}`);

          // removing all child after calculating
          while (root.firstChild) {
            root.removeChild(root.firstChild);
          }
          continueButton_2.remove();

          //final part
          const resultBody = document.createElement("div");
          resultBody.classList.add("resultBody");
          root.appendChild(resultBody);

          // Full bin packing algorithm
          const bins = [];

          // Initializing bins
          bins.push([]);

          // iterating over each item and packing them into bin
          valuesInDescendingOrder.forEach((value) => {
            let packed = false;
            for (const bin of bins) {
              // Checking if there's enough capacity in the current bin
              if (
                bin.reduce((acc, curr) => acc + curr, 0) + value <=
                capacity
              ) {
                bin.push(value); // packing the item in the current bin
                packed = true;
                break;
              }
            }
            if (!packed) {
              // if not fitted then create a new bin
              bins.push([value]);
            }
          });
          console.log(bins);
          

          // now from here we'll display how to fit? ||   DISPLAYING SOLUTIONS



        }
      }
    });
  }
});
