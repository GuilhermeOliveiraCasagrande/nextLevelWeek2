const subjects = [
    //"Selecione uma opção",
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

//Funcionalidades
function getSubject(num) {
    return subjects[Number(num) - 1]
}

function timeToMinutes(time) {
    //let hourMinute = time.split(":")
    //let minutes = (Number(hourMinute[0]) * 60) + Number(hourMinute[1])
    let [hour, minute] = time.split(":")
    return (Number(hour) * 60) + minute
}

module.exports = {
    subjects,
    weekdays,
    getSubject,
    timeToMinutes
}