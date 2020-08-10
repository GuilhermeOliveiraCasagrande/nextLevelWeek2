const database = require("./database/db")
const { subjects, weekdays, getSubject, timeToMinutes } = require("./utils/format")

//Resultado das rotas
function pageLanding(req, res) {
    return res.render("index.html")
}

async function pageStudy(req, res) {
    const filters = req.query
    if (filters.subject == "" || filters.weekday == "" || filters.time == "") {
        return res.render("study.html", { filters, subjects, weekdays })
    }
    //converter horas em minutos
    const query = `
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS (
        SELECT classes_schedule.*
        FROM classes_schedule
        WHERE classes_schedule.class_id = classes.id
        AND classes_schedule.weekday = ${filters.weekday}
        AND classes_schedule.time_from <= ${timeToMinutes(filters.time)}
        AND classes_schedule.time_to > ${timeToMinutes(filters.time)}
    )
    AND classes.subject = '${filters.subject}';`

    //Caso dê erros
    try {
        const db = await database
        const proffys = await db.all(query)
        return res.render("study.html", { proffys, subjects, filters, weekdays })
    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(req, res) {
    const data = req.body

    //if (Object.is(data, {})) {
    if (Object.keys(data).length > 0) {
        data.subject = getSubject(data.subject)

        return res.redirect("/study")
    }

    return res.render("give-classes.html", { subjects, weekdays })
}

async function pageSaveClasses(req, res) {
    const createProffy = require("./database/createProffy")
    const data = req.body

    const proffyValue = {
        name: data.name,
        avatar: data.avatar,
        whatsapp: data.whatsapp,
        bio: data.bio
    }

    const classValue = {
        subject: data.subject,
        cost: data.cost
    }

    const classScheduleValues = data.weekday.map((weekday, index) => {
        return {
            weekday,
            time_from: timeToMinutes(data.time_from[index]),
            time_to: timeToMinutes(data.time_to[index]),
        }
    })

    try {
        const db = await database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        let queryString = "?subject=" + data.subject
        queryString += "&weekday=" + data.weekday[0]
        queryString += "&time=" + data.time_from[0]

        return res.redirect("/study" + queryString)
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    pageSaveClasses
}