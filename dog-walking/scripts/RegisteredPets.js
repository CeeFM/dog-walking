import { getPets } from "./database.js"
import { getWalkers } from "./database.js"

const pets = getPets()
const walkers = getWalkers();

export const RegisteredPets = () => {
    let petHTML = "<ul>"

    for (const pet of pets) {
        petHTML += `<li id="pet--${pet.id}">${pet.name}</li>`
    }

    petHTML += "</ul>"

    return petHTML
}

document.addEventListener('click', e => {
    const itemClicked = e.target;
    if (itemClicked.id.startsWith("pet")) {
        const [,petPrimaryKey] = itemClicked.id.split("--");
        for (const pet of pets) {
            if (pet.id === parseInt(petPrimaryKey)) {
                for (const walker of walkers) {
                    if (pet.walkerId === walker.id) {
                        window.alert(`${pet.name} is being walked by ${walker.name}!`)
                    }
                }
            }
        }
    }
})