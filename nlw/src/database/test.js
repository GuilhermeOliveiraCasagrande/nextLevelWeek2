const database = require("./db.js")
const createProffy = require("./createProffy")

database.then(async(db) => {
    //Inserir os dados
    proffyValue = {
        name: "Wesley",
        avatar: "https://avatars1.githubusercontent.com/u/32659090?s=460&u=7a9eed1e022021160d45ba7de242fcbc7636c881&v=4",
        whatsapp: "654321354879",
        bio: "Fazer exercícios para você me mamar ainda melhor",
        subject: "Educação Física"
    }

    classValue = {
        //proffy_id
        subject: 4,
        cost: 69
    }

    classScheduleValues = [{
            //class_id
            weekday: 1,
            time_from: 30,
            time_to: 00
        },
        {
            weekday: 2,
            time_from: 600,
            time_to: 1200
        }
    ]

    //await createProffy(db, { proffyValue, classValue, classScheduleValues })

    //Consultar os dados inseridos

    //todos os proffys

    const selectedProffys = await db.all("select * from proffys")


    //Consultar as classes de um determinado proffy
    //e trazer os dados dele também

    const selectedClassesAndProffys = await db.all(`
        select classes. *, proffys .*
        from proffys
        join classes on (classes.proffy_id = proffys.id)
        where classes.proffy_id = 1;
    `)

    const selectClassSchedules = await db.all(`
        select classes_schedule.* 
        from classes_schedule
        where classes_schedule.class_id = 1
        and classes_schedule.weekday = 2
        and classes_schedule.time_from <= 600
        and classes_schedule.time_to > 600
        ;
    `)

    console.log(selectClassSchedules)

})

function getWeekday(num) {
    return weekdays[Number(num)]
}