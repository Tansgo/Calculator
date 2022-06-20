const operators = ["+","-","*","/"];
const display_area = document.getElementById("display_area");

let calculator_button = document.getElementById("calculator").getElementsByTagName("td");
let calc_to_do = "";
let result = 0;
let can_delete = false;
let click_valid_button = false;

/* Afficher le calcul ou le résultat en haut de la calculatrice */
function displayCalculator(value = null) {
    can_delete = true;
    if(value){
        if(click_valid_button){
            if(!isNaN(value)) calc_to_do = "";
            click_valid_button = false;
        }
        if (isNaN(value) && value != ".") {
            /*** On vérifie s'il y a déjà un opérateur.
             * Si c'est le cas, on effectue le calcul automatiquement pour faciliter le suivi du calcul.
             * On contrôle en même temps si l'utilisateur clique sur plusieurs opérateurs à la suite.***/
            if(check_operator(calc_to_do)) {
                if(isNaN(calc_to_do.slice(-1))){
                    calc_to_do = calc_to_do.slice(0, -1);
                }else{
                    calc_to_do = calculate();
                }
            }
        }
        calc_to_do = calc_to_do + value;
    }

    display_area.innerText = calc_to_do;
}

/* Execute le calcul demandé ou calcul automatiquement dès qu'il y a deux opérateurs */
function calculate(){
    const string_to_calculate = calc_to_do;
    let first_number = "", second_number = "", operator;

    calc_to_do = "";
    can_delete = false;

    /* On extrait les deux nombres du calcul en cherchant l'opérateur qui les sépare */
    for(let i = 0; i < string_to_calculate.length; i++){
        if(isNaN(parseInt(string_to_calculate[i])) && string_to_calculate[i] != ".") {
            for (let j = 0; j < operators.length; j++) {
                if (string_to_calculate[i] === operators[j]) {
                    operator = operators[j];
                    break;
                }
            }
            continue;
        }
        if(!operator){
            first_number += string_to_calculate[i];
        }else{
            second_number += string_to_calculate[i];
        }
    }

    switch (operator){
        case "+" :
            result = parseFloat(first_number) + parseFloat(second_number);
            break;
        case "-" :
            result = parseFloat(first_number) - parseFloat(second_number);
            break;
        case "*" :
            result = parseFloat(first_number) * parseFloat(second_number);
            break;
        case "/" :
            result = parseFloat(first_number) / parseFloat(second_number);
            break;
        default:
            break;

    }

    return result;
}

/* Permet de vérifier si un opérateur est présent dans le calcul. */
function check_operator(string_to_verify){

    let operator_presence = false;
    for(let i = 0; i < string_to_verify.length; i++){
        operators.forEach(function(operator){
            if(string_to_verify[i] === operator){
                operator_presence = true;
            }
        })
    }
    return operator_presence;
}

/* Réinitialise la calculatrice */
function ac(){
    display_area.innerText = "";
    calc_to_do = "";
    result = 0;
    can_delete = false;
}

/* Permet de supprimer la dernière entrée */
function del(){
    if(can_delete) {
        if(calc_to_do.length >= 1) {
            calc_to_do = calc_to_do.slice(0, -1);
            displayCalculator();
        }
    }
}

/* On initialise la calculatrice en attribuant un événement à chaque bouton en fonction de sa mission */
for(const key in calculator_button){
    if(!calculator_button.hasOwnProperty(key)) continue; /* Permet de récupérer tous les boutons en excluant les prototypes */

    const button = calculator_button[key];
    button.addEventListener("click", function (){
        switch (this.id) {
            case "valid":
                displayCalculator(calculate());
                click_valid_button = true;
                break;
            case "AC":
                ac();
                break;
            case "DEL":
                del();
                break;
            default:
                displayCalculator(this.innerText);
                break;
        }

    });
}



