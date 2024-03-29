import { getWalkers } from "./database.js"
import { getWalkerCities } from "./database.js"
import { getCities } from "./database.js";

const walkers = getWalkers()
const walkerCities = getWalkerCities();
const cities = getCities();

export const Walkers = () => {
    let walkerHTML = "<ul>"

    for (const walker of walkers) {
        walkerHTML += `<li id="walker--${walker.id}">${walker.name}</li>`
    }

    walkerHTML += "</ul>"
    return walkerHTML
}

document.addEventListener(
    "click",  // This is the type of event
    (clickEvent) => {
        /*
            The target of a click event is the most specific HTML element
            that was clicked by the user.
        */
        const itemClicked = clickEvent.target

        /*
            Only run the rest of the logic if a walker <li> was clicked
        */
        if (itemClicked.id.startsWith("walker")) {

            /*
                Extract the primary key from the id attribute of the list
                item that you clicked on. Refer back to the code you
                wrote for each list item. Note the format of the id
                attribute ("walker--2" if you clicked on the second one).

                This code splits that string apart into an array, and
                captures the "2" and assigns it to be the value of the
                `walkerId` variable.

                Splitting a string in JavaScript:
                    https://www.youtube.com/watch?v=u2ZocmM93yU

                Destructuring in JavaScript:
                    https://www.youtube.com/watch?v=UgEaJBz3bjY
            */
            const [,walkerId] = itemClicked.id.split("--")
            let walkerCityArray = [];
            let cityArray = [];
            let windowAlert = "";

            /*
                Now that you have the primary key of a walker object,
                find the whole object by iterating the walkers array.
            */
            for (const walkerObject of walkers) {

                /*
                    Compare the primary key of each walker to the one
                    you have. As soon as you find the right one, display
                    the window alert message.
                */
                if (walkerObject.id === parseInt(walkerId)) {
                    for (const walkerCity of walkerCities) {
                        if (walkerObject.id === walkerCity.walkerId) {
                            walkerCityArray.push(walkerCity);
                            for (const city of cities) {
                                if (walkerCity.cityId === city.id) {
                                    cityArray.push(city);
                                        windowAlert = `${walkerObject.name} services`;
                                        for (let i = 0; i < cityArray.length; i++) {
                                            if (i < cityArray.length - 1) {
                                                windowAlert += ` ${cityArray[i].name} and`;
                                            } else {
                                                windowAlert += ` ${cityArray[i].name}`;
                                            }
                                        }
                                }
                            }
                        }
                    }
                }
            }
            if (windowAlert !== "") {
                window.alert(windowAlert);
                }
        }
    }
)